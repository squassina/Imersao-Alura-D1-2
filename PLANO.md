# Laboratório Interativo: Calculadora Básica em Python

Plataforma didática e simulador interativo projetado para quem está começando a programar em Python, unindo uma implementação limpa da calculadora com as quatro operações básicas, um terminal simulador interativo em tempo real e explicações passo a passo sobre funções, condicionais, repetições e tratamento de erros.

---

### Decisões Críticas e Requisitos do Projeto

- **Formato:** Aplicativo interativo com simulador de Python no navegador e explicações didáticas integradas.
- **Fluxo de Execução:** Laço de repetição contínuo (`while True`), permitindo múltiplos cálculos seguidos até o usuário escolher explicitamente encerrar o programa (opção 5).
- **Tratamento de Exceções:** Inclusão de proteção contra divisão por zero e captura de entradas inválidas (não numéricas) via `try/except ValueError`.

---

### 1. Visão Geral e Conceito Central

- **O que faz:** Entrega uma aplicação web completa contendo o código Python limpo e comentado para download/cópia, acompanhado de um console virtual interativo onde o usuário testa o código exatamente como no terminal do computador, com visualizador de fluxo de variáveis e guia conceitual detalhado para iniciantes.
- **Público-alvo:** Pessoas dando os primeiros passos no aprendizado de programação e estudantes de Python iniciante.
- **Valor central:** Elimina a barreira de instalação local de ambientes Python para quem está aprendendo agora, permitindo testar, entender a lógica de cada linha e exportar um script profissional e organizado para rodar em seu próprio computador.

---

### 2. Experiência do Usuário e Design Visual

#### Fluxo Principal do Usuário
1. **Painel do Código Python:** O aluno visualiza o script completo com sintaxe colorida, tipografia mono legível (`JetBrains Mono`) e comentários explicativos.
2. **Terminal Interativo:** O aluno pode clicar em "Executar" para iniciar a simulação do script, inserindo valores no prompt interativo (`Digite o primeiro número:`, `Escolha a operação:`) e recebendo saídas imediatas.
3. **Explorador Conceitual em Abas:**
   - **Anatomia do Código:** Explicações interativas sobre o que são funções (`def`), parâmetros, `return`, laço `while`, blocos condicionais (`if/elif/else`) e tratamento de exceções (`try/except`).
   - **Inspetor de Execução (Rastreio de Estado):** Exibe visualmente o fluxo dos dados (valores das variáveis em memória, chamada de função ativa e resultado calculado).
   - **Guia do Iniciante:** Instruções diretas de como salvar e executar o script no próprio computador usando VS Code, Terminal ou IDLE.
4. **Ações Práticas:** Botões de cópia rápida com feedback tátil, download direto do arquivo `.py` e desafios guiados para praticar (ex.: adicionar operação de exponenciação).

#### Identidade Visual & Tema
- **Direção Estética:** Interface limpa no estilo *Developer Sandbox / Educational Studio*, com acabamento refinado, sem poluição visual.
- **Paleta de Cores (Tailwind CSS):**
  - Fundo principal: Canvas neutro contemporâneo (`bg-slate-950` / `bg-slate-900` para o terminal e código, com alto contraste e legibilidade).
  - Superfícies estruturais: Bordas sutis (`border-slate-800`), cartões escuros com realce discreto.
  - Acentos funcionais (10%): Azul Python (`#38BDF8` / `#0284C7`) para chamadas e funções, Esmeralda (`#10B981`) para saídas bem-sucedidas e Âmbar/Coral (`#F87171`) para alertas de erro amigáveis.
- **Tipografia:** `Plus Jakarta Sans` para títulos e textos explicativos; `JetBrains Mono` / `tabular-nums` para o código e terminal virtual.

---

### 3. Decisões de Produto e Trade-Offs

- **Simulador Interativo de Python em Tempo Real no Navegador:**
  - *Abordagem Escolhida:* Mecanismo de simulação em TypeScript com controle de estado de I/O em etapas de terminal, espelhando fielmente o comportamento das chamadas `input()` e `print()` do Python.
  - *Por que:* Permite execução instantânea, sem atrasos de rede ou dependências pesadas de compilação em servidor, com feedback responsivo e garantia de funcionamento no ambiente de sandbox.
- **Estruturação Modular das Funções:**
  - *Abordagem Escolhida:* Quatro funções atômicas dedicadas (`somar`, `subtrair`, `multiplicar`, `dividir`) retornando valores puros via `return`, desacopladas da função de exibição de menu.
  - *Por que:* Ensina boas práticas fundamentais de engenharia de software (princípio da responsabilidade única e reutilização de código).
- **Tratamento Didático de Divisão por Zero:**
  - *Abordagem Escolhida:* Validação explícita dentro da função `dividir` com retorno de mensagem amigável ou geração de erro tratado, além de `try/except ValueError` para conversão de números flutuantes.
  - *Por que:* Demonstra o raciocínio preventivo de um programador real de forma clara e compreensível.

---

### 4. Arquitetura Técnica e Código Base

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Bar & Global Actions                        │
│   Calculadora Python 3 · Guia Interativo [Copiar Código] [Baixar .py]   │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│       Visualizador de Código        │ │     Console / Terminal Python       │
│  - Destaque de sintaxe              │ │  - Prompt de entrada interativo     │
│  - Linhas clicáveis com tooltips    │ │  - Menu do loop interativo          │
│  - Marcadores de componentes chave  │ │  - Logs de execução formatados      │
│  - Explicações conceituais          │ │  - Inspetor de variáveis ao vivo    │
└─────────────────────────────────────┘ └─────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Módulos Didáticos & Prática                       │
│  [1. Funções]  [2. Condicionais]  [3. Laços de Repetição]  [4. Erros] │
│  Exemplos práticos, analogias didáticas e desafios para o aluno        │
└────────────────────────────────────────────────────────────────────────┘
```
