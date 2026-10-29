import React, { useState } from 'react';
import { Copy, Check, Info, Code2, Sparkles, BookOpen } from 'lucide-react';
import { PYTHON_SCRIPT_CODE, CODE_SECTIONS, CodeSection } from '../data/pythonCalculator';

export const CodeViewer: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<CodeSection>(CODE_SECTIONS[0]);
  const [copied, setCopied] = useState(false);

  const lines = PYTHON_SCRIPT_CODE.split('\n');

  const handleCopy = async () => {
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

  const isLineHighlighted = (lineNumber: number): boolean => {
    if (!selectedSection) return false;
    return lineNumber >= selectedSection.lines[0] && lineNumber <= selectedSection.lines[1];
  };

  return (
    <div className="space-y-6">
      
      {/* Component Navigation Chips */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Anatomia do Código: Clique para explorar cada componente
            </span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            7 seções fundamentais explicadas
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {CODE_SECTIONS.map((sec) => {
            const isSelected = selectedSection.id === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSection(sec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Component Explanation Box */}
        {selectedSection && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-sky-500/30 text-xs text-slate-300 space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>{selectedSection.title}</span>
                <span className="text-[11px] font-mono text-slate-400 font-normal ml-2">
                  (Linhas {selectedSection.lines[0]} a {selectedSection.lines[1]})
                </span>
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-sm">
              {selectedSection.explanation}
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-slate-400">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Por que isso é importante: </strong>
                {selectedSection.whyItMatters}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Code Editor Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-sky-400" />
            <span className="font-mono text-xs text-slate-300 font-semibold">
              calculadora.py
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">
              Python 3.x
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-md transition-colors font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Tudo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Content with Line Numbers */}
        <div className="overflow-x-auto p-4 font-mono text-xs md:text-sm bg-slate-950/90 leading-relaxed max-h-[600px] overflow-y-auto">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((lineContent, index) => {
                const lineNumber = index + 1;
                const isHighlighted = isLineHighlighted(lineNumber);

                // Simple syntax color cues
                let lineStyling = 'text-slate-300';
                const trimmed = lineContent.trim();

                if (trimmed.startsWith('#')) {
                  lineStyling = 'text-slate-500 italic';
                } else if (trimmed.startsWith('def ')) {
                  lineStyling = 'text-sky-300 font-semibold';
                } else if (trimmed.startsWith('if ') || trimmed.startsWith('elif ') || trimmed.startsWith('else:')) {
                  lineStyling = 'text-amber-300 font-medium';
                } else if (trimmed.startsWith('while ') || trimmed === 'break' || trimmed === 'continue') {
                  lineStyling = 'text-purple-300 font-semibold';
                } else if (trimmed.startsWith('try:') || trimmed.startsWith('except ')) {
                  lineStyling = 'text-rose-300 font-medium';
                } else if (trimmed.startsWith('return ')) {
                  lineStyling = 'text-emerald-300 font-semibold';
                }

                return (
                  <tr
                    key={lineNumber}
                    className={`transition-colors ${
                      isHighlighted
                        ? 'bg-sky-500/15 border-l-2 border-sky-400'
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    {/* Line number */}
                    <td className="w-12 select-none text-right pr-4 text-slate-600 font-mono text-xs align-top pt-0.5">
                      {lineNumber}
                    </td>

                    {/* Code text */}
                    <td className="whitespace-pre font-mono text-xs md:text-sm pt-0.5">
                      <span className={lineStyling}>{lineContent || ' '}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
