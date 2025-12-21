### **Loops (`loop`, `while`, `for`)**

Imagine que você está correndo em uma pista.

1.  **`loop` (A Esteira Infinita):** Você liga a esteira e corre. Ela não tem fim. Você só para se apertar o botão de emergência (`break`). Se não apertar, você corre até desmaiar (o programa travar).
2.  **`while` (A Corrida de Obstáculos):** Você corre *enquanto* tiver energia. A cada volta, você verifica: "Ainda tenho fôlego?". Se sim, corre mais uma. Se não, para.
3.  **`for` (A Entrega de Jornais):** Você tem uma pilha de 10 jornais. Você corre para a casa 1, entrega. Casa 2, entrega. Quando os jornais acabam, você para automaticamente. Você sabe exatamente quantas voltas vai dar ou quais itens vai processar.

### O Conceito em Detalhes

**`loop` (O Infinito Controlável)**

É o laço mais cru do Rust. Ele executa o bloco de código repetidamente para sempre, até você mandar parar explicitamente.

*   **Comando `break`:** Sai do loop imediatamente.
*   **Comando `continue`:** Pula o resto do código atual e volta para o início da próxima volta.
*   **Superpoder:** Em Rust, o `loop` pode **retornar um valor**. É o único que faz isso. Útil para: "Tente conectar no banco de dados até conseguir, e quando conseguir, me devolva a conexão".

**`while` (O Condicional)**

É o laço clássico. Executa **enquanto** uma condição for verdadeira.
Ele testa a condição *antes* de entrar no bloco. Se for falsa de cara, ele nem roda.

**`for` (O Iterador Seguro)**

É o "queridinho" do Rust. Ele percorre uma coleção (array, vetor, range) item por item.
*   **Ranges:** `for i in 0..5` (vai de 0 a 4).
*   **Iterators:** `for item in lista.iter()` (passa por cada item da lista).

O `for` é o mais seguro porque o compilador sabe quando a lista acaba, então é impossível acontecer o erro de "index out of bounds" (tentar acessar o item 10 de uma lista que só tem 5).

### Por Que Isso Importa?

*   **Segurança de Memória:** Em C++, um laço `while` mal feito acessando um array pode ler memória que não deve. O `for` do Rust elimina esse risco.
*   **Expressividade:** O `loop` que retorna valor elimina a necessidade de criar variáveis mutáveis estranhas fora do laço só para guardar um resultado.
*   **Performance:** Os iteradores do `for` em Rust são otimizados (Zero Cost Abstractions). Muitas vezes, eles são tão rápidos quanto um laço `while` manual de baixo nível.

### Exemplos Práticos

**Exemplo 1: `loop` com Retorno (A mágica do Rust)**

```rust
fn main() {
    let mut contador = 0;

    let resultado = loop {
        contador += 1;

        if contador == 10 {
            break contador * 2; // Para e retorna 20!
        }
    }; // Ponto e vírgula aqui porque é uma expressão que retorna valor

    println!("O resultado é {}", resultado);
}
```

**Exemplo 2: `while` (O clássico)**

```rust
fn main() {
    let mut numero = 3;

    while numero != 0 {
        println!("{}!", numero);
        numero -= 1;
    }
    println!("DECOLAR!");
}
```

**Exemplo 3: `for` (O mais usado)**

```rust
fn main() {
    // Range (0 até 4)
    for i in 0..5 {
        println!("Número: {}", i);
    }

    // Iterando sobre um array
    let frutas = ["Maçã", "Banana", "Uva"];
    for fruta in frutas.iter() {
        println!("Eu gosto de {}", fruta);
    }
}
```

### Armadilhas Comuns

*   **Loop Infinito sem querer:** Esquecer de incrementar o contador dentro de um `while`. (O `for` evita isso).
*   **Modificar a coleção enquanto itera:** Tentar remover itens de um vetor *enquanto* você faz um `for` nele. O *Borrow Checker* do Rust vai te impedir (e te salvar de um bug), mas é frustrante no começo.
*   **Não usar `.iter()`:** Se você fizer `for item in colecao`, você pode acabar "movendo" (Ownership) a coleção e perdendo o acesso a ela depois. Prefira `&colecao` ou `colecao.iter()` para apenas pegar emprestado.

### Boas Práticas

1.  **Use `for` em 90% dos casos:** É mais seguro e mais rápido de escrever. Se precisa repetir X vezes ou percorrer uma lista, é `for`.
2.  **Use `loop` para retries:** Se a lógica é "tente de novo até funcionar", `loop` é semanticamente melhor que `while true`.
3.  **Labels de Loop:** Se você tem um loop dentro de outro loop, você pode dar nomes a eles para dar `break` no loop de fora estando dentro do loop de dentro.
    ```rust
    'externo: loop {
        loop {
            break 'externo; // Sai dos DOIS loops de uma vez
        }
    }
    ```

### Resumo Rápido

*   **`loop`**: Infinito. Pode retornar valor com `break valor`. Ideal para "tentar até conseguir".
*   **`while`**: Condicional. Roda enquanto for `true`. Cuidado para não esquecer de atualizar a condição.
*   **`for`**: Iteração. Percorre ranges (`0..10`) ou coleções. É o mais seguro e recomendado para arrays/vetores.
*   **Dica:** Esqueça o `for (i=0; i<10; i++)` estilo C/Java. Em Rust, use Ranges (`0..10`).