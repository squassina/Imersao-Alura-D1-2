# 🧮 Calculadora Simples em Python (Guia para Iniciantes)

Bem-vindo(a) ao projeto da **Calculadora Simples em Python**! Este projeto foi desenvolvido especialmente para quem está dando os primeiros passos na programação. Ele demonstra na prática os conceitos fundamentais de Python: **funções modulares**, **estruturas condicionais**, **laços de repetição** e **tratamento de erros**.

Além do script `calculadora.py` pronto para rodar no seu computador, o projeto inclui uma aplicação web interativa com **simulador de terminal em tempo real** e visualizador de variáveis.

---

## 📋 Sumário
1. [Visão Geral do Código](#-visão-geral-do-código)
2. [Explicação dos Principais Componentes](#-explicação-dos-principais-componentes)
   - [1. Funções Matemáticas (`def`)](#1-funções-matemáticas-def)
   - [2. Estrutura Condicional (`if / elif / else`)](#2-estrutura-condicional-if--elif--else)
   - [3. Laço de Repetição Contínuo (`while True`)](#3-laço-de-repetição-contínuo-while-true)
   - [4. Tratamento de Exceções (`try / except`)](#4-tratamento-de-exceções-try--except)
   - [5. Prevenção de Divisão por Zero](#5-prevenção-de-divisão-por-zero)
   - [6. Ponto de Entrada (`if __name__ == "__main__":`)](#6-ponto-de-entrada-if-__name__----__main__)
3. [Como Executar no seu Computador](#-como-executar-no-seu-computador)
4. [Recursos da Aplicação Web Interativa](#-recursos-da-aplicação-web-interativa)
5. [Desafios para Praticar](#-desafios-para-praticar)

---

## 💻 Visão Geral do Código

O script completo está localizado no arquivo [`calculadora.py`](./calculadora.py). Veja a estrutura simplificada:

```python
# 1. Funções matemáticas básicas
def somar(a, b): return a + b
def subtrair(a, b): return a - b
def multiplicar(a, b): return a * b
def dividir(a, b):
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

# 2. Menu de opções
def exibir_menu():
    print("\n1. Adição | 2. Subtração | 3. Multiplicação | 4. Divisão | 5. Sair")

# 3. Fluxo com loop e tratamento de erros
def main():
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1-5): ").strip()
        if opcao == '5':
            break
        ...
```

---

## 🧠 Explicação dos Principais Componentes

### 1. Funções Matemáticas (`def`)
Uma função é um bloco de código reutilizável com um nome definido. Em Python, declaramos funções com a palavra-chave `def`:

```python
def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b
```

- **Parâmetros (`a`, `b`):** São os dados que a função recebe para trabalhar.
- **Retorno (`return`):** A instrução `return` devolve o resultado para quem chamou a função. É diferente do `print()`, que apenas mostra um texto na tela; o `return` permite guardar o resultado em uma variável ou usá-lo em outros cálculos.

### 2. Estrutura Condicional (`if / elif / else`)
As estruturas condicionais direcionam o caminho que o programa deve seguir com base em testes lógicos:

```python
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
```

- `if` ("se"): Testa a primeira condição.
- `elif` ("senão se"): Se a anterior for falsa, testa a próxima condição.
- Usar `if / elif` em cadeia é muito mais eficiente do que vários `if` soltos, pois assim que uma opção é verdadeira, o Python pula as demais.

### 3. Laço de Repetição Contínuo (`while True`)
Para que o usuário possa fazer várias contas sem precisar reabrir o programa a cada cálculo, usamos um laço `while`:

```python
while True:
    exibir_menu()
    opcao = input("Escolha (1-5): ")
    if opcao == '5':
        print("Até logo!")
        break      # Sai do laço e encerra
    if opcao not in ['1', '2', '3', '4']:
        print("Opção inválida!")
        continue   # Volta para o início do laço
```

- `while True:` cria uma repetição contínua (infinita).
- `break`: Interrompe o laço imediatamente.
- `continue`: Pula as linhas restantes da rodada atual e reinicia o laço do início.

### 4. Tratamento de Exceções (`try / except`)
Se o usuário digitar um texto como `"dez"` onde o programa espera um número, a conversão `float()` causará um erro fatal (`ValueError`). O bloco `try / except` captura esse erro com elegância:

```python
try:
    num1 = float(input("Digite o primeiro número: "))
    num2 = float(input("Digite o segundo número: "))
except ValueError:
    print("[!] Entrada inválida: Digite apenas números.")
    continue
```

- O código dentro de `try` tenta ser executado.
- Se acontecer um `ValueError`, o Python salta para o `except`, evitando que o programa trave.

### 5. Prevenção de Divisão por Zero
Dividir qualquer valor por zero é matematicamente impossível e geraria `ZeroDivisionError`. Protegemos a função `dividir` com uma checagem preventiva:

```python
def dividir(a, b):
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b
```

### 6. Ponto de Entrada (`if __name__ == "__main__":`)
```python
if __name__ == "__main__":
    main()
```
Esta linha é uma convenção padrão do ecossistema Python. Ela garante que a função `main()` só seja executada quando você rodar o arquivo diretamente (ex: `python calculadora.py`), e não quando o arquivo for importado por outro módulo.

---

## 🚀 Como Executar no seu Computador

### Passo 1: Verificar se você tem o Python instalado
Abra o seu terminal (Prompt de Comando, PowerShell ou Terminal no Mac/Linux) e digite:

```bash
python --version
# ou
python3 --version
```

Se aparecer algo como `Python 3.10.x` ou superior, você está pronto(a)! Se não estiver instalado, baixe gratuitamente em [python.org](https://www.python.org/downloads/).

### Passo 2: Executar o arquivo
No terminal, navegue até a pasta onde salvou o arquivo `calculadora.py` e execute:

```bash
# No Windows:
python calculadora.py

# No macOS ou Linux:
python3 calculadora.py
```

### No VS Code:
1. Abra a pasta do projeto no **Visual Studio Code**.
2. Abra o arquivo `calculadora.py`.
3. Clique no botão de **Play (Executar)** no canto superior direito ou pressione `F5`.

---

## 🌐 Recursos da Aplicação Web Interativa

Esta aplicação conta com um laboratório interativo no navegador:
1. **Simulador de Terminal:** Teste a calculadora diretamente na interface, digitando entradas e vendo saídas idênticas ao terminal de verdade.
2. **Inspetor de Variáveis:** Visualize em tempo real os valores de `opcao`, `num1`, `num2`, `resultado` e a função ativa em memória.
3. **Explorador Interativo de Código:** Clique nas seções do script para ler anotações didáticas de cada linha.
4. **Cópia e Download Instantâneos:** Baixe o arquivo `.py` com 1 clique para usar nos seus estudos.

---

## 🎯 Desafios para Praticar

Pronto(a) para subir de nível? Tente implementar estas melhorias no seu arquivo:

1. **Potenciação (`**`):** Crie a função `def potencia(a, b): return a ** b` e inclua uma nova opção no menu.
2. **Resto da Divisão (`%`):** Calcule o módulo entre dois números para descobrir se um número é divisível por outro.
3. **Média Aritmética:** Crie uma opção para calcular `(a + b) / 2`.
4. **Histórico de Cálculos:** Crie uma lista `historico = []` e adicione cada resultado com `.append()` para permitir consultar as operações anteriores.

---

*Bons estudos e bem-vindo(a) ao universo da programação com Python!*
