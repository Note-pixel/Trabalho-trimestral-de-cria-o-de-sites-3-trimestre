# UNOA — Loja Virtual

> **Muita variedade, zero complicação.**

Projeto da atividade avaliativa de **Criação de Sites**: uma loja virtual (e-commerce) completa e navegável, com identidade visual própria, carrinho de compras e simulação de todo o processo de compra.

A UNOA usa plataformas como o Mercado Livre apenas como referência de organização e funcionamento. Nome, cores, textos e layout são próprios.

> ⚠️ **Projeto acadêmico fictício.** Nenhum pagamento é real e nenhum dado bancário verdadeiro deve ser informado. Todo o processo de compra é uma simulação.

- **Aluno(a):** _escreva seu nome aqui_
- **Turma:** _escreva sua turma aqui_

---

## Tecnologias

- **HTML5** — estrutura semântica das páginas
- **CSS3** — estilização, variáveis de cor, Grid, Flexbox e responsividade (media queries)
- **JavaScript (puro, sem bibliotecas)** — carrinho, cálculos, validações, filtros e simulação de pagamento
- **localStorage** — guarda carrinho, favoritos, pedidos e conta no navegador
- **Git e GitHub** — controle de versão e publicação do código

---

## Como executar

Não precisa instalar nada.

1. Baixe ou clone o repositório:
   ```bash
   git clone LINK_DO_REPOSITORIO
   ```
2. Abra a pasta no **VS Code**.
3. Instale a extensão **Live Server**, clique com o botão direito em `index.html` e escolha **Open with Live Server**.

Também é possível abrir o `index.html` direto no navegador, mas o Live Server é recomendado.

---

## Funcionalidades

### Requisitos da atividade
- Página inicial organizada, com identidade visual própria
- Menu de navegação com mega menu por categoria
- Categorias de produtos (Tecnologia, Casa e Organização, Moda e Acessórios, Beleza e Cuidados, Hobbies e Lazer)
- Produtos com imagem, nome, descrição e preço
- Página de detalhes do produto, com cores, quantidade, frete, avaliações e fotos
- Botão de adicionar ao carrinho (no produto e direto no card, ao passar o mouse)
- Carrinho funcional: alterar quantidade, remover item (com opção de desfazer) e total calculado
- Finalização do pedido em etapas: **Entrega → Pagamento → Revisão**
- Formulário com dados do cliente e validação dos campos
- Formas de pagamento: **Pix, cartão de débito e cartão de crédito**
- Parcelamento do cartão de crédito em até **3x sem juros**
- Mensagem de compra realizada com sucesso e número do pedido

### Recursos extras
- Busca de produtos, filtros (preço, avaliação, prazo, frete grátis, categoria) e ordenação
- Visualização em grade ou lista e paginação
- Favoritos
- Avaliações de produtos (com foto opcional)
- Cálculo de frete e prazo de entrega por CEP
- Cupons de desconto
- Comparação de até 3 produtos
- Login, cadastro e recuperação de senha
- Endereços salvos (adicionar, editar e excluir)
- Histórico e acompanhamento de pedidos
- Guia de presentes
- Carrinho guardado no navegador
- Layout responsivo (computador e celular)

---

## Dados para testar

| O quê | Valor |
|---|---|
| Login de demonstração | `demo@unoa.com` / `unoa1234` |
| Cupons | `UNOA10` (R$ 10), `PRESENTE15` (R$ 15), `BEMVINDO5` (R$ 5) |
| Cartão fictício | `4111 1111 1111 1111` · validade `08/29` · CVV `123` |
| CEP de exemplo | `90010-000` (preenche o endereço sozinho) |

---

## Estrutura do projeto

```
site/
├── index.html                  Página inicial
├── README.md
├── css/
│   ├── base.css                Cores, fontes, reset e utilitários
│   ├── componentes.css         Cabeçalho, menu, cards e rodapé
│   ├── home.css                Estilos da página inicial
│   ├── catalogo.css            Busca, categorias, ofertas e presentes
│   ├── produto.css             Páginas de produto
│   └── loja.css                Carrinho, checkout e conta
├── js/
│   ├── dados/
│   │   ├── produtos.js         Lista de produtos e categorias
│   │   ├── imagens.js          Caminhos das imagens
│   │   └── estado.js           Carrinho e favoritos (localStorage)
│   ├── componentes/
│   │   ├── layout.js           Cabeçalho, menu, conta e rodapé
│   │   ├── cartao-produto.js   Card de produto reutilizável
│   │   ├── lateral-conta.js    Menu lateral da conta
│   │   └── icones.js           Ícones SVG
│   └── paginas/
│       ├── home.js             Página inicial
│       ├── catalogo.js         Busca, filtros e categorias
│       ├── produto.js          Detalhes, avaliações e comparação
│       ├── loja.js             Carrinho, checkout e pedidos
│       ├── conta.js            Conta e endereços
│       ├── guia-presentes.js   Guia de presentes
│       └── ajuda.js            Central de ajuda
├── paginas/                    Demais páginas HTML da loja
└── imagens/
    ├── produtos/               Fotos dos produtos
    └── banners/                Banners e destaques
```

### Como o código está organizado

- **Dados separados da tela:** os produtos ficam em `produtos.js`. Para adicionar um produto, basta incluir um item na lista.
- **Uma página para todos os produtos:** `produto.html` lê o `id` na URL e monta a tela do produto correspondente.
- **Componentes reutilizáveis:** o cabeçalho, o rodapé e o card de produto são gerados por JavaScript e usados em todas as páginas.
- **Cada página tem seu JS:** cada arquivo em `js/paginas/` cuida de um tipo de página.
- **Cores em variáveis CSS:** a identidade visual está em `:root` no `base.css`.

---

## Identidade visual

- **Nome:** UNOA
- **Cores:** roxo escuro `#2D2438`, roxo médio `#6B4FA0`, lilás `#E8DDF3`, bege `#EFE9E1`
- **Fonte:** Inter
- **Estilo:** cards limpos, bordas arredondadas e foco em clareza de preço, frete e prazo

---

## Git e GitHub

O projeto foi desenvolvido com commits por etapa, e o histórico pode ser consultado na aba **Commits** do repositório.

---

## Observações

- As imagens são ilustrativas, e as avaliações e os dados de pedidos são fictícios.
- Todos os dados (carrinho, pedidos, conta) ficam salvos apenas no navegador e não são enviados a nenhum servidor.
- Projeto desenvolvido para fins educacionais.
