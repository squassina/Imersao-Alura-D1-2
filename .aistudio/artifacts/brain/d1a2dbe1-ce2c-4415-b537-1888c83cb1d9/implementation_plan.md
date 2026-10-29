# Laboratório Interativo: Calculadora Básica em Python

Plataforma didática e simulador interativo projetado para quem está começando a programar em Python, unindo uma implementação limpa da calculadora com as quatro operações básicas, um terminal simulador interativo em tempo real e explicações passo a passo sobre funções, condicionais, repetições e tratamento de erros.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisões confirmadas com o usuário na fase de planejamento:**
> - **Formato:** Aplicativo interativo com simulador de Python no navegador e explicações didáticas integradas.
> - **Fluxo de Execução:** Laço de repetição contínuo (`while True`), permitindo múltiplos cálculos seguidos até o usuário escolher explicitamente encerrar o programa.
> - **Tratamento de Exceções:** Inclusão de proteção contra divisão por zero e captura de entradas inválidas (não numéricas) via `try/except`.

---

### 1. Overview & Core Concept

- **O que faz:** Entrega uma aplicação web completa contendo o código Python limpo e comentado para download/cópia, acompanhado de um console virtual interativo onde o usuário testa o código exatamente como no terminal do computador, com visualizador de fluxo de variáveis e guia conceitual detalhado para iniciantes.
- **Público-alvo:** Pessoas dando os primeiros passos no aprendizado de programação e estudantes de Python iniciante.
- **Valor central:** Elimina a barreira de instalação local de ambientes Python para quem está aprendendo agora, permitindo testar, entender a lógica de cada linha e exportar um script profissional e organizado para rodar em seu próprio computador.

---

### 2. User Experience & Visual Design

#### Fluxo Principal do Usuário
1. **Painel do Código Python:** O aluno visualiza o script completo com sintaxe colorida, tipografia mono legível (`JetBrains Mono` / `IBM Plex Mono`) e comentários explicativos.
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

### 3. Key Product Decisions & Trade-Offs

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

### 4. Technical Architecture & Data Strategy

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

#### Código Python Base a ser Apresentado e Simulado
```python
# ==========================================
# Calculadora Simples em Python para Iniciantes
# ==========================================

# 1. Definição das funções para cada operação matemática
def somar(a, b):
    \"\"\"Retorna a soma de dois números.\"\"\"
    return a + b

def subtrair(a, b):
    \"\"\"Retorna a subtração entre dois números.\"\"\"
    return a - b

def multiplicar(a, b):
    \"\"\"Retorna o produto de dois números.\"\"\"
    return a * b

def dividir(a, b):
    \"\"\"Retorna a divisão entre dois números, prevenindo divisão por zero.\"\"\"
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

def exibir_menu():
    \"\"\"Apresenta o menu de opções disponíveis.\"\"\"
    print("\\n" + "=" * 30)
    print("      CALCULADORA EM PYTHON")
    print("=" * 30)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Sair do programa")
    print("=" * 30)

# 2. Fluxo Principal com laço contínuo e tratamento de erros
def main():
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1-5): ").strip()

        # Condicional para verificar se o usuário deseja encerrar
        if opcao == '5':
            print("\\nObrigado por utilizar a calculadora. Até logo!")
            break

        # Validação da opção informada
        if opcao not in ['1', '2', '3', '4']:
            print("\\n[!] Opção inválida. Por favor, digite um número de 1 a 5.")
            continue

        # Entrada de valores com tratamento de dados inválidos
        try:
            num1 = float(input("Digite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("\\n[!] Entrada inválida: Digite apenas números válidos.")
            continue

        # Estrutura condicional para executar a operação escolhida
        if opcao == '1':
            resultado = somar(num1, num2)
            simbolo = "+"
        elif opcao == '2':
            resultado = subtrair(num1, num2)
            simbolo = "-"
        elif opcao == '3':
            resultado = multiplicar(num1, num2)
            simbolo = "*"
        elif opcao == '4':
            resultado = dividir(num1, num2)
            simbolo = "/"

        # Exibição do resultado final
        if isinstance(resultado, str):
            print(f"\\nResultado: {resultado}")
        else:
            print(f"\\nResultado: {num1} {simbolo} {num2} = {resultado}")

if __name__ == "__main__":
    main()
```
