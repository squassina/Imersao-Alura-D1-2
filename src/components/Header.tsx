import React, { useState } from 'react';
import { Terminal, Download, Check, Copy } from 'lucide-react';
import { PYTHON_SCRIPT_CODE } from '../data/pythonCalculator';

interface HeaderProps {
  activeTab: 'simulator' | 'guide' | 'setup' | 'challenges';
  setActiveTab: (tab: 'simulator' | 'guide' | 'setup' | 'challenges') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(PYTHON_SCRIPT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = PYTHON_SCRIPT_CODE;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8 h-16">
        
        {/* Zone 1: Single text element wordmark with icon */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              PyCalc Lab
            </span>
            <span className="text-xs text-slate-400 whitespace-nowrap">
              Calculadora Python para Iniciantes
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'simulator'
                ? 'bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Simulador & Código
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'guide'
                ? 'bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Guia Didático
          </button>
          <button
            onClick={() => setActiveTab('setup')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'setup'
                ? 'bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Como Rodar no PC
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'challenges'
                ? 'bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Desafios Práticos
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Copiar código completo"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar .py</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
            title="Baixar calculadora.py"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Script</span>
          </button>
        </div>

      </div>

      {/* Mobile navigation tab strip */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-slate-800/80 gap-2 bg-slate-950/95 text-xs">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-3 py-1 rounded whitespace-nowrap ${
            activeTab === 'simulator' ? 'bg-sky-500/20 text-sky-300 font-semibold' : 'text-slate-400'
          }`}
        >
          Simulador & Código
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-3 py-1 rounded whitespace-nowrap ${
            activeTab === 'guide' ? 'bg-sky-500/20 text-sky-300 font-semibold' : 'text-slate-400'
          }`}
        >
          Guia Didático
        </button>
        <button
          onClick={() => setActiveTab('setup')}
          className={`px-3 py-1 rounded whitespace-nowrap ${
            activeTab === 'setup' ? 'bg-sky-500/20 text-sky-300 font-semibold' : 'text-slate-400'
          }`}
        >
          Como Rodar no PC
        </button>
        <button
          onClick={() => setActiveTab('challenges')}
          className={`px-3 py-1 rounded whitespace-nowrap ${
            activeTab === 'challenges' ? 'bg-sky-500/20 text-sky-300 font-semibold' : 'text-slate-400'
          }`}
        >
          Desafios
        </button>
      </div>
    </header>
  );
};
