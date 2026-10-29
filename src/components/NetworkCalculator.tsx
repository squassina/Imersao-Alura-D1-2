import React, { useState, useMemo } from 'react';
import { Network, DownloadCloud, Binary, Activity, Info, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const NetworkCalculator: React.FC = () => {
  const [activeNetworkTool, setActiveNetworkTool] = useState<'subnet' | 'download' | 'binary' | 'latency'>('subnet');

  // ---------------------------------------------------------------------------
  // 1. STATE: SUB-REDE CIDR
  // ---------------------------------------------------------------------------
  const [ipAddress, setIpAddress] = useState<string>('192.168.1.100');
  const [cidr, setCidr] = useState<number>(24);

  // Subnet calculations
  const subnetInfo = useMemo(() => {
    // Validate IP
    const octets = ipAddress.split('.').map((o) => parseInt(o, 10));
    const isValidIp = octets.length === 4 && octets.every((o) => !isNaN(o) && o >= 0 && o <= 255);

    if (!isValidIp || cidr < 1 || cidr > 32) {
      return null;
    }

    // IP to 32-bit integer
    const ipInt = ((octets[0] << 24) >>> 0) + ((octets[1] << 16) >>> 0) + ((octets[2] << 8) >>> 0) + (octets[3] >>> 0);

    // Mask to 32-bit integer
    const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const wildcardInt = (~maskInt) >>> 0;

    // Network & Broadcast
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | wildcardInt) >>> 0;

    // Helper: int to dotted IP
    const intToIp = (val: number): string => {
      return [
        (val >>> 24) & 255,
        (val >>> 16) & 255,
        (val >>> 8) & 255,
        val & 255,
      ].join('.');
    };

    // Helper: int to 8-bit dotted binary
    const intToBinary = (val: number): string => {
      return [
        ((val >>> 24) & 255).toString(2).padStart(8, '0'),
        ((val >>> 16) & 255).toString(2).padStart(8, '0'),
        ((val >>> 8) & 255).toString(2).padStart(8, '0'),
        (val & 255).toString(2).padStart(8, '0'),
      ].join('.');
    };

    const totalIps = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalIps - 2);

    const firstHostInt = cidr >= 31 ? networkInt : networkInt + 1;
    const lastHostInt = cidr >= 31 ? broadcastInt : broadcastInt - 1;

    // IP Class determination
    const firstOctet = octets[0];
    let ipClass = 'C';
    if (firstOctet >= 1 && firstOctet <= 126) ipClass = 'A';
    else if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'B';
    else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'C';
    else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'D (Multicast)';
    else if (firstOctet >= 240 && firstOctet <= 255) ipClass = 'E (Experimental)';

    // Private IP Scope check (RFC 1918)
    const isPrivate =
      firstOctet === 10 ||
      (firstOctet === 172 && octets[1] >= 16 && octets[1] <= 31) ||
      (firstOctet === 192 && octets[1] === 168);

    return {
      ip: ipAddress,
      cidr,
      mask: intToIp(maskInt),
      maskBinary: intToBinary(maskInt),
      wildcard: intToIp(wildcardInt),
      network: intToIp(networkInt),
      broadcast: intToIp(broadcastInt),
      firstHost: intToIp(firstHostInt),
      lastHost: intToIp(lastHostInt),
      totalIps: totalIps.toLocaleString('pt-BR'),
      usableHosts: usableHosts.toLocaleString('pt-BR'),
      ipClass,
      scope: isPrivate ? 'Privado (Rede Local / RFC 1918)' : 'Público (Roteável na Internet)',
    };
  }, [ipAddress, cidr]);

  // ---------------------------------------------------------------------------
  // 2. STATE: TEMPO DE TRANSFERÊNCIA / DOWNLOAD
  // ---------------------------------------------------------------------------
  const [fileSize, setFileSize] = useState<number>(5);
  const [fileUnit, setFileUnit] = useState<'MB' | 'GB' | 'TB'>('GB');
  const [speed, setSpeed] = useState<number>(100);
  const [speedUnit, setSpeedUnit] = useState<'Mbps' | 'Gbps' | 'MB/s'>('Mbps');

  const downloadInfo = useMemo(() => {
    if (fileSize <= 0 || speed <= 0) return null;

    // Convert file size to Bytes
    let bytes = fileSize;
    if (fileUnit === 'MB') bytes *= 1024 * 1024;
    else if (fileUnit === 'GB') bytes *= 1024 * 1024 * 1024;
    else if (fileUnit === 'TB') bytes *= 1024 * 1024 * 1024 * 1024;

    const fileBits = bytes * 8;

    // Convert speed to bits per second (bps)
    let bps = speed;
    if (speedUnit === 'Mbps') bps *= 1_000_000;
    else if (speedUnit === 'Gbps') bps *= 1_000_000_000;
    else if (speedUnit === 'MB/s') bps *= 8 * 1_000_000; // 1 MB/s = 8 Mbps

    const totalSeconds = fileBits / bps;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const speedMBs = bps / (8 * 1_000_000);

    return {
      hours,
      minutes,
      seconds,
      totalSeconds: totalSeconds.toFixed(1),
      speedMBs: speedMBs.toFixed(2),
      formattedTime: `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m ` : ''}${seconds}s`,
    };
  }, [fileSize, fileUnit, speed, speedUnit]);

  // ---------------------------------------------------------------------------
  // 3. STATE: CONVERSOR IP DECIMAL <-> BINÁRIO
  // ---------------------------------------------------------------------------
  const [binaryIpInput, setBinaryIpInput] = useState<string>('172.16.254.1');

  const binaryIpInfo = useMemo(() => {
    const octets = binaryIpInput.split('.').map((o) => parseInt(o, 10));
    const isValid = octets.length === 4 && octets.every((o) => !isNaN(o) && o >= 0 && o <= 255);

    if (!isValid) return null;

    const binaryOctets = octets.map((o) => o.toString(2).padStart(8, '0'));
    const hexOctets = octets.map((o) => o.toString(16).toUpperCase().padStart(2, '0'));

    return {
      octets,
      binaryOctets,
      fullBinary: binaryOctets.join('.'),
      fullHex: hexOctets.join(':'),
      steps: octets.map((o, idx) => ({
        octet: o,
        binary: binaryOctets[idx],
        hex: hexOctets[idx],
      })),
    };
  }, [binaryIpInput]);

  // ---------------------------------------------------------------------------
  // 4. STATE: ATRASO DE TRANSMISSÃO E PROPAGAÇÃO (LATÊNCIA)
  // ---------------------------------------------------------------------------
  const [packetSizeKb, setPacketSizeKb] = useState<number>(1500); // 1500 Bytes (MTU comum)
  const [bandwidthMbps, setBandwidthMbps] = useState<number>(100);
  const [distanceKm, setDistanceKm] = useState<number>(500);

  const latencyInfo = useMemo(() => {
    if (packetSizeKb <= 0 || bandwidthMbps <= 0 || distanceKm <= 0) return null;

    // Transmission Delay: L / R
    // L in bits = packetSizeKb * 8 (assuming Bytes)
    const L_bits = packetSizeKb * 8;
    const R_bps = bandwidthMbps * 1_000_000;
    const transDelaySec = L_bits / R_bps;
    const transDelayMs = transDelaySec * 1000;

    // Propagation Delay: d / s
    // s = speed of light in fiber (~ 200,000 km/s)
    const propagationSpeedKmS = 200000;
    const propDelaySec = distanceKm / propagationSpeedKmS;
    const propDelayMs = propDelaySec * 1000;

    const totalDelayMs = transDelayMs + propDelayMs;

    return {
      transDelayMs: transDelayMs.toFixed(4),
      propDelayMs: propDelayMs.toFixed(4),
      totalDelayMs: totalDelayMs.toFixed(4),
    };
  }, [packetSizeKb, bandwidthMbps, distanceKm]);

  return (
    <div className="space-y-6">
      
      {/* Network Tools Header & Navigation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 border border-sky-500/30 rounded-xl text-sky-400">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Calculadora de Redes de Computadores
              </h2>
              <p className="text-xs text-slate-400">
                Ferramentas essenciais de engenharia de redes: sub-redes IPv4, largura de banda, binário e latência.
              </p>
            </div>
          </div>
        </div>

        {/* Tool Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4">
          <button
            onClick={() => setActiveNetworkTool('subnet')}
            className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
              activeNetworkTool === 'subnet'
                ? 'bg-sky-500 text-slate-950 font-bold border-sky-400 shadow-md shadow-sky-500/20'
                : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <Network className="w-4 h-4 shrink-0" />
            <div className="truncate">
              <span className="text-xs font-semibold block">Sub-rede IPv4 & CIDR</span>
              <span className="text-[10px] opacity-80 block truncate">Máscara, hosts e broadcast</span>
            </div>
          </button>

          <button
            onClick={() => setActiveNetworkTool('download')}
            className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
              activeNetworkTool === 'download'
                ? 'bg-sky-500 text-slate-950 font-bold border-sky-400 shadow-md shadow-sky-500/20'
                : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <DownloadCloud className="w-4 h-4 shrink-0" />
            <div className="truncate">
              <span className="text-xs font-semibold block">Tempo de Download</span>
              <span className="text-[10px] opacity-80 block truncate">Largura de banda e throughput</span>
            </div>
          </button>

          <button
            onClick={() => setActiveNetworkTool('binary')}
            className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
              activeNetworkTool === 'binary'
                ? 'bg-sky-500 text-slate-950 font-bold border-sky-400 shadow-md shadow-sky-500/20'
                : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <Binary className="w-4 h-4 shrink-0" />
            <div className="truncate">
              <span className="text-xs font-semibold block">Decimal ➔ Binário</span>
              <span className="text-[10px] opacity-80 block truncate">Octetos de IP em 8 bits</span>
            </div>
          </button>

          <button
            onClick={() => setActiveNetworkTool('latency')}
            className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
              activeNetworkTool === 'latency'
                ? 'bg-sky-500 text-slate-950 font-bold border-sky-400 shadow-md shadow-sky-500/20'
                : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <Activity className="w-4 h-4 shrink-0" />
            <div className="truncate">
              <span className="text-xs font-semibold block">Latência & Atraso</span>
              <span className="text-[10px] opacity-80 block truncate">Transmissão (L/R) e propagação</span>
            </div>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* TOOL 1: SUB-REDE IPV4 & CIDR                                         */}
      {/* -------------------------------------------------------------------- */}
      {activeNetworkTool === 'subnet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Input Controls (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              Parâmetros da Rede
            </h3>

            {/* IP Address input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Endereço IP (IPv4):
              </label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value.trim())}
                placeholder="192.168.1.10"
                className="w-full bg-slate-950 text-white font-mono text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* CIDR Mask Slider & Number */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-300">Prefixo de Máscara (CIDR):</span>
                <span className="font-mono font-bold text-sky-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  /{cidr}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="32"
                value={cidr}
                onChange={(e) => setCidr(parseInt(e.target.value, 10))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>/8 (Classe A)</span>
                <span>/16 (Classe B)</span>
                <span>/24 (Classe C)</span>
                <span>/30</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-medium text-slate-400 block">Exemplos rápidos:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setIpAddress('192.168.1.100'); setCidr(24); }}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800 font-mono transition-colors"
                >
                  192.168.1.0/24
                </button>
                <button
                  onClick={() => { setIpAddress('10.0.0.50'); setCidr(16); }}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800 font-mono transition-colors"
                >
                  10.0.0.0/16
                </button>
                <button
                  onClick={() => { setIpAddress('172.16.10.5'); setCidr(28); }}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800 font-mono transition-colors"
                >
                  172.16.10.0/28
                </button>
                <button
                  onClick={() => { setIpAddress('192.168.0.1'); setCidr(30); }}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800 font-mono transition-colors"
                >
                  Ponto a Ponto (/30)
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1">
              <div className="text-sky-300 font-semibold flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>Como funciona o cálculo:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                O endereço de rede é obtido pelo operador lógico binário <strong className="text-slate-200">AND</strong> entre o IP e a máscara. O broadcast preenche todos os bits de host com 1.
              </p>
            </div>
          </div>

          {/* Results View (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Resultado do Cálculo da Sub-rede</span>
              {subnetInfo && (
                <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/60">
                  {subnetInfo.usableHosts} Hosts Úteis
                </span>
              )}
            </h3>

            {subnetInfo ? (
              <div className="space-y-2.5 font-mono text-xs">
                
                {/* Network & Broadcast */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Endereço de Rede (Network ID)</span>
                    <span className="text-base font-bold text-sky-400">{subnetInfo.network}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Endereço de Broadcast</span>
                    <span className="text-base font-bold text-amber-400">{subnetInfo.broadcast}</span>
                  </div>
                </div>

                {/* Usable Range */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-500 block">Faixa de IPs Úteis para Dispositivos:</span>
                  <div className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                    <span className="text-emerald-400">{subnetInfo.firstHost}</span>
                    <span className="text-slate-600">➔</span>
                    <span className="text-emerald-400">{subnetInfo.lastHost}</span>
                  </div>
                </div>

                {/* Mask Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Máscara Decimal (Subnet Mask)</span>
                    <span className="text-sm font-semibold text-slate-200">{subnetInfo.mask}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Máscara Curinga (Wildcard)</span>
                    <span className="text-sm font-semibold text-slate-200">{subnetInfo.wildcard}</span>
                  </div>
                </div>

                {/* Binary Mask Representation */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-500 block">Máscara em Formato Binário:</span>
                  <span className="text-xs text-sky-300 break-all select-all font-mono">
                    {subnetInfo.maskBinary}
                  </span>
                </div>

                {/* Metadata Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Total de Endereços IP:</span>
                    <span className="text-white font-bold">{subnetInfo.totalIps}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Classe e Escopo:</span>
                    <span className="text-white font-bold">Classe {subnetInfo.ipClass} · {subnetInfo.scope.split(' ')[0]}</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center text-xs text-rose-400 bg-slate-950 rounded-xl border border-slate-800">
                Endereço IP inválido. Digite um formato como 192.168.1.1 com valores de 0 a 255 em cada octeto.
              </div>
            )}
          </div>

        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TOOL 2: TEMPO DE TRANSFERÊNCIA & DOWNLOAD                            */}
      {/* -------------------------------------------------------------------- */}
      {activeNetworkTool === 'download' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Input Controls (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <DownloadCloud className="w-4 h-4 text-sky-400" />
              <span>Parâmetros de Transferência</span>
            </h3>

            {/* File Size */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Tamanho do Arquivo:</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={fileSize}
                  onChange={(e) => setFileSize(parseFloat(e.target.value) || 0)}
                  className="flex-1 bg-slate-950 text-white font-mono text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-sky-500"
                />
                <select
                  value={fileUnit}
                  onChange={(e) => setFileUnit(e.target.value as any)}
                  className="bg-slate-950 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-700"
                >
                  <option value="MB">Megabytes (MB)</option>
                  <option value="GB">Gigabytes (GB)</option>
                  <option value="TB">Terabytes (TB)</option>
                </select>
              </div>
            </div>

            {/* Connection Speed */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Velocidade da Conexão / Link:</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  step="5"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value) || 0)}
                  className="flex-1 bg-slate-950 text-white font-mono text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-sky-500"
                />
                <select
                  value={speedUnit}
                  onChange={(e) => setSpeedUnit(e.target.value as any)}
                  className="bg-slate-950 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-700"
                >
                  <option value="Mbps">Mbps (Megabits/s)</option>
                  <option value="Gbps">Gbps (Gigabits/s)</option>
                  <option value="MB/s">MB/s (MegaBytes/s)</option>
                </select>
              </div>
            </div>

            {/* Presets */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-medium text-slate-400 block">Cenários comuns:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setFileSize(1.5); setFileUnit('GB'); setSpeed(100); setSpeedUnit('Mbps'); }}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800 transition-colors"
                >
                  Filme HD (1.5 GB em 100 Mbps)
                </button>
                <button
                  onClick={() => { setFileSize(50); setFileUnit('GB'); setSpeed(300); setSpeedUnit('Mbps'); }}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800 transition-colors"
                >
                  Jogo Grande (50 GB em 300 Mbps)
                </button>
                <button
                  onClick={() => { setFileSize(1); setFileUnit('TB'); setSpeed(1); setSpeedUnit('Gbps'); }}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800 transition-colors"
                >
                  Backup 1 TB (Link 1 Gbps)
                </button>
              </div>
            </div>

            {/* Explanation of bits vs bytes */}
            <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-amber-200/90 space-y-1">
              <div className="font-semibold text-amber-300 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>A pegadinha de Redes: bits vs Bytes</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Um plano de 100 Mbps baixa no máximo <strong className="text-white">12,5 MB/s</strong>, pois 1 Byte é formado por 8 bits. É por isso que dividimos por 8!
              </p>
            </div>
          </div>

          {/* Results View (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-white">
              Estimativa de Tempo de Download / Transferência
            </h3>

            {downloadInfo ? (
              <div className="space-y-4">
                
                {/* Big Highlight Time */}
                <div className="p-6 bg-slate-950 rounded-2xl border border-sky-500/30 text-center space-y-1">
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">
                    Tempo Estimado de Conclusão:
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-sky-400 font-mono tracking-tight">
                    {downloadInfo.formattedTime}
                  </div>
                  <span className="text-xs text-slate-500 font-mono block">
                    (Exatamente {downloadInfo.totalSeconds} segundos)
                  </span>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Taxa Real de Download em Disco:</span>
                    <span className="text-lg font-bold text-emerald-400">~{downloadInfo.speedMBs} MB/s</span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Tamanho Total da Carga:</span>
                    <span className="text-lg font-bold text-white">{fileSize} {fileUnit}</span>
                  </div>
                </div>

                {/* Educational Formula Card */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <span className="font-semibold text-slate-200">Fórmula de Engenharia:</span>
                  <pre className="font-mono text-[11px] text-sky-300 bg-slate-900 p-2 rounded">
Tempo = (Tamanho_em_Bytes × 8) ÷ Largura_de_Banda_em_bps
                  </pre>
                </div>

              </div>
            ) : null}
          </div>

        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TOOL 3: DECIMAL <-> BINÁRIO (OCTETOS)                                 */}
      {/* -------------------------------------------------------------------- */}
      {activeNetworkTool === 'binary' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="max-w-xl space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Binary className="w-4 h-4 text-sky-400" />
              <span>Conversor de Endereço IP (Decimal ➔ Binário de 8 bits)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Cada endereço IPv4 é composto por 32 bits divididos em 4 octetos de 8 bits cada. Digite um IP para inspecionar a conversão de cada octeto.
            </p>
            <div className="pt-2">
              <input
                type="text"
                value={binaryIpInput}
                onChange={(e) => setBinaryIpInput(e.target.value.trim())}
                placeholder="192.168.0.1"
                className="w-full bg-slate-950 text-white font-mono text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {binaryIpInfo ? (
            <div className="space-y-4">
              
              {/* Full Binary Banner */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-sky-500/30 font-mono text-center space-y-1">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                  Representação Binária Completa (32 bits):
                </span>
                <div className="text-lg sm:text-xl font-bold text-emerald-400 tracking-wider break-all select-all">
                  {binaryIpInfo.fullBinary}
                </div>
              </div>

              {/* 4 Octets Visual Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {binaryIpInfo.steps.map((step, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase">Octeto #{idx + 1}</span>
                    <div className="text-2xl font-extrabold text-white">{step.octet}</div>
                    <div className="text-xs font-bold text-sky-400 pt-1 border-t border-slate-800/80">
                      {step.binary}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Hex: 0x{step.hex}
                    </div>
                  </div>
                ))}
              </div>

              {/* Weights Table for Education */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-2 text-slate-300">
                <span className="font-semibold text-slate-200">Como converter manualmente (Pesos dos 8 bits):</span>
                <div className="grid grid-cols-8 gap-1 text-center font-mono text-[11px] max-w-md">
                  <div className="p-1 bg-slate-900 rounded border border-slate-800">128</div>
                  <div className="p-1 bg-slate-900 rounded border border-slate-800">64</div>
                  <div className="p-1 bg-slate-900 rounded border border-slate-800">32</div>
                  <div className="p-1 bg-slate-900 rounded border border-slate-800">16</div>
                  <div className="p-1 bg-slate-900 rounded border border-slate-800">8</div>
                  <div className="p-1 bg-slate-900 rounded border border-slate-800">4</div>
                  <div className="p-1 bg-slate-900 rounded border border-slate-800">2</div>
                  <div className="p-1 bg-slate-900 rounded border border-slate-800">1</div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Some os valores onde o bit é 1 para obter o número decimal original!
                </p>
              </div>

            </div>
          ) : (
            <div className="p-4 bg-rose-950/30 text-rose-300 rounded-xl text-xs border border-rose-800/50">
              Digite um endereço IPv4 válido no formato x.x.x.x com valores de 0 a 255.
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TOOL 4: ATRASO E LATÊNCIA (TRANSMISSÃO E PROPAGAÇÃO)                  */}
      {/* -------------------------------------------------------------------- */}
      {activeNetworkTool === 'latency' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              <span>Parâmetros de Enlace</span>
            </h3>

            {/* Packet Size */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Tamanho do Pacote (L):</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="64"
                  value={packetSizeKb}
                  onChange={(e) => setPacketSizeKb(parseInt(e.target.value, 10) || 0)}
                  className="flex-1 bg-slate-950 text-white font-mono text-sm px-3.5 py-2 rounded-xl border border-slate-700"
                />
                <span className="p-2 text-xs text-slate-400 bg-slate-950 rounded-xl border border-slate-800 flex items-center">
                  Bytes
                </span>
              </div>
            </div>

            {/* Link Bandwidth */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Largura de Banda do Link (R):</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={bandwidthMbps}
                  onChange={(e) => setBandwidthMbps(parseFloat(e.target.value) || 0)}
                  className="flex-1 bg-slate-950 text-white font-mono text-sm px-3.5 py-2 rounded-xl border border-slate-700"
                />
                <span className="p-2 text-xs text-slate-400 bg-slate-950 rounded-xl border border-slate-800 flex items-center">
                  Mbps
                </span>
              </div>
            </div>

            {/* Distance */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Distância Física (d):</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 0)}
                  className="flex-1 bg-slate-950 text-white font-mono text-sm px-3.5 py-2 rounded-xl border border-slate-700"
                />
                <span className="p-2 text-xs text-slate-400 bg-slate-950 rounded-xl border border-slate-800 flex items-center">
                  km
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Conceitos de Kurose & Ross:</div>
              <p>• <strong>Transmissão (L/R)</strong>: Tempo para empurrar os bits no fio.</p>
              <p>• <strong>Propagação (d/s)</strong>: Tempo que o sinal leva para viajar no meio (~200.000 km/s).</p>
            </div>
          </div>

          {/* Results View (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white">
              Cálculo de Atraso e Latência Nodal
            </h3>

            {latencyInfo ? (
              <div className="space-y-3 font-mono text-xs">
                
                {/* Total Delay */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-sky-500/40 text-center space-y-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider block">
                    Atraso Total Nodal (Transmissão + Propagação):
                  </span>
                  <div className="text-3xl font-extrabold text-sky-400">
                    {latencyInfo.totalDelayMs} ms
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Atraso de Transmissão (L/R):</span>
                    <span className="text-base font-bold text-emerald-400">{latencyInfo.transDelayMs} ms</span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Atraso de Propagação (d/s):</span>
                    <span className="text-base font-bold text-amber-400">{latencyInfo.propDelayMs} ms</span>
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>
      )}

    </div>
  );
};
