import React, { useState } from 'react';
import { Header } from './components/Header';
import { TerminalSimulator } from './components/TerminalSimulator';
import { CodeViewer } from './components/CodeViewer';
import { DidacticGuide } from './components/DidacticGuide';
import { LocalSetupGuide } from './components/LocalSetupGuide';
import { ChallengesTab } from './components/ChallengesTab';
import { Terminal, Code2, BookOpen, Laptop, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'guide' | 'setup' | 'challenges'>('simulator');
  const [subView, setSubView] = useState<'both' | 'terminal' | 'code'>('both');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* 3-Zone Top Bar Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Tab 1: Simulator & Code */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            
            {/* Context Subheader & Mode Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Calculadora em Python: Simulador & Código</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Teste o script interativamente no terminal virtual ou explore a sintaxe comentada ao lado.
                </p>
              </div>

              {/* View layout selector */}
              <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs self-stretch sm:self-auto justify-center">
                <button
                  onClick={() => setSubView('both')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                    subView === 'both'
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Lado a Lado
                </button>
                <button
                  onClick={() => setSubView('terminal')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                    subView === 'terminal'
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Apenas Terminal</span>
                </button>
                <button
                  onClick={() => setSubView('code')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                    subView === 'code'
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Apenas Código</span>
                </button>
              </div>
            </div>

            {/* SubViews Rendering */}
            {subView === 'both' && (
              <div className="space-y-8">
                {/* Section 1: Terminal Interactive */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-sky-400" />
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                      Terminal Interativo de Execução
                    </h2>
                  </div>
                  <TerminalSimulator />
                </div>

                {/* Section 2: Code Viewer */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 className="w-4 h-4 text-sky-400" />
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                      Código Fonte Comentado (calculadora.py)
                    </h2>
                  </div>
                  <CodeViewer />
                </div>
              </div>
            )}

            {subView === 'terminal' && (
              <div className="space-y-4">
                <TerminalSimulator />
              </div>
            )}

            {subView === 'code' && (
              <div className="space-y-4">
                <CodeViewer />
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Didactic Guide */}
        {activeTab === 'guide' && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-800/80">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-sky-400" />
                <span>Guia Didático dos Principais Componentes</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Aprenda o papel de cada estrutura utilizada: funções, estruturas condicionais, laços e exceções.
              </p>
            </div>
            <DidacticGuide />
          </div>
        )}

        {/* Tab 3: Local Setup */}
        {activeTab === 'setup' && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-800/80">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Laptop className="w-6 h-6 text-sky-400" />
                <span>Como Executar o Script no seu Computador</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Passo a passo com comandos para Windows, macOS, Linux e suporte no Visual Studio Code.
              </p>
            </div>
            <LocalSetupGuide />
          </div>
        )}

        {/* Tab 4: Challenges */}
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-800/80">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-sky-400" />
                <span>Desafios Práticos de Programação</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Exercícios práticos com dicas e soluções para exercitar novas operações matemáticas no código.
              </p>
            </div>
            <ChallengesTab />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            Laboratório Didático da Calculadora em Python · Guia completo para quem está aprendendo a programar.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-sky-400 transition-colors"
            >
              Guia de Conceitos
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('setup')}
              className="hover:text-sky-400 transition-colors"
            >
              Instalação Local
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('challenges')}
              className="hover:text-sky-400 transition-colors"
            >
              Desafios
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
