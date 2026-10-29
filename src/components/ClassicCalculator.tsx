import React, { useState, useEffect, useCallback } from 'react';
import { Delete, History, RotateCcw, Copy, Check, ArrowRightLeft } from 'lucide-react';

interface CalculationHistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
}

export const ClassicCalculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>('');
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Clear All
  const clearAll = () => {
    setDisplayValue('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setExpression('');
  };

  // Clear current entry
  const clearEntry = () => {
    setDisplayValue('0');
  };

  // Delete last digit (Backspace)
  const backspace = () => {
    if (waitingForOperand) return;
    if (displayValue.length === 1 || (displayValue.length === 2 && displayValue.startsWith('-'))) {
      setDisplayValue('0');
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
  };

  // Input Digit
  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  }, [displayValue, waitingForOperand]);

  // Input Dot
  const inputDot = useCallback(() => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  }, [displayValue, waitingForOperand]);

  // Toggle Sign (+/-)
  const toggleSign = () => {
    const value = parseFloat(displayValue);
    if (value !== 0) {
      setDisplayValue(String(-value));
    }
  };

  // Percentage
  const inputPercent = () => {
    const current = parseFloat(displayValue);
    if (prevValue !== null && operation) {
      // Calculate percent of previous value: (prev * current) / 100
      const percentVal = (prevValue * current) / 100;
      setDisplayValue(String(percentVal));
    } else {
      // Standalone percent: current / 100
      setDisplayValue(String(current / 100));
    }
  };

  // Perform calculation
  const calculate = (firstOperand: number, secondOperand: number, op: string): number | string => {
    switch (op) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
      case '*':
        return firstOperand * secondOperand;
      case '÷':
      case '/':
        if (secondOperand === 0) {
          return 'Erro (div/0)';
        }
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  // Set Operation (+, -, *, /)
  const performOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(displayValue);

    if (prevValue === null) {
      setPrevValue(inputValue);
      setExpression(`${inputValue} ${nextOperation}`);
    } else if (operation) {
      const currentValue = prevValue || 0;
      const result = calculate(currentValue, inputValue, operation);

      if (typeof result === 'string') {
        setDisplayValue(result);
        setPrevValue(null);
        setOperation(null);
        setWaitingForOperand(true);
        return;
      }

      setPrevValue(result);
      setDisplayValue(String(result));
      setExpression(`${result} ${nextOperation}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [displayValue, operation, prevValue]);

  // Handle Equals (=)
  const handleEquals = useCallback(() => {
    if (prevValue === null || operation === null) return;

    const inputValue = parseFloat(displayValue);
    const result = calculate(prevValue, inputValue, operation);
    const fullExpr = `${prevValue} ${operation} ${inputValue}`;

    if (typeof result === 'string') {
      setDisplayValue(result);
    } else {
      const formattedResult = String(result);
      setDisplayValue(formattedResult);
      setExpression(`${fullExpr} =`);

      // Add to history
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setHistory((prev) => [
        {
          id: `${Date.now()}`,
          expression: fullExpr,
          result: formattedResult,
          timestamp: timeStr,
        },
        ...prev.slice(0, 19), // Keep last 20
      ]);
    }

    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  }, [displayValue, operation, prevValue]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        inputDigit(key);
      } else if (key === '.') {
        event.preventDefault();
        inputDot();
      } else if (key === '+' || key === '-') {
        event.preventDefault();
        performOperation(key);
      } else if (key === '*') {
        event.preventDefault();
        performOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        performOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
      } else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
      } else if (key === 'Escape') {
        event.preventDefault();
        clearAll();
      } else if (key === '%') {
        event.preventDefault();
        inputPercent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDot, performOperation, handleEquals]);

  // Copy current display value
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
    }
  };

  // Bit/Byte conversion helper shortcuts
  const convertBytesToBits = () => {
    const val = parseFloat(displayValue);
    if (!isNaN(val)) {
      const res = val * 8;
      setDisplayValue(String(res));
      setExpression(`${val} B × 8 = ${res} bits`);
    }
  };

  const convertBitsToBytes = () => {
    const val = parseFloat(displayValue);
    if (!isNaN(val)) {
      const res = val / 8;
      setDisplayValue(String(res));
      setExpression(`${val} bits ÷ 8 = ${res} B`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      
      {/* Calculator Body (7 cols on md) */}
      <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
        
        {/* Top Utility Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-300">Calculadora Clássica</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1 transition-colors"
              title="Copiar valor do visor"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 transition-colors ${
                showHistory ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <History className="w-3 h-3" />
              <span>Histórico ({history.length})</span>
            </button>
          </div>
        </div>

        {/* LCD-style Display Screen */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-right font-mono flex flex-col justify-end min-h-[110px] shadow-inner relative overflow-hidden">
          {/* Active Expression Tracker */}
          <div className="text-xs text-slate-500 h-5 overflow-hidden text-ellipsis whitespace-nowrap font-medium">
            {expression || ' '}
          </div>

          {/* Current Display Digits */}
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight tabular-nums overflow-x-auto whitespace-nowrap mt-1">
            {displayValue}
          </div>
        </div>

        {/* Quick Network Shortcuts Strip */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs overflow-x-auto">
          <span className="text-[11px] text-slate-500 whitespace-nowrap pl-2 flex items-center gap-1">
            <ArrowRightLeft className="w-3 h-3 text-sky-400" />
            <span>Redes:</span>
          </span>
          <button
            onClick={convertBytesToBits}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded text-xs transition-colors whitespace-nowrap"
            title="Multiplica por 8 para transformar Bytes em bits"
          >
            Bytes ➔ bits (×8)
          </button>
          <button
            onClick={convertBitsToBytes}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded text-xs transition-colors whitespace-nowrap"
            title="Divide por 8 para transformar bits em Bytes"
          >
            bits ➔ Bytes (÷8)
          </button>
        </div>

        {/* Classic Button Grid (4x5) */}
        <div className="grid grid-cols-4 gap-2.5 font-sans">
          
          {/* Row 1 */}
          <button
            onClick={clearAll}
            className="h-14 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-rose-400 font-bold text-base transition-all active:scale-95 border border-slate-700/60"
          >
            AC
          </button>
          <button
            onClick={clearEntry}
            className="h-14 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-base transition-all active:scale-95 border border-slate-700/60"
          >
            C
          </button>
          <button
            onClick={backspace}
            className="h-14 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-base transition-all active:scale-95 border border-slate-700/60 flex items-center justify-center"
            title="Apagar último dígito"
          >
            <Delete className="w-5 h-5" />
          </button>
          <button
            onClick={() => performOperation('÷')}
            className={`h-14 rounded-xl font-bold text-lg transition-all active:scale-95 border ${
              operation === '÷'
                ? 'bg-sky-400 text-slate-950 border-sky-300'
                : 'bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border-sky-500/30'
            }`}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputDigit('7')}
            className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xl transition-all active:scale-95 border border-slate-800"
          >
            7
          </button>
          <button
            onClick={() => inputDigit('8')}
            className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xl transition-all active:scale-95 border border-slate-800"
          >
            8
          </button>
          <button
            onClick={() => inputDigit('9')}
            className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xl transition-all active:scale-95 border border-slate-800"
          >
            9
          </button>
          <button
            onClick={() => performOperation('×')}
            className={`h-14 rounded-xl font-bold text-lg transition-all active:scale-95 border ${
              operation === '×'
                ? 'bg-sky-400 text-slate-950 border-sky-300'
                : 'bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border-sky-500/30'
            }`}
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputDigit('4')}
            className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xl transition-all active:scale-95 border border-slate-800"
          >
            4
          </button>
          <button
            onClick={() => inputDigit('5')}
            className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xl transition-all active:scale-95 border border-slate-800"
          >
            5
          </button>
          <button
            onClick={() => inputDigit('6')}
            className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xl transition-all active:scale-95 border border-slate-800"
          >
            6
          </button>
          <button
            onClick={() => performOperation('-')}
            className={`h-14 rounded-xl font-bold text-xl transition-all active:scale-95 border ${
              operation === '-'
                ? 'bg-sky-400 text-slate-950 border-sky-300'
                : 'bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border-sky-500/30'
            }`}
          >
            −
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputDigit('1')}
            className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xl transition-all active:scale-95 border border-slate-800"
          >
            1
          </button>
          <button
            onClick={() => inputDigit('2')}
            className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xl transition-all active:scale-95 border border-slate-800"
          >
            2
          </button>
          <button
            onClick={() => inputDigit('3')}
            className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xl transition-all active:scale-95 border border-slate-800"
          >
            3
          </button>
          <button
            onClick={() => performOperation('+')}
            className={`h-14 rounded-xl font-bold text-xl transition-all active:scale-95 border ${
              operation === '+'
                ? 'bg-sky-400 text-slate-950 border-sky-300'
                : 'bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border-sky-500/30'
            }`}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={toggleSign}
            className="h-14 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-base transition-all active:scale-95 border border-slate-700/60"
            title="Inverter sinal (+/-)"
          >
            ±
          </button>
          <button
            onClick={() => inputDigit('0')}
            className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xl transition-all active:scale-95 border border-slate-800"
          >
            0
          </button>
          <button
            onClick={inputDot}
            className="h-14 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xl transition-all active:scale-95 border border-slate-800"
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="h-14 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-2xl transition-all active:scale-95 shadow-lg shadow-sky-500/20"
          >
            =
          </button>

        </div>

        <div className="text-[11px] text-slate-500 text-center font-mono pt-1">
          Atalhos de teclado: 0-9 · + − * / · Enter (=) · Esc (AC) · Backspace (⌫)
        </div>

      </div>

      {/* History and Quick Reference Side Column (5 cols on md) */}
      <div className="md:col-span-5 space-y-4">
        
        {/* History Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-sky-400" />
              <span>Histórico de Cálculos</span>
            </h3>
            {history.length > 0 && (
              <button
                onClick={() => setHistory([])}
                className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpar</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-xs text-slate-500 text-center py-8">
              Nenhum cálculo registrado ainda.<br />
              Faça contas na calculadora ao lado!
            </div>
          ) : (
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setDisplayValue(item.result);
                    setWaitingForOperand(true);
                  }}
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800/80 cursor-pointer transition-colors group text-right font-mono"
                  title="Clique para carregar este valor no visor"
                >
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{item.timestamp}</span>
                    <span className="text-slate-400">{item.expression}</span>
                  </div>
                  <div className="text-base font-bold text-emerald-400 group-hover:text-emerald-300 mt-0.5">
                    = {item.result}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tip for networking students */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 space-y-2">
          <span className="font-semibold text-slate-200 block">
            💡 Dica para Cálculos de Redes:
          </span>
          <p className="leading-relaxed">
            Na computação, conexões de rede são expressas em <strong>bits por segundo (bps, Mbps, Gbps)</strong>, enquanto o tamanho de arquivos é medido em <strong>Bytes (B, MB, GB)</strong>.
          </p>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-sky-300">
            1 Byte = 8 bits
          </div>
          <p className="text-[11px] text-slate-500">
            Use a aba <strong>Cálculos de Redes</strong> no topo para calcular sub-redes CIDR, tempo de download e conversões binárias completas.
          </p>
        </div>

      </div>

    </div>
  );
};
