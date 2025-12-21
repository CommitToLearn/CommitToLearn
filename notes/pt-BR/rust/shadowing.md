### **Shadowing (Sombreamento)**

### Explicação Introdutória

Imagine que você está brincando de massinha de modelar.

1.  **Mutabilidade (`mut`):** Você faz uma bola vermelha. Você amassa a bola e transforma num cubo vermelho. A massinha é a mesma, só mudou a forma.
2.  **Shadowing (`let` de novo):** Você faz uma bola vermelha. Você decide que não quer mais ela. Você pega uma massinha **azul** nova e faz um cubo. Você chama esse cubo novo pelo mesmo nome que chamava a bola ("Meu Brinquedo"). A bola vermelha é descartada (ou escondida) e agora "Meu Brinquedo" se refere ao cubo azul.

Em Rust, o **Shadowing** permite que você declare uma nova variável com o **mesmo nome** de uma anterior. A nova variável "faz sombra" na antiga, tornando a antiga inacessível dali para frente.

### O Conceito em Detalhes

**Como fazer**
Basta usar a palavra `let` novamente.

```rust
let x = 5;
let x = x + 1; // Crio um NOVO 'x' que vale 6. O 'x' antigo (5) sumiu.
let x = x * 2; // Crio um NOVO 'x' que vale 12. O 'x' antigo (6) sumiu.
```

**A Diferença Vital para `mut`**
Isso confunde muita gente.
*   **`mut`:** Altera o valor no mesmo espaço de memória. **Não pode mudar o TIPO.**
    *   *Ex:* Se `x` é número, não pode virar texto.
*   **Shadowing:** Cria uma variável nova (aloca nova memória). **Pode mudar o TIPO.**
    *   *Ex:* `x` era texto ("5"), agora `x` é número (5).

**Escopo**
O shadowing respeita blocos `{}`. Se você fizer shadowing dentro de um `if`, a variável antiga volta a aparecer quando o `if` acabar.

### Por Que Isso Importa?

*   **Nomes Limpos:** É a principal razão. Sem shadowing, você teria que criar nomes como `input_str`, `input_trimmed`, `input_parsed`, `input_final`. Com shadowing, você chama tudo de `input` e vai transformando o dado.
*   **Imutabilidade:** Você pode fazer uma transformação e manter o resultado imutável.
    *   Com `mut`: `let mut x = ...; x = x + 1;` (Agora `x` está aberto para mudanças acidentais no futuro).
    *   Com Shadowing: `let x = ...; let x = x + 1;` (O novo `x` é imutável. Seguro!).

### Exemplos Práticos

**Exemplo 1: O Clássico (Mudança de Tipo)**
Recebendo dados do usuário.

```rust
fn main() {
    // 1. espaços é uma String ("   ")
    let espaços = "   "; 
    
    // 2. Usamos shadowing para mudar o tipo para usize (número 3)
    // Não precisamos criar uma variável 'tamanho_espacos'
    let espaços = espaços.len(); 

    println!("Temos {} espaços", espaços);
}
```

**Exemplo 2: Sombreamento de Escopo (A pegadinha)**

```rust
fn main() {
    let x = 10; // x original

    {
        let x = 50; // x interno (faz sombra no original aqui dentro)
        println!("Dentro: {}", x); // Imprime 50
    } // O x interno morre aqui

    println!("Fora: {}", x); // Imprime 10 (O x original voltou!)
}
```

### Armadilhas Comuns

*   **Confiar que o valor mudou globalmente:** No Exemplo 2 acima, iniciantes acham que o `println!("Fora")` vai imprimir 50. Não vai. O shadowing interno não afeta a variável externa, ele apenas a esconde temporariamente.
*   **Perder a referência original:** Se você fizer `let x = x.unwrap()`, você perdeu o acesso ao `Option` original que envolvia o valor. Se precisasse dele depois, já era.
*   **Excesso de Reciclagem:** Usar `x` para guardar a idade, depois usar `x` para guardar o nome do cachorro 10 linhas depois. O código compila, mas fica confuso de ler. Mantenha a semântica (o significado) da variável.

### Boas Práticas

*   **Use para pipelines de transformação:** `texto` -> `texto.trim()` -> `texto.parse()`.
*   **Mantenha o significado:** Só use shadowing se a variável nova representa **a mesma coisa** que a antiga, mas em um estado ou formato diferente.
*   **Prefira Shadowing a `mut`:** Se você vai calcular um valor em 3 etapas e depois nunca mais mudar, use shadowing em vez de criar uma variável `mut`. É mais seguro.

### Resumo Rápido

*   **O que é?** Declarar uma variável com o mesmo nome de uma existente usando `let`.
*   **Poder:** Permite mudar o **TIPO** da variável (String -> Int).
*   **Diferença:** Diferente de `mut`, cria uma nova alocação de memória e permite imutabilidade no final.
*   **Uso:** Limpar nomes de variáveis e converter tipos.
*   **Analogia:** Colocar uma etiqueta nova sobre a velha.