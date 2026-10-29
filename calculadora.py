# ==============================================================================
# CALCULADORA BÁSICA & REDES EM PYTHON
# Feito para iniciantes na programação com Python 3
# ==============================================================================

import redes

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

def porcentagem(a, b):
    """
    Retorna a porcentagem 'b%' aplicada sobre o valor 'a'.
    Exemplo: 15% de 200 = (200 * 15) / 100 = 30.0
    """
    return (a * b) / 100

# ------------------------------------------------------------------------------
# PARTE 2: EXIBIÇÃO DO MENU DE OPÇÕES
# Separar a exibição do menu em uma função própria mantém o código limpo.
# ------------------------------------------------------------------------------

def exibir_menu():
    """Apresenta as opções disponíveis no terminal."""
    print("\n" + "=" * 36)
    print("      CALCULADORA EM PYTHON")
    print("=" * 36)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Porcentagem (%)")
    print("6. Cálculos de Redes de Computadores")
    print("7. Sair do programa")
    print("=" * 36)

def executar_calculos_redes():
    """Submenu interativo para cálculos de redes de computadores."""
    print("\n" + "-" * 36)
    print("    CÁLCULOS DE REDES DE COMPUTADORES")
    print("-" * 36)
    print("1. Sub-rede IPv4 & CIDR")
    print("2. Tempo Estimado de Download")
    print("3. Converter IP Decimal para Binário")
    print("4. Voltar ao menu principal")
    print("-" * 36)
    
    sub_op = input("Escolha uma opção de redes (1-4): ").strip()
    
    if sub_op == '1':
        ip = input("Digite o IP base (ex: 192.168.1.100): ").strip()
        try:
            cidr = int(input("Digite o prefixo CIDR (ex: 24 para /24): ").replace('/', '').strip())
            info = redes.calcular_subrede(ip, cidr)
            if "erro" in info:
                print(f"\n[!] {info['erro']}")
            else:
                print("\n--> RESULTADO DA SUB-REDE:")
                print(f"    Rede (ID):          {info['endereco_rede']}{info['cidr']}")
                print(f"    Máscara Decimal:    {info['mascara_decimal']}")
                print(f"    Máscara Binária:    {info['mascara_binaria']}")
                print(f"    Primeiro Host:      {info['primeiro_host']}")
                print(f"    Último Host:        {info['ultimo_host']}")
                print(f"    Broadcast:          {info['endereco_broadcast']}")
                print(f"    Total de IPs:       {info['total_ips']}")
                print(f"    Hosts Úteis:        {info['hosts_uteis']}")
        except ValueError:
            print("\n[!] Erro: O prefixo CIDR deve ser um número inteiro (ex: 24).")

    elif sub_op == '2':
        try:
            tamanho = float(input("Digite o tamanho do arquivo em Megabytes (MB): "))
            velocidade = float(input("Digite a velocidade do link em Megabits/s (Mbps): "))
            res = redes.tempo_download(tamanho, velocidade)
            if "erro" in res:
                print(f"\n[!] {res['erro']}")
            else:
                print("\n--> RESULTADO DO DOWNLOAD:")
                print(f"    Tempo estimado: {res['tempo_formatado']} ({res['segundos_totais']} segundos)")
                print(f"    Taxa real em disco: ~{res['taxa_real_mb_s']} MB/s")
        except ValueError:
            print("\n[!] Erro: Digite valores numéricos válidos.")

    elif sub_op == '3':
        ip = input("Digite o IP para converter (ex: 172.16.254.1): ").strip()
        binario = redes.ip_para_binario(ip)
        print(f"\n--> {ip} em Binário: {binario}")

# ------------------------------------------------------------------------------
# PARTE 3: FLUXO PRINCIPAL DO PROGRAMA
# Controla o laço contínuo (while True), entrada de dados e condicionais.
# ------------------------------------------------------------------------------

def main():
    print("Bem-vindo(a) à sua Calculadora em Python!")
    
    # O laço 'while True' permite fazer contas sucessivas
    # até que o usuário decida sair escolhendo a opção 7.
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1-7): ").strip()

        # 1. Condicional para encerrar o programa
        if opcao == '7':
            print("\nObrigado por utilizar a calculadora. Bons estudos na programação! 👋")
            break  # Interrompe o laço de repetição imediatamente

        # 2. Validação da opção informada
        if opcao not in ['1', '2', '3', '4', '5', '6']:
            print("\n[!] Opção inválida. Por favor, digite um número de 1 a 7.")
            continue  # Retorna ao início do laço while

        # Se for opção de redes, executa o módulo de redes e retorna ao laço
        if opcao == '6':
            executar_calculos_redes()
            continue

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
        elif opcao == '5':
            resultado = porcentagem(num1, num2)
            simbolo = "%"

        # 5. Apresentação do resultado na tela
        if isinstance(resultado, str):
            # Caso a função dividir tenha retornado uma mensagem de erro em texto
            print(f"\n--> {resultado}")
        elif opcao == '5':
            # Exibição personalizada para porcentagem
            print(f"\n--> Resultado: {num2}% de {num1} = {resultado}")
        else:
            # Exibição com f-string formatada
            print(f"\n--> Resultado: {num1} {simbolo} {num2} = {resultado}")

# Ponto de entrada padrão em scripts Python
if __name__ == "__main__":
    main()
