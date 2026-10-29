export const PYTHON_SCRIPT_CODE = `# ==============================================================================
# CALCULADORA BÁSICA EM PYTHON
# Ideal para quem está começando a aprender programação!
# ==============================================================================

# ------------------------------------------------------------------------------
# PARTE 1: DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS
# Uma função é um bloco de código reutilizável que recebe valores e retorna algo.
# ------------------------------------------------------------------------------

def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a subtração do primeiro número pelo segundo."""
    return a - b

def multiplicar(a, b):
    """Retorna a multiplicação entre dois números."""
    return a * b

def dividir(a, b):
    """
    Retorna a divisão entre dois números.
    Prevenção de erro: Não existe divisão matemática por zero!
    """
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

def porcentagem(a, b):
    """
    Retorna a porcentagem 'b%' aplicada sobre o valor 'a'.
    Exemplo: 15% de 200 = (200 * 15) / 100 = 30.0
    """
    return (a * b) / 100

# ------------------------------------------------------------------------------
# PARTE 2: FUNÇÃO PARA EXIBIR O MENU
# Deixar o menu em uma função separada mantém o código organizado.
# ------------------------------------------------------------------------------

def exibir_menu():
    """Imprime na tela as opções disponíveis para o usuário."""
    print("\\n" + "=" * 32)
    print("      CALCULADORA EM PYTHON")
    print("=" * 32)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Porcentagem (%)")
    print("6. Sair do programa")
    print("=" * 32)

# ------------------------------------------------------------------------------
# PARTE 3: FLUXO PRINCIPAL DO PROGRAMA
# Aqui utilizamos um laço de repetição (while), estruturas condicionais (if/elif/else)
# e tratamento de erros com try/except.
# ------------------------------------------------------------------------------

def main():
    print("Bem-vindo(a) à sua primeira calculadora em Python!")
    
    # O laço 'while True' mantém o programa rodando continuamente
    # até que o usuário escolha a opção de sair (opção 6).
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1-6): ").strip()

        # 1. Verificamos se o usuário quer encerrar o programa
        if opcao == '6':
            print("\\nObrigado por usar a calculadora. Bons estudos na programação! 👋")
            break  # O comando 'break' interrompe o laço while

        # 2. Verificamos se a opção digitada é válida (1 a 5)
        if opcao not in ['1', '2', '3', '4', '5']:
            print("\\n[!] Opção inválida! Digite um número de 1 a 6.")
            continue  # O comando 'continue' volta para o início do laço while

        # 3. Tratamento de exceção para a entrada dos números
        # O bloco try/except evita que o programa trave se alguém digitar letras.
        try:
            num1 = float(input("\\nDigite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("\\n[!] Erro: Você deve digitar apenas números válidos (ex: 10 ou 4.5).")
            continue

        # 4. Estrutura condicional para executar a operação escolhida
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
        elif opcao == '5':
            resultado = porcentagem(num1, num2)
            simbolo = "%"

        # 5. Exibição formatada do resultado
        if isinstance(resultado, str):
            # Se for uma mensagem de erro (texto), exibimos direto
            print(f"\\n--> {resultado}")
        elif opcao == '5':
            # Exibição personalizada para porcentagem
            print(f"\\n--> Resultado: {num2}% de {num1} = {resultado}")
        else:
            # Formatamos a saída com f-strings para ficar elegante e legível
            print(f"\\n--> Resultado: {num1} {simbolo} {num2} = {resultado}")

# Esta linha garante que o programa só execute quando este arquivo for aberto diretamente
if __name__ == "__main__":
    main()
`;

export interface CodeSection {
  id: string;
  title: string;
  category: 'functions' | 'menu' | 'loop' | 'conditionals' | 'try_except' | 'entrypoint';
  lines: [number, number]; // 1-based start and end line
  summary: string;
  explanation: string;
  codeSnippet: string;
  whyItMatters: string;
}

export const CODE_SECTIONS: CodeSection[] = [
  {
    id: 'functions-ops',
    title: 'Funções Matemáticas (def)',
    category: 'functions',
    lines: [10, 27],
    summary: 'Blocos nomeados com def somar(a, b), subtrair, multiplicar e dividir.',
    explanation: 'A palavra-chave `def` cria uma função. Ela recebe dois parâmetros `(a, b)` e devolve a resposta através de `return`. O `return` entrega o valor calculado para quem chamou a função, permitindo reutilizá-la em qualquer lugar do sistema.',
    codeSnippet: `def somar(a, b):
    return a + b`,
    whyItMatters: 'Sem funções, você teria que reescrever a mesma conta várias vezes. Funções tornam o código limpo, testável e fácil de consertar.'
  },
  {
    id: 'div-zero',
    title: 'Prevenção de Divisão por Zero',
    category: 'conditionals',
    lines: [24, 31],
    summary: 'Validação preventiva com if b == 0 antes de realizar a divisão.',
    explanation: 'Em matemática e na computação, dividir qualquer número por 0 resulta em uma indeterminação. No Python, isso geraria um erro fatal chamado `ZeroDivisionError`. Ao checar `if b == 0:`, protegemos o programa com uma mensagem amigável.',
    codeSnippet: `def dividir(a, b):
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b`,
    whyItMatters: 'Bons programadores sempre preveem casos extremos para que o aplicativo nunca feche sozinho na cara do usuário.'
  },
  {
    id: 'percentage-op',
    title: 'Operação de Porcentagem',
    category: 'functions',
    lines: [33, 39],
    summary: 'Função porcentagem(a, b) calculando (a * b) / 100 de forma pura.',
    explanation: 'Calcula b% de a. Por exemplo, para calcular 15% de 200, passamos a = 200 e b = 15, retornando (200 * 15) / 100 = 30.0.',
    codeSnippet: `def porcentagem(a, b):
    return (a * b) / 100`,
    whyItMatters: 'Demonstra como criar novas funções matemáticas e integrá-las de forma limpa ao menu e ao fluxo condicional.'
  },
  {
    id: 'menu-function',
    title: 'Função de Exibição do Menu',
    category: 'menu',
    lines: [33, 43],
    summary: 'Centraliza a apresentação visual do menu usando formatação simples.',
    explanation: 'Usamos `print("=" * 32)` para multiplicar a string "=" 32 vezes de forma automática. Deixar o menu em uma função separada limpa o fluxo principal `main()`.',
    codeSnippet: `def exibir_menu():
    print("=" * 32)
    print("      CALCULADORA EM PYTHON")
    ...`,
    whyItMatters: 'Separar o que é visualização gráfica do que é cálculo matemático é o primeiro passo para arquiteturas de software profissionais.'
  },
  {
    id: 'while-loop',
    title: 'Laço Contínuo (while True & break)',
    category: 'loop',
    lines: [56, 64],
    summary: 'Mantém o programa em execução permitindo realizar vários cálculos seguidos.',
    explanation: '`while True:` cria uma repetição sem fim pré-determinado. Quando o usuário digita "5", o comando `break` "quebra" o laço e finaliza o programa de forma graciosa. O comando `continue` pula o resto do código e volta para o início do laço.',
    codeSnippet: `while True:
    exibir_menu()
    opcao = input("Escolha uma opção: ")
    if opcao == '5':
        break`,
    whyItMatters: 'Sem o laço, a calculadora realizaria apenas uma única conta e fecharia imediatamente, obrigando o usuário a abrir o programa de novo.'
  },
  {
    id: 'try-except',
    title: 'Tratamento de Exceções (try / except)',
    category: 'try_except',
    lines: [72, 78],
    summary: 'Captura erros de digitação (letras em vez de números) com ValueError.',
    explanation: 'A função `float()` tenta converter o texto digitado pelo usuário em número decimal. Se o usuário digitar "dez" ou "abc", o Python levantaria um `ValueError`. Com `try...except ValueError:`, capturamos a falha e avisamos com educação.',
    codeSnippet: `try:
    num1 = float(input("Digite o primeiro número: "))
    num2 = float(input("Digite o segundo número: "))
except ValueError:
    print("[!] Erro: Digite apenas números válidos.")
    continue`,
    whyItMatters: 'O bloco try/except é a armadura do seu código contra entradas inesperadas.'
  },
  {
    id: 'conditionals-flow',
    title: 'Estruturas Condicionais (if / elif / else)',
    category: 'conditionals',
    lines: [80, 94],
    summary: 'Encaminha os números para a função correta dependendo da opção escolhida.',
    explanation: 'O `if` testa a primeira condição. Se for falsa, os `elif` (else if) são testados em ordem sequencial. Assim que um é verdadeiro, o bloco correspondente é executado e o restante é ignorado.',
    codeSnippet: `if opcao == '1':
    resultado = somar(num1, num2)
    simbolo = "+"
elif opcao == '2':
    resultado = subtrair(num1, num2)
    simbolo = "-"`,
    whyItMatters: 'As condicionais representam as decisões lógicas do algoritmo.'
  },
  {
    id: 'entrypoint',
    title: 'Ponto de Entrada (__name__ == "__main__")',
    category: 'entrypoint',
    lines: [103, 105],
    summary: 'Convenção do Python para indicar onde a execução deve começar.',
    explanation: 'Essa verificação checa se o arquivo está sendo executado diretamente pelo terminal (onde a variável interna `__name__` recebe o valor `"__main__"`). Se o arquivo for importado como módulo em outro projeto, ele não executará o `main()` acidentalmente.',
    codeSnippet: `if __name__ == "__main__":
    main()`,
    whyItMatters: 'É o padrão da indústria em Python para organizar scripts executáveis e bibliotecas.'
  }
];

export interface Challenge {
  id: string;
  title: string;
  level: 'Fácil' | 'Médio' | 'Desafio';
  description: string;
  tip: string;
  solutionCode: string;
  explanation: string;
}

export const BEGINNER_CHALLENGES: Challenge[] = [
  {
    id: 'power',
    title: '1. Adicionar Operação de Potência (a ** b)',
    level: 'Fácil',
    description: 'Adicione uma nova opção no menu para calcular exponenciação (número "a" elevado à potência "b"). Por exemplo: 2 elevado a 3 deve resultar em 8.',
    tip: 'No Python, o operador de exponenciação é o asterisco duplo: `**`. Crie uma função `def potencia(a, b): return a ** b` e adicione a opção no menu.',
    solutionCode: `# 1. Crie a função:
def potencia(a, b):
    return a ** b

# 2. No menu, adicione:
# print("5. Potência (^)")
# print("6. Sair do programa")

# 3. No if/elif:
# elif opcao == '5':
#     resultado = potencia(num1, num2)
#     simbolo = "^"`,
    explanation: 'A potenciação em Python é nativa com `**` (ex: `2 ** 3 = 8`), diferente de outras linguagens que exigem bibliotecas como Math.pow().'
  },
  {
    id: 'modulo',
    title: '2. Resto da Divisão (Módulo %)',
    level: 'Fácil',
    description: 'Crie uma operação para descobrir o resto da divisão inteira entre dois números. Por exemplo, o resto de 10 dividido por 3 é 1.',
    tip: 'Utilize o operador `%` (módulo). Lembre-se também de verificar se o segundo número não é zero!',
    solutionCode: `def resto_divisao(a, b):
    if b == 0:
        return "Erro: Não é possível calcular resto com divisor zero!"
    return a % b`,
    explanation: 'O operador de resto `%` é muito usado na programação para testar se um número é par ou ímpar (se `numero % 2 == 0`, é par!).'
  },
  {
    id: 'average',
    title: '3. Média Aritmética de Dois Números',
    level: 'Médio',
    description: 'Implemente uma função para calcular a média aritmética simples entre dois valores: (a + b) / 2.',
    tip: 'Lembre-se da ordem de precedência matemática: use parênteses `(a + b)` antes de dividir por 2.',
    solutionCode: `def media(a, b):
    return (a + b) / 2`,
    explanation: 'Sem os parênteses, `a + b / 2` dividiria primeiro apenas o valor de `b` por 2 devido à regra matemática da ordem das operações.'
  },
  {
    id: 'history',
    title: '4. Histórico dos Últimos Cálculos',
    level: 'Desafio',
    description: 'Como iniciante, desafie-se a guardar as contas feitas em uma lista `[]` para que o usuário possa consultar o histórico quando quiser.',
    tip: 'Crie uma lista vazia `historico = []` antes do `while True` e adicione cada resultado com `historico.append(...)`.',
    solutionCode: `historico = []

# Após calcular com sucesso:
linha = f"{num1} {simbolo} {num2} = {resultado}"
historico.append(linha)

# Se criar uma opção '6. Ver Histórico':
for item in historico:
    print(f"- {item}")`,
    explanation: 'Listas em Python são estruturas dinâmicas que permitem armazenar coleções de dados em memória.'
  }
];
