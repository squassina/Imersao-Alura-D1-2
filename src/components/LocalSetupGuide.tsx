import React, { useState } from 'react';
import { Terminal, Download, Monitor, CheckCircle, AlertOctagon, HelpCircle } from 'lucide-react';
import { PYTHON_SCRIPT_CODE } from '../data/pythonCalculator';

export const LocalSetupGuide: React.FC = () => {
  const [activeOS, setActiveOS] = useState<'windows' | 'mac' | 'linux'>('windows');

  const handleDownload = () => {
    const blob = new Blob([PYTHON_SCRIPT_CODE], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculadora.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 border border-sky-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
              Guia Prático para Iniciantes
            </span>
            <h2 className="text-xl font-bold text-white">
              Como executar este código no seu computador
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Siga os 3 passos simples abaixo para rodar o arquivo Python na sua máquina.
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Baixar calculadora.py</span>
          </button>
        </div>
      </div>

      {/* OS Selector */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl max-w-md mx-auto text-xs">
        <button
          onClick={() => setActiveOS('windows')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-all ${
            activeOS === 'windows'
              ? 'bg-sky-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Windows
        </button>
        <button
          onClick={() => setActiveOS('mac')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-all ${
            activeOS === 'mac'
              ? 'bg-sky-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          macOS
        </button>
        <button
          onClick={() => setActiveOS('linux')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-all ${
            activeOS === 'linux'
              ? 'bg-sky-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Linux
        </button>
      </div>

      {/* Step by Step Cards */}
      <div className="space-y-4">
        
        {/* Step 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center border border-sky-500/40">
              1
            </span>
            <h3 className="text-base font-bold text-white">
              Verifique se o Python está instalado
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-10">
            Abra o terminal do seu sistema ({activeOS === 'windows' ? 'PowerShell ou Prompt de Comando' : 'Terminal'}) e digite o comando de verificação:
          </p>
          <div className="pl-10">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between">
              <span>{activeOS === 'windows' ? 'python --version' : 'python3 --version'}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Se aparecer uma versão como <code className="text-slate-200">Python 3.10+</code>, está pronto! Caso dê "comando não encontrado", baixe gratuitamente no site oficial{' '}
              <a href="https://www.python.org/downloads/" target="_blank" rel="noreferrer" className="text-sky-400 underline">
                python.org
              </a>.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center border border-sky-500/40">
              2
            </span>
            <h3 className="text-base font-bold text-white">
              Salve o arquivo calculadora.py em uma pasta
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-10">
            Crie uma pasta no seu computador (por exemplo, na pasta Documentos: <code className="text-slate-200">meus-projetos-python</code>) e coloque o arquivo <code className="text-sky-400">calculadora.py</code> baixado dentro dela.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center border border-sky-500/40">
              3
            </span>
            <h3 className="text-base font-bold text-white">
              Execute o arquivo no Terminal
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-10">
            No terminal, navegue até a pasta onde salvou o arquivo e rode o comando:
          </p>
          <div className="pl-10 space-y-2">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between">
              <span>{activeOS === 'windows' ? 'python calculadora.py' : 'python3 calculadora.py'}</span>
            </div>
            <p className="text-xs text-slate-400">
              O menu interativo abrirá imediatamente no seu terminal, pronto para receber suas opções e números!
            </p>
          </div>
        </div>

      </div>

      {/* VS Code Recommendation */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-sky-400" />
          <h4 className="text-sm font-bold text-white">
            Prefere usar o Visual Studio Code (VS Code)?
          </h4>
        </div>
        <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside pl-2 leading-relaxed">
          <li>Abra o VS Code e abra a pasta onde está o arquivo <code className="text-slate-200">calculadora.py</code>.</li>
          <li>Instale a extensão oficial de <strong>Python</strong> da Microsoft na aba de extensões (ícone de blocos).</li>
          <li>Abra o arquivo <code className="text-slate-200">calculadora.py</code> e clique no botão de <strong>Play (Executar)</strong> no canto superior direito.</li>
          <li>O terminal embutido do VS Code abrirá embaixo executando sua calculadora automaticamente.</li>
        </ol>
      </div>

      {/* Common Beginner Errors */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertOctagon className="w-5 h-5" />
          <h4 className="text-sm font-bold text-white">
            Erros comuns de quem está começando e como resolver
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-rose-300">IndentationError (Identação incorreta)</span>
            <p className="text-slate-400">
              Em Python, o alinhamento das linhas importa! Tudo o que fica dentro de uma função ou de um <code className="text-slate-200">if</code> deve ter exatamente 4 espaços de recuo.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-rose-300">SyntaxError: expected ':'</span>
            <p className="text-slate-400">
              Esquecer os dois pontos (<code className="text-slate-200">:</code>) no final das linhas de <code className="text-slate-200">def</code>, <code className="text-slate-200">if</code>, <code className="text-slate-200">elif</code> ou <code className="text-slate-200">while</code> é muito comum.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
