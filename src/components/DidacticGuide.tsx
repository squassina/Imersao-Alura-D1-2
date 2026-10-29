import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, HelpCircle, Layers, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export const DidacticGuide: React.FC = () => {
  const [activeConcept, setActiveConcept] = useState<number>(0);

  const concepts = [
    {
      id: 'functions',
      icon: Cpu,
      title: '1. Funções (def, parâmetros e return)',
      subtitle: 'O bloco fundamental de reutilização e organização',
      content: (
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Uma função é como uma pequena fábrica particular: você entrega matéria-prima (os <strong>parâmetros</strong>), ela executa uma tarefa interna e devolve um produto pronto (através do <strong>return</strong>).
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
            <div className="text-slate-500"># 'def' avisa ao Python que estamos definindo uma função</div>
            <div><span className="text-purple-400">def</span> <span className="text-sky-400 font-bold">somar</span>(a, b):</div>
            <div className="pl-4 text-emerald-400 font-semibold"><span className="text-purple-400">return</span> a + b</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-semibold text-amber-300 block mb-1">Qual a diferença entre return e print?</span>
              <p className="text-xs text-slate-400 leading-normal">
                O <code className="text-slate-200">print()</code> apenas exibe o valor na tela e depois o joga fora. Já o <code className="text-slate-200">return</code> entrega o resultado de volta para o seu programa, permitindo guardar em uma variável ou fazer outras contas com ele.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-semibold text-emerald-300 block mb-1">Por que criar 4 funções separadas?</span>
              <p className="text-xs text-slate-400 leading-normal">
                Esse é o <strong>Princípio da Responsabilidade Única</strong>: cada função faz apenas uma coisa e faz bem. Se amanhã você quiser mudar a fórmula da divisão, você mexe em apenas 4 linhas de código sem quebrar o resto.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'conditionals',
      icon: Layers,
      title: '2. Estrutura Condicional (if / elif / else)',
      subtitle: 'Tomada de decisão lógica baseada na escolha do usuário',
      content: (
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Computadores tomam decisões testando condições: se algo for verdadeiro (<code className="text-sky-400 font-mono">True</code>), executa um bloco; se for falso (<code className="text-sky-400 font-mono">False</code>), passa para o próximo teste.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div><span className="text-purple-400 font-bold">if</span> opcao == <span className="text-emerald-300">'1'</span>:</div>
            <div className="pl-4 text-slate-400">resultado = somar(num1, num2)</div>
            <div><span className="text-purple-400 font-bold">elif</span> opcao == <span className="text-emerald-300">'2'</span>:</div>
            <div className="pl-4 text-slate-400">resultado = subtrair(num1, num2)</div>
            <div><span className="text-purple-400 font-bold">elif</span> opcao == <span className="text-emerald-300">'3'</span>:</div>
            <div className="pl-4 text-slate-400">resultado = multiplicar(num1, num2)</div>
            <div><span className="text-purple-400 font-bold">elif</span> opcao == <span className="text-emerald-300">'4'</span>:</div>
            <div className="pl-4 text-slate-400">resultado = dividir(num1, num2)</div>
          </div>

          <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-800/40 text-xs text-sky-200">
            <strong>Dica de ouro:</strong> Por que usamos <code className="text-white">elif</code> em vez de vários <code className="text-white">if</code> soltos? Porque no momento em que o Python encontra um <code className="text-white">elif</code> que é verdadeiro, ele executa aquele bloco e imediatamente <em>ignora</em> todos os outros abaixo, economizando tempo e evitando comportamentos inesperados.
          </div>
        </div>
      ),
    },
    {
      id: 'loop',
      icon: ArrowRight,
      title: '3. Laço Contínuo (while True, break e continue)',
      subtitle: 'Como manter um aplicativo interativo vivo no terminal',
      content: (
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Sem um laço de repetição, seu programa executa a linha 1 até o final e fecha a janela do terminal no mesmo segundo. O comando <code className="text-purple-400 font-mono">while True:</code> cria um ciclo infinito até receber uma ordem explícita de parada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-mono text-amber-300 font-bold flex items-center gap-1.5 text-xs">
                <span>O comando break</span>
              </span>
              <p className="text-xs text-slate-400">
                Significa "quebre o laço agora e saia dele". Usamos quando o usuário digita <code className="text-slate-200">opcao == '5'</code>:
              </p>
              <pre className="font-mono text-xs text-slate-300 bg-slate-900 p-2 rounded">
if opcao == '5':
    print("Até logo!")
    break  # encerra o while
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-mono text-sky-300 font-bold flex items-center gap-1.5 text-xs">
                <span>O comando continue</span>
              </span>
              <p className="text-xs text-slate-400">
                Significa "ignore as linhas abaixo deste ponto e recomece o laço lá do topo". Usamos quando o usuário erra a opção ou digita letras:
              </p>
              <pre className="font-mono text-xs text-slate-300 bg-slate-900 p-2 rounded">
if opcao not in ['1','2','3','4']:
    print("Opção inválida!")
    continue  # volta ao menu
              </pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'errors',
      icon: ShieldCheck,
      title: '4. Tratamento de Erros e Exceções (try / except)',
      subtitle: 'A blindagem do código contra travamentos reais',
      content: (
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Usuários reais cometem erros: eles digitam letras onde esperava-se números ou tentam dividir por zero. Na programação, erros não previstos são chamados de <strong>Exceções</strong> e causam o término abrupto do script.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-purple-400 font-bold">try:</div>
            <div className="pl-4 text-slate-300">num1 = float(input("Digite o primeiro número: "))</div>
            <div className="pl-4 text-slate-300">num2 = float(input("Digite o segundo número: "))</div>
            <div className="text-rose-400 font-bold">except ValueError:</div>
            <div className="pl-4 text-slate-400">print("[!] Erro: Digite apenas valores numéricos.")</div>
            <div className="pl-4 text-slate-400">continue</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2 text-slate-300">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>E a divisão por zero?</span>
            </span>
            <p className="text-slate-400">
              Na função <code className="text-slate-200">dividir(a, b)</code>, fazemos uma verificação prévia simples com <code className="text-slate-200">if b == 0:</code>. Isso impede que o Python lance o temido <code className="text-rose-400">ZeroDivisionError</code> e em vez disso retorna uma mensagem educada explicando o ocorrido.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'entrypoint',
      icon: CheckCircle2,
      title: '5. O que significa if __name__ == "__main__"?',
      subtitle: 'O padrão dos desenvolvedores profissionais de Python',
      content: (
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Quando você executa um arquivo Python digitando <code className="text-sky-300 font-mono">python calculadora.py</code>, o Python internamente define uma variável especial chamada <code className="text-amber-300 font-mono">__name__</code> com o valor <code className="text-emerald-300 font-mono">"__main__"</code>.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <div><span className="text-purple-400 font-bold">if</span> __name__ == <span className="text-emerald-300">"__main__"</span>:</div>
            <div className="pl-4 text-sky-400 font-bold">main()</div>
          </div>

          <p className="text-slate-400 text-xs leading-normal">
            Isso permite que você importe as funções da calculadora (como <code className="text-slate-200">somar</code> ou <code className="text-slate-200">dividir</code>) em outro script Python sem que o menu da calculadora abra automaticamente!
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Concept Selector Column (Col 1-4) */}
      <div className="lg:col-span-4 flex flex-col gap-2">
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl mb-1">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Índice de Conceitos
          </span>
          <span className="text-xs text-slate-400">
            Clique para ler a explicação detalhada
          </span>
        </div>

        {concepts.map((concept, index) => {
          const Icon = concept.icon;
          const isActive = activeConcept === index;
          return (
            <button
              key={concept.id}
              onClick={() => setActiveConcept(index)}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                isActive
                  ? 'bg-sky-500/10 border-sky-500/40 shadow-sm'
                  : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 text-slate-400'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  isActive ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-semibold block truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {concept.title}
                </span>
                <span className="text-xs text-slate-500 block truncate mt-0.5">
                  {concept.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Concept Detail View (Col 5-12) */}
      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-6">
          <div className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
            {React.createElement(concepts[activeConcept].icon, { className: 'w-5 h-5' })}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {concepts[activeConcept].title}
            </h2>
            <p className="text-xs text-slate-400">
              {concepts[activeConcept].subtitle}
            </p>
          </div>
        </div>

        {/* Dynamic Concept Body */}
        {concepts[activeConcept].content}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-800">
          <button
            onClick={() => setActiveConcept((prev) => Math.max(0, prev - 1))}
            disabled={activeConcept === 0}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
          >
            ← Conceito Anterior
          </button>
          <span className="text-xs font-mono text-slate-500">
            {activeConcept + 1} de {concepts.length}
          </span>
          <button
            onClick={() => setActiveConcept((prev) => Math.min(concepts.length - 1, prev + 1))}
            disabled={activeConcept === concepts.length - 1}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 disabled:opacity-30 disabled:hover:bg-sky-400 transition-colors"
          >
            Próximo Conceito →
          </button>
        </div>
      </div>

    </div>
  );
};
