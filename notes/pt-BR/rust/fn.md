### **Funções em Rust (`fn`)**

Imagine uma **máquina industrial de processamento**.
Diferente de uma máquina caseira onde você joga qualquer coisa e vê o que acontece (como em Python ou JS), essa máquina industrial tem moldes de entrada e saída muito rígidos.

*   A entrada tem um formato exato: "Aqui só entra Aço, não entra Plástico".
*   A saída é garantida: "Daqui vai sair um Parafuso, nunca um Prego".

Em Rust, a função (`fn`) é essa máquina. Você é **obrigado** a dizer explicitamente o tipo de dado que entra e o tipo de dado que sai. Se você tentar passar um número onde deveria ir um texto, a esteira para antes mesmo de ligar (o compilador dá erro).

### O Conceito em Detalhes

**A Anatomia Básica (`fn`)**

Para criar uma função, usamos a palavra-chave `fn` (abreviação de function). O padrão de nomes é sempre **snake_case** (tudo minúsculo, separado por underlines).

```rust
// Palavra chave | Nome da função | Parâmetros
fn minha_funcao() {
    println!("Olá, Rust!");
}
```

**O Contrato Rígido (Tipagem)**

Em Rust, não existe "adivinhar" o tipo nos parâmetros da função. Você precisa ser explícito.

*   **Parâmetros:** `nome_da_variavel: Tipo`.
*   **Retorno:** Usamos uma flecha `-> Tipo` depois dos parênteses para dizer o que a função devolve.

```rust
// Recebe um inteiro (i32) e devolve um inteiro (i32)
fn adicionar_um(x: i32) -> i32 {
    // ... corpo da função
}
```

**O "Pulo do Gato" (Expressões vs. Declarações)**

Esta é a parte mais "Rust" de todas.
Rust é uma linguagem baseada em **expressões**. A última linha da função é automaticamente o valor de retorno, **desde que você NÃO use ponto e vírgula (;)**.

*   `x + 1;` (Com ponto e vírgula): É uma instrução. "Some x mais 1 e jogue o resultado fora". Retorna vazio `()`.
*   `x + 1` (Sem ponto e vírgula): É uma expressão. "O resultado disso é o valor final". Retorna o valor.

### Por Que Isso Importa?

*   **Segurança (Type Safety):** Ao forçar você a declarar os tipos, o Rust garante que seu código não vai quebrar lá na frente porque alguém passou uma string onde deveria ser um número.
*   **Código Conciso:** O retorno implícito (sem escrever `return`) deixa o código mais limpo e legível, parecendo uma fórmula matemática.
*   **Performance:** O compilador sabe exatamente quanta memória alocar para os argumentos e o retorno, tornando a execução extremamente rápida.

### Exemplos Práticos

**Exemplo 1: Função Clássica (Soma)**

```rust
fn main() {
    let resultado = somar(5, 10);
    println!("O resultado é: {}", resultado);
}

// Recebe dois inteiros de 32 bits, retorna um inteiro
fn somar(a: i32, b: i32) -> i32 {
    a + b  // <--- OLHA AQUI! Sem ponto e vírgula. Isso é o retorno.
}
```

**Exemplo 2: O jeito "prolixo" (usando `return`)**

Você *pode* usar a palavra `return` se quiser sair da função antes da hora, mas no final da função é considerado "não-idiomático" (estilo ruim).

```rust
fn checar_positivo(num: i32) -> bool {
    if num > 0 {
        return true; // Saindo cedo, precisa de ponto e vírgula
    }
    
    false // Última linha, retorno padrão, sem ponto e vírgula
}
```

### Armadilhas Comuns

   **A Maldição do Ponto e Vírgula:**
    ```rust
    fn erro_comum(x: i32) -> i32 {
        x + 1; // <--- O compilador vai gritar!
    }
    ```
    *Erro:* O compilador esperava que você retornasse um `i32` (um número), mas por causa do `;`, você jogou o valor fora e retornou `()` (vazio/unit).
    *Correção:* Remova o `;` da última linha.

   **Esquecer os Tipos:** Tentar fazer `fn teste(x)` como em Python. O Rust vai reclamar imediatamente. Ele precisa saber o que é `x`.

### Boas Práticas

*   **Snake Case:** Sempre use `minha_funcao`, nunca `MinhaFuncao` (camelCase é para Structs/Tipos).
*   **Retorno Implícito:** Acostume-se a não usar a palavra `return` na última linha. Apenas coloque a expressão sem `;`.
*   **Documentação:** Use três barras `///` antes da função para gerar documentação automática sobre o que ela faz.

### Resumo Rápido

*   **Keyword:** `fn` para definir.
*   **Tipos:** Obrigatório definir tipo dos argumentos (`x: i32`) e do retorno (`-> i32`).
*   **Retorno:** A última linha da função **sem ponto e vírgula** é o valor retornado.
*   **Return:** A palavra `return` existe, mas use só para retornos antecipados (early return).
*   **Ponto e Vírgula:** Com `;` é uma ação (statement). Sem `;` é um valor (expression).