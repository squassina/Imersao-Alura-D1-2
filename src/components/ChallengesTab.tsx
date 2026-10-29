import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp, Lightbulb, Code2, Award } from 'lucide-react';
import { BEGINNER_CHALLENGES, Challenge } from '../data/pythonCalculator';

export const ChallengesTab: React.FC = () => {
  const [openTips, setOpenTips] = useState<Record<string, boolean>>({});
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});

  const toggleTip = (id: string) => {
    setOpenTips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id: string) => {
    setOpenSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-sky-400" />
          <h2 className="text-xl font-bold text-white">
            Desafios Práticos de Fixação
          </h2>
        </div>
        <p className="text-sm text-slate-300">
          A melhor maneira de aprender a programar é alterando o código você mesmo(a). Tente implementar as funcionalidades abaixo no seu arquivo <code className="text-sky-400 font-mono">calculadora.py</code>.
        </p>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {BEGINNER_CHALLENGES.map((challenge) => {
          const isTipOpen = !!openTips[challenge.id];
          const isSolutionOpen = !!openSolutions[challenge.id];

          return (
            <div
              key={challenge.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded font-mono font-medium bg-sky-950 text-sky-300 border border-sky-800/60">
                      Nível {challenge.level}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {challenge.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {challenge.description}
              </p>

              {/* Action Buttons: Dica & Solução */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => toggleTip(challenge.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300 bg-amber-950/30 hover:bg-amber-900/40 border border-amber-800/40 transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{isTipOpen ? 'Ocultar Dica' : 'Ver Dica'}</span>
                  {isTipOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                <button
                  onClick={() => toggleSolution(challenge.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-300 bg-sky-950/30 hover:bg-sky-900/40 border border-sky-800/40 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{isSolutionOpen ? 'Ocultar Solução' : 'Ver Solução em Python'}</span>
                  {isSolutionOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Collapsible Tip */}
              {isTipOpen && (
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/50 text-xs text-amber-200/90 leading-relaxed">
                  <strong className="text-amber-300 block mb-1">💡 Dica para o exercício:</strong>
                  {challenge.tip}
                </div>
              )}

              {/* Collapsible Solution */}
              {isSolutionOpen && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-sky-400">Código da Solução:</span>
                    <span>Python 3</span>
                  </div>
                  <pre className="font-mono text-xs text-emerald-300 bg-slate-900 p-3 rounded-lg overflow-x-auto leading-relaxed border border-slate-800">
                    {challenge.solutionCode}
                  </pre>
                  <p className="text-xs text-slate-400 pt-1">
                    <strong className="text-slate-300">Explicação: </strong>
                    {challenge.explanation}
                  </p>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Motivational Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-500/30 flex items-center gap-4 text-xs text-slate-300">
        <Award className="w-8 h-8 text-emerald-400 shrink-0" />
        <div>
          <h4 className="font-bold text-white text-sm mb-0.5">Parabéns por começar a programar!</h4>
          <p className="text-slate-400">
            A programação se aprende errando, testando e descobrindo aos poucos. Se você conseguir implementar um desses desafios, já estará aplicando lógica computacional real!
          </p>
        </div>
      </div>

    </div>
  );
};
