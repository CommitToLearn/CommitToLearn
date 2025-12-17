### **Declarações (`let`, `mut`, `const`, `static`)**

Imagine que você está mobiliando um escritório.

1.  **`let` (A Etiqueta Definitiva):** Você cola uma etiqueta "Relatórios 2023" em uma caixa e lacra a caixa. Você não pode tirar o conteúdo e colocar "Lanches" dentro. A etiqueta está vinculada àquele conteúdo para sempre.
2.  **`let mut` (O Quadro Branco):** Você escreve "Meta do Dia: 100" no quadro. Amanhã, você apaga e escreve "Meta do Dia: 200". É feito para mudar.
3.  **`const` (A Placa de Bronze):** É uma placa gravada na parede do prédio dizendo "Fundado em 1990". Isso foi definido antes mesmo de alguém entrar no escritório (tempo de compilação) e nunca vai mudar, não importa o que aconteça.
4.  **`static` (O Bebedouro no Corredor):** É um objeto físico fixado num lugar exato do prédio. Todo mundo sabe onde fica. Ele dura enquanto o prédio existir.

### O Conceito em Detalhes

**`let` (O Padrão Imutável)**

Em Rust, variáveis são **imutáveis por padrão**.
Se você escrever `let x = 5;`, você está fazendo uma promessa: "x vai valer 5 e acabou".

*   **Vantagem:** Se você está lendo um código gigante e vê `let x = ...`, seu cérebro relaxa. Você sabe que o valor não vai mudar magicamente 50 linhas depois.
*   **Shadowing (Sombreamento):** Você *pode* declarar uma nova variável com o mesmo nome.
    `let x = 5;`
    `let x = x + 1;` (Isso cria um *novo* `x` que destrói o antigo. Não é mutação, é substituição).

**`let mut` (A Permissão para Mudar)**

Se você precisa atualizar um valor (como um contador), você precisa ser explícito e usar `mut` (de *mutable*).

*   `let mut contador = 0;`
*   `contador = contador + 1;` (Agora sim, estamos alterando o valor na mesma memória).

**`const` (Constantes Verdadeiras)**

*   **Tempo de Compilação:** O valor deve ser conhecido *antes* do programa rodar. Você não pode fazer `const x = ler_input_do_usuario()`.
*   **Inlining:** O compilador copia e cola o valor onde ele for usado. Ele não ocupa um lugar fixo na memória RAM, ele vira parte do código.
*   **Convenção:** Nomes sempre em `SCREAMING_SNAKE_CASE` (Tudo maiúsculo).

**`static` (Variáveis Globais)**

*   **Endereço Fixo:** Diferente do `const`, o `static` tem um endereço de memória fixo.
*   **Tempo de Vida:** Vive do momento que o programa abre até fechar (`'static` lifetime).
*   **Perigo:** Tentar mudar um `static mut` é considerado **unsafe** (inseguro) em Rust, porque pode causar conflitos se duas threads tentarem mexer nele ao mesmo tempo.

### Por Que Isso Importa?

*   **Engenharia de Dados Concorrente:** Rust é famoso por ser seguro com *threads* (processamento paralelo). A imutabilidade padrão (`let`) garante que você pode mandar dados para vários processadores sem medo de um alterar o dado do outro e corromper o cálculo.
*   **Performance:** `const` permite otimizações agressivas do compilador.
*   **Clareza:** Você comunica sua intenção. Se usou `mut`, eu sei que devo prestar atenção nas mudanças.

### Exemplos Práticos

```rust
// CONST: Sempre maiúsculo, tipo obrigatório.
// Use para "números mágicos" ou configurações fixas.
const PI: f64 = 3.14159;

// STATIC: Endereço fixo, vive pra sempre.
static MENSAGEM_BOAS_VINDAS: &str = "Bem-vindo ao Sistema";

fn main() {
    // LET: Imutável (o padrão)
    let salario = 5000;
    // salario = 6000; // <--- ERRO! O compilador não deixa.

    // LET MUT: Mutável
    let mut saldo = 100;
    saldo = saldo - 50; // <--- OK! Eu avisei que ia mudar.
    println!("Saldo novo: {}", saldo);

    // SHADOWING (O Truque do let)
    let espacos = "   "; // Começa como texto
    let espacos = espacos.len(); // Vira número!
    // Isso é permitido com shadowing, mas proibido com mut.
    // Com mut, você pode mudar o valor, mas nunca o TIPO.
}
```

### Armadilhas Comuns

*   **Confundir `const` com `let` (imutável):**
    *   `let` é calculado na hora que o programa roda (Runtime).
    *   `const` é calculado na hora que você compila (Compile Time).
*   **Usar `static mut`:** Iniciantes tentam usar `static mut` para criar variáveis globais como fariam em C ou Python. Em Rust, isso exige um bloco `unsafe` e geralmente é má ideia. Prefira passar as variáveis como argumentos para as funções.
*   **Tipagem no `const`:** O `let` adivinha o tipo (`let x = 5` vira `i32`), mas o `const` exige tipo explícito (`const X: i32 = 5`).

### Boas Práticas

1.  **Use `let` para 95% dos casos.** A imutabilidade é sua amiga.
2.  **Use `let mut` apenas quando necessário** (loops, acumuladores).
3.  **Use `const` para valores fixos** que nunca mudam (URLs de API, taxas de imposto, limites máximos).
4.  **Evite `static`** a menos que saiba exatamente o que está fazendo (ex: interagir com código em C).

### Resumo Rápido

*   `let`: Variável padrão. Imutável. Calculada na execução.
*   `let mut`: Variável que pode mudar de valor (mas não de tipo).
*   `const`: Constante global. Copia e cola o valor no código. Calculada na compilação.
*   `static`: Variável global com endereço de memória fixo. Raro uso no dia a dia.
*   **Shadowing:** Usar `let` de novo com o mesmo nome para transformar dados (ex: string -> int).