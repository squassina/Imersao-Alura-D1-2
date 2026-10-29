# ==============================================================================
# CALCULADORA BÁSICA EM PYTHON
# Feito para iniciantes na programação com Python 3
# ==============================================================================

# ------------------------------------------------------------------------------
# PARTE 1: DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS
# Uma função é criada com a palavra reservada 'def'. Ela recebe parâmetros
# e devolve uma resposta com o comando 'return'.
# ------------------------------------------------------------------------------

def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a subtração do primeiro número pelo segundo."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto de dois números."""
    return a * b

def dividir(a, b):
    """
    Retorna a divisão entre dois números.
    Prevenção de erro: Não existe divisão matemática por zero!
    """
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

# ------------------------------------------------------------------------------
# PARTE 2: EXIBIÇÃO DO MENU DE OPÇÕES
# Separar a exibição do menu em uma função própria mantém o código limpo.
# ------------------------------------------------------------------------------

def exibir_menu():
    """Apresenta as opções disponíveis no terminal."""
    print("\n" + "=" * 32)
    print("      CALCULADORA EM PYTHON")
    print("=" * 32)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Sair do programa")
    print("=" * 32)

# ------------------------------------------------------------------------------
# PARTE 3: FLUXO PRINCIPAL DO PROGRAMA
# Controla o laço contínuo (while True), entrada de dados e condicionais.
# ------------------------------------------------------------------------------

def main():
    print("Bem-vindo(a) à sua Calculadora em Python!")
    
    # O laço 'while True' permite fazer contas sucessivas
    # até que o usuário decida sair escolhendo a opção 5.
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1-5): ").strip()

        # 1. Condicional para encerrar o programa
        if opcao == '5':
            print("\nObrigado por utilizar a calculadora. Bons estudos na programação! 👋")
            break  # Interrompe o laço de repetição imediatamente

        # 2. Validação da opção informada
        if opcao not in ['1', '2', '3', '4']:
            print("\n[!] Opção inválida. Por favor, digite um número de 1 a 5.")
            continue  # Retorna ao início do laço while

        # 3. Tratamento de exceção para prevenir erros de digitação (letras em vez de números)
        try:
            num1 = float(input("\nDigite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("\n[!] Entrada inválida: Digite apenas valores numéricos (ex: 10 ou 3.14).")
            continue

        # 4. Estrutura condicional (if / elif / else) para direcionar a operação
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

        # 5. Apresentação do resultado na tela
        if isinstance(resultado, str):
            # Caso a função dividir tenha retornado uma mensagem de erro em texto
            print(f"\n--> {resultado}")
        else:
            # Exibição com f-string formatada
            print(f"\n--> Resultado: {num1} {simbolo} {num2} = {resultado}")

# Ponto de entrada padrão em scripts Python
if __name__ == "__main__":
    main()
