# Galo de Ouro

Site de exposição de aves e apresentação de produtos, desenvolvido com HTML e CSS. O projeto reúne uma página inicial com exemplares em destaque e uma loja com catálogo compacto, mantendo uma identidade visual baseada em preto e dourado.

A interface segue a abordagem **mobile first**: os estilos começam pelas telas menores e são adaptados para tablets e computadores.

## Sobre o projeto

O Galo de Ouro está sendo desenvolvido de forma incremental, com foco em organização do código, navegação clara e evolução da interface.

A versão atual funciona como uma vitrine estática. A estrutura visual da loja e do carrinho está preparada para receber funcionalidades de compra em uma etapa futura.

## Funcionalidades

### Página inicial

- Apresentação do projeto.
- Navegação para exposição e loja.
- Cards de exposição com efeito de giro.
- Carrossel horizontal com destaques da loja.
- Links para os produtos no catálogo.

### Loja

- Catálogo com cards compactos.
- Imagem, nome, raça e informação de preço por exemplar.
- Navegação entre as categorias de aves e acessórios.
- Grade responsiva para diferentes tamanhos de tela.
- Estrutura visual dos botões de adicionar ao carrinho.

### Elementos compartilhados

- Cabeçalho com identidade visual e navegação.
- Painel do carrinho com estado vazio.
- Rodapé com links de navegação e acesso ao catálogo.
- Atalho para voltar ao topo.
- Cores e medidas reutilizáveis por meio de variáveis CSS.

## Tecnologias

| Tecnologia | Aplicação |
| --- | --- |
| HTML5 | Estrutura das páginas e organização semântica |
| CSS3 | Estilização, responsividade e interações visuais |
| CSS Grid | Grades de produtos e organização dos cards |
| Flexbox | Alinhamento de elementos e distribuição de conteúdo |
| Custom Properties | Padronização de cores, espaçamentos e outros valores |
| Media Queries | Adaptação da interface para telas maiores |

O projeto não utiliza frameworks, bibliotecas externas ou JavaScript.

## Estrutura de arquivos

- `index.html`: página inicial e exposição.
- `loja.html`: catálogo da loja.
- `css/style.css`: estilos compartilhados entre as páginas.
- `img/abel.jpg`: imagem do exemplar Abel Ferreira.
- `img/imperador.jpg`: imagem do exemplar Imperador.
- `img/bruxo.jpg`: imagem do exemplar Bruxo.
- `README.md`: documentação do projeto.

## Como executar

1. Baixe ou clone o repositório.
2. Mantenha a organização das pastas e dos arquivos.
3. Abra o arquivo `index.html` em um navegador.
4. Acesse a loja pelos links de navegação ou abra `loja.html`.

Não é necessário instalar dependências ou executar uma etapa de compilação.

## Responsividade

Os estilos seguem a abordagem mobile first, utilizando media queries com `min-width`.

| Largura da tela | Organização do catálogo |
| --- | --- |
| Abaixo de 640 px | Duas colunas |
| A partir de 640 px | Três colunas |
| A partir de 1024 px | Cinco colunas |

O catálogo mantém os cards compactos. O carrossel da página inicial permite rolagem horizontal para consultar os destaques.

## Acessibilidade

A interface inclui:

- Idioma da página definido como português do Brasil.
- Estrutura semântica com cabeçalho, navegação, conteúdo principal e rodapé.
- Link para pular diretamente ao conteúdo.
- Descrições alternativas nas imagens.
- Identificação das regiões de navegação.
- Indicadores visuais de foco.
- Adaptação das animações à preferência de movimento reduzido.

Esses recursos fazem parte da implementação atual e devem continuar sendo revisados conforme o projeto evolui.

## Organização do CSS

As variáveis globais ficam no seletor `:root` do arquivo `css/style.css`.

Elas centralizam valores como:

- Cores da interface.
- Família tipográfica.
- Largura máxima do conteúdo.
- Bordas arredondadas.
- Sombras.
- Duração das transições.

Os estilos base atendem às telas menores. As adaptações para telas maiores ficam nas media queries ao final do arquivo.

## Estado atual do carrinho

O carrinho é uma representação visual nesta versão.

Os botões **Adicionar** permanecem desabilitados. Ainda não existem inclusão de produtos, alteração de quantidades, cálculo de valores, armazenamento de itens ou finalização de pedidos.

Os preços das aves são apresentados como **Preço sob consulta**, e o catálogo de acessórios está indicado como disponível em breve.

## Próximas etapas

- Implementar a inclusão e remoção de produtos no carrinho.
- Permitir a alteração de quantidades.
- Definir o fluxo de consulta ou compra.
- Adicionar os produtos da categoria de acessórios.
- Ampliar as informações dos exemplares.
- Validar a interface em diferentes dispositivos e navegadores.

## Status

Projeto em desenvolvimento, com evolução gradual da interface e das funcionalidades.
