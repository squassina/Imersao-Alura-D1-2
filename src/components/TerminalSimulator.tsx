import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, CornerDownLeft, Sparkles, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'banner' | 'menu' | 'prompt' | 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
}

type TerminalState = 'WAITING_FOR_OPTION' | 'WAITING_FOR_NUM1' | 'WAITING_FOR_NUM2' | 'TERMINATED';

export const TerminalSimulator: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [terminalState, setTerminalState] = useState<TerminalState>('WAITING_FOR_OPTION');

  // Track Python runtime memory variables
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [num1, setNum1] = useState<number | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  const [lastResult, setLastResult] = useState<string | number | null>(null);
  const [activeFunction, setActiveFunction] = useState<string | null>(null);
  const [loopCount, setLoopCount] = useState<number>(1);
  const [lastError, setLastError] = useState<string | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to append lines
  const appendLines = (newLines: Omit<TerminalLine, 'id'>[]) => {
    setLines((prev) => [
      ...prev,
      ...newLines.map((l, index) => ({
        ...l,
        id: `${Date.now()}-${index}-${Math.random()}`,
      })),
    ]);
  };

  const getMenuLines = (): Omit<TerminalLine, 'id'>[] => [
    { type: 'banner', text: '================================' },
    { type: 'banner', text: '      CALCULADORA EM PYTHON     ' },
    { type: 'banner', text: '================================' },
    { type: 'menu', text: '1. Adição (+)' },
    { type: 'menu', text: '2. Subtração (-)' },
    { type: 'menu', text: '3. Multiplicação (*)' },
    { type: 'menu', text: '4. Divisão (/)' },
    { type: 'menu', text: '5. Sair do programa' },
    { type: 'banner', text: '================================' },
    { type: 'prompt', text: 'Escolha uma opção (1-5):' },
  ];

  // Initialize terminal on mount
  const initTerminal = () => {
    setLines([
      { id: '1', type: 'system', text: 'Python 3.12.0 (simulador interativo web)' },
      { id: '2', type: 'system', text: '$ python calculadora.py' },
      { id: '3', type: 'output', text: 'Bem-vindo(a) à sua Calculadora em Python!' },
      ...getMenuLines().map((l, i) => ({ ...l, id: `init-${i}` })),
    ]);
    setTerminalState('WAITING_FOR_OPTION');
    setSelectedOption(null);
    setNum1(null);
    setNum2(null);
    setLastResult(null);
    setActiveFunction(null);
    setLoopCount(1);
    setLastError(null);
    setInputValue('');
  };

  useEffect(() => {
    initTerminal();
  }, []);

  // Auto scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleUserInput = (rawInput: string) => {
    const input = rawInput.trim();
    if (!input && terminalState !== 'TERMINATED') return;

    if (terminalState === 'WAITING_FOR_OPTION') {
      appendLines([
        { type: 'input', text: `> ${input}` },
      ]);

      if (input === '5') {
        appendLines([
          { type: 'system', text: 'Obrigado por utilizar a calculadora. Bons estudos na programação! 👋' },
          { type: 'system', text: '[Processo encerrado com código 0]' },
        ]);
        setTerminalState('TERMINATED');
        setSelectedOption('5');
        setActiveFunction(null);
        return;
      }

      if (!['1', '2', '3', '4'].includes(input)) {
        setLastError('Opção inexistente no menu');
        appendLines([
          { type: 'error', text: '[!] Opção inválida. Por favor, digite um número de 1 a 5.' },
          ...getMenuLines(),
        ]);
        return;
      }

      const opNames: Record<string, string> = {
        '1': 'somar(a, b)',
        '2': 'subtrair(a, b)',
        '3': 'multiplicar(a, b)',
        '4': 'dividir(a, b)',
      };

      setSelectedOption(input);
      setActiveFunction(opNames[input]);
      setLastError(null);
      setTerminalState('WAITING_FOR_NUM1');
      appendLines([
        { type: 'prompt', text: 'Digite o primeiro número:' },
      ]);
      return;
    }

    if (terminalState === 'WAITING_FOR_NUM1') {
      appendLines([{ type: 'input', text: `> ${input}` }]);

      const parsed = parseFloat(input);
      if (isNaN(parsed)) {
        setLastError('ValueError: texto não pode ser convertido para float()');
        appendLines([
          { type: 'error', text: '[!] Entrada inválida: Digite apenas valores numéricos (ex: 10 ou 3.14).' },
          { type: 'system', text: '--- Reiniciando ciclo do laço (continue) ---' },
          ...getMenuLines(),
        ]);
        setTerminalState('WAITING_FOR_OPTION');
        setSelectedOption(null);
        setActiveFunction(null);
        return;
      }

      setNum1(parsed);
      setLastError(null);
      setTerminalState('WAITING_FOR_NUM2');
      appendLines([
        { type: 'prompt', text: 'Digite o segundo número:' },
      ]);
      return;
    }

    if (terminalState === 'WAITING_FOR_NUM2') {
      appendLines([{ type: 'input', text: `> ${input}` }]);

      const parsed = parseFloat(input);
      if (isNaN(parsed)) {
        setLastError('ValueError: texto não pode ser convertido para float()');
        appendLines([
          { type: 'error', text: '[!] Entrada inválida: Digite apenas valores numéricos (ex: 10 ou 3.14).' },
          { type: 'system', text: '--- Reiniciando ciclo do laço (continue) ---' },
          ...getMenuLines(),
        ]);
        setTerminalState('WAITING_FOR_OPTION');
        setSelectedOption(null);
        setActiveFunction(null);
        return;
      }

      setNum2(parsed);
      setLoopCount((c) => c + 1);

      // Execute Python functions logic
      let resultVal: number | string = 0;
      let symbol = '+';

      if (selectedOption === '1') {
        resultVal = (num1 ?? 0) + parsed;
        symbol = '+';
      } else if (selectedOption === '2') {
        resultVal = (num1 ?? 0) - parsed;
        symbol = '-';
      } else if (selectedOption === '3') {
        resultVal = (num1 ?? 0) * parsed;
        symbol = '*';
      } else if (selectedOption === '4') {
        symbol = '/';
        if (parsed === 0) {
          resultVal = 'Erro: Não é possível dividir por zero!';
          setLastError('ZeroDivisionError prevenido por if b == 0');
        } else {
          resultVal = (num1 ?? 0) / parsed;
          setLastError(null);
        }
      }

      // Format clean numbers (e.g. 15 instead of 15.0 if integer, or keep standard)
      setLastResult(resultVal);

      if (typeof resultVal === 'string') {
        appendLines([
          { type: 'error', text: `--> ${resultVal}` },
          ...getMenuLines(),
        ]);
      } else {
        appendLines([
          {
            type: 'success',
            text: `--> Resultado: ${num1} ${symbol} ${parsed} = ${resultVal}`,
          },
          ...getMenuLines(),
        ]);
      }

      setTerminalState('WAITING_FOR_OPTION');
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const current = inputValue;
    setInputValue('');
    handleUserInput(current);
  };

  const runPreset = (sequence: string[]) => {
    initTerminal();
    let step = 0;
    const interval = setInterval(() => {
      if (step < sequence.length) {
        handleUserInput(sequence[step]);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 400);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Terminal Viewport (Col 1-8) */}
      <div className="lg:col-span-8 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            <span className="ml-2 text-xs font-mono text-slate-400">
              calculadora.py · Terminal Bash
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={initTerminal}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              title="Reiniciar execução do programa"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto max-h-[460px] min-h-[400px] space-y-1.5 leading-relaxed bg-slate-950/50">
          {lines.map((line) => {
            if (line.type === 'banner') {
              return (
                <div key={line.id} className="text-slate-500 font-bold tracking-wider select-none">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'menu') {
              return (
                <div key={line.id} className="text-sky-300 pl-2">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'prompt') {
              return (
                <div key={line.id} className="text-amber-400 font-semibold pt-1">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-emerald-400 font-bold">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.id} className="bg-emerald-950/30 text-emerald-300 border border-emerald-800/50 px-3 py-1.5 rounded my-1 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{line.text}</span>
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={line.id} className="bg-rose-950/30 text-rose-300 border border-rose-800/50 px-3 py-1.5 rounded my-1 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{line.text}</span>
                </div>
              );
            }
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-slate-400 italic text-xs">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-slate-200">
                {line.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar Form */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          {terminalState === 'TERMINATED' ? (
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400">
                O programa foi finalizado pelo comando <code className="text-amber-400">break</code> (opção 5).
              </span>
              <button
                onClick={initTerminal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-md transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Executar Novamente</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-sky-400 font-mono font-bold select-none pl-1">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  terminalState === 'WAITING_FOR_OPTION'
                    ? 'Digite 1, 2, 3, 4 ou 5 e pressione Enter...'
                    : terminalState === 'WAITING_FOR_NUM1'
                    ? 'Digite o primeiro número (ex: 25)...'
                    : 'Digite o segundo número (ex: 5)...'
                }
                className="flex-1 bg-slate-900/90 text-slate-100 placeholder-slate-500 text-sm font-mono px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                autoFocus
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="px-3.5 py-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:hover:bg-sky-500 text-slate-950 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
              >
                <span>Enviar</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </form>
          )}

          {/* Quick Presets for Instant Testing */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center flex-wrap gap-1.5 text-xs">
            <span className="text-slate-500 flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>Testes rápidos:</span>
            </span>
            <button
              onClick={() => runPreset(['1', '15', '27'])}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
            >
              Soma (15 + 27)
            </button>
            <button
              onClick={() => runPreset(['2', '100', '42'])}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
            >
              Subtração (100 - 42)
            </button>
            <button
              onClick={() => runPreset(['3', '8', '7'])}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
            >
              Multiplicação (8 × 7)
            </button>
            <button
              onClick={() => runPreset(['4', '10', '0'])}
              className="px-2 py-1 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/40 rounded text-xs transition-colors"
            >
              Divisão por Zero (10 ÷ 0)
            </button>
            <button
              onClick={() => runPreset(['1', 'dez'])}
              className="px-2 py-1 bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-800/40 rounded text-xs transition-colors"
            >
              Entrada com Texto ('dez')
            </button>
            <button
              onClick={() => runPreset(['5'])}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded text-xs transition-colors ml-auto"
            >
              Sair (Opção 5)
            </button>
          </div>
        </div>

      </div>

      {/* Memory & Variable State Inspector (Col 9-12) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        
        {/* Runtime State Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              Inspetor de Memória (Variáveis)
            </h3>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              Ciclo do Loop #{loopCount}
            </span>
          </div>

          <div className="mt-4 space-y-3 font-mono text-xs">
            
            {/* Opcao */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400">opcao (str):</span>
              <span className="text-amber-300 font-semibold">
                {selectedOption ? `"${selectedOption}"` : 'None'}
              </span>
            </div>

            {/* Num1 */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400">num1 (float):</span>
              <span className="text-sky-300 font-semibold">
                {num1 !== null ? num1 : 'None'}
              </span>
            </div>

            {/* Num2 */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400">num2 (float):</span>
              <span className="text-sky-300 font-semibold">
                {num2 !== null ? num2 : 'None'}
              </span>
            </div>

            {/* Active Function */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400">função ativa:</span>
              <span className="text-emerald-400 font-semibold">
                {activeFunction || 'Nenhuma (Aguardando)'}
              </span>
            </div>

            {/* Result */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400">resultado:</span>
              <span className="text-white font-bold">
                {lastResult !== null ? String(lastResult) : 'Aguardando cálculo'}
              </span>
            </div>

            {/* Loop Status */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400">estado do laço:</span>
              <span className={terminalState === 'TERMINATED' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {terminalState === 'TERMINATED' ? 'Encerrado (break)' : 'Ativo (while True)'}
              </span>
            </div>

          </div>

          {/* Exception Watcher */}
          {lastError && (
            <div className="mt-4 p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-rose-200">Exceção Capturada com Sucesso:</div>
                <div className="font-mono text-[11px] mt-0.5">{lastError}</div>
              </div>
            </div>
          )}

        </div>

        {/* Pedagogical Note Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
          <div className="font-semibold text-sky-400 flex items-center gap-1.5">
            <span>💡 Como o Python pensa aqui:</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Cada vez que você digita uma opção, a função <code className="text-slate-200 bg-slate-800 px-1 py-0.5 rounded">input()</code> captura um texto (string). Depois, a função <code className="text-slate-200 bg-slate-800 px-1 py-0.5 rounded">float()</code> converte para número.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Se a entrada for válida, a condição correspondente (<code className="text-slate-200 bg-slate-800 px-1 py-0.5 rounded">if / elif</code>) invoca a função aritmética correta, retornando o resultado.
          </p>
        </div>

      </div>

    </div>
  );
};
