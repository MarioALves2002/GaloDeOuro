# Galo de Ouro

Site de exposição de aves e apresentação de produtos, desenvolvido com HTML, CSS e JavaScript puro. O projeto reúne uma página inicial com exemplares em destaque e uma loja com catálogo compacto, mantendo uma identidade visual baseada em preto e dourado.

A interface segue a abordagem **mobile first**: os estilos começam pelas telas menores e são adaptados para tablets e computadores.

## Sobre o projeto

O Galo de Ouro está sendo desenvolvido de forma incremental, com foco em organização do código, navegação clara e evolução da interface.

A versão atual inclui cadastro e login de clientes, carrinho por conta e painel local de demonstração para cadastrar aves. A entrega termina no carrinho, sem pedidos ou pagamentos.

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
- Botões para adicionar aves ao carrinho, incluindo as cadastradas no painel.

### Elementos compartilhados

- Cabeçalho com identidade visual e navegação.
- Painel do carrinho com quantidades e remoção de uma unidade por vez.
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

O projeto utiliza JavaScript puro, sem frameworks ou bibliotecas externas.

## Estrutura de arquivos

- `index.html`: página inicial e exposição.
- `loja.html`: catálogo da loja.
- `login.html`: cadastro e login.
- `painel.html`: formulário de cadastro de aves da demonstração.
- `js/auth.js` e `js/password.js`: autenticação dos clientes com PBKDF2.
- `js/accounts.js`: validação, listagem e cadastro de contas com hash.
- `js/session.js`: sessão da aba e saída.
- `js/cart.js`: carrinho salvo por e-mail da conta.
- `js/admin-demo.js` e `js/painel.js`: conta fictícia e painel local.
- `js/catalog.js`: cards das aves salvas pelo painel.
- `css/style.css`: estilos compartilhados entre as páginas.
- `img/abel.jpg`: imagem do exemplar Abel Ferreira.
- `img/imperador.jpg`: imagem do exemplar Imperador.
- `img/bruxo.jpg`: imagem do exemplar Bruxo.
- `README.md`: documentação do projeto.

## Como executar

1. Baixe ou clone o repositório.
2. Mantenha a organização das pastas e dos arquivos.
3. Na raiz do repositório, com Python instalado, execute:

   ```powershell
   python -m http.server 8000 --bind 127.0.0.1 --directory galo-de-ouro
   ```

4. Abra `http://127.0.0.1:8000` no navegador. Outra opção é servir a pasta `galo-de-ouro` com o Live Server do VS Code.

Use sempre o mesmo endereço e porta para acessar os mesmos dados. O localhost permite usar as funções de criptografia do navegador. Para encerrar o servidor Python, pressione `Ctrl+C`.

Não é necessário instalar dependências ou executar uma etapa de compilação.

## Como demonstrar

1. Cadastre um cliente, teste e-mail duplicado e senha incorreta e depois entre com a senha correta.
2. Adicione duas unidades de uma ave, remova uma e recarregue. Confira o contador também na home.
3. Saia e entre com outro cliente para conferir que os carrinhos são separados.
4. Como visitante e como cliente, abra `painel.html`: deve voltar ao login.
5. No primeiro acesso, use a conta fictícia: **admin@galodeouro.demo**, senha **GaloDemo123!**. Ela é salva automaticamente com hash, sem substituir uma conta existente. Depois disso, o perfil salvo determina o acesso; mudar seu perfil para cliente mantém essa mudança.
6. Cadastre uma ave com nome, raça e uma das três fotos existentes. Abra a loja, confira o card e recarregue: a ave deve permanecer.
7. Clique em Adicionar no novo card. Ele deve entrar no carrinho com seu próprio ID; duas adições aumentam a quantidade na mesma linha.
8. No painel, confira os totais e crie outro administrador com dados fictícios. Tente repetir o e-mail para verificar a mensagem de duplicidade.
9. Promova um cliente a administrador e entre com essa conta: deve abrir o painel. Com outro administrador, volte a conta para cliente; ela deve continuar entrando na loja, conservar o carrinho e perder o acesso ao painel.
10. Deixe apenas um administrador e tente torná-lo cliente: a ação deve ser bloqueada. As ações administrativas consultam o perfil salvo novamente, inclusive depois de calcular o hash de uma conta nova.

Contas de clientes, aves e carrinhos ficam no `localStorage` deste navegador. A sessão fica no `sessionStorage` da aba. Limpar os dados do site apaga esses registros; eles não são enviados a um servidor nem compartilhados entre navegadores.

O painel é uma **demonstração local**. As credenciais iniciais fictícias estão definidas no código e a verificação de acesso acontece no navegador; isso não oferece proteção de administração para um site real. As contas salvas usam salt, iterações e hash de senha. O cadastro público sempre cria clientes. Trocar o perfil altera apenas esse campo da conta, preservando credenciais e carrinho.

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

O carrinho permite adicionar e remover unidades e mantém os itens separados por conta no `localStorage`. Visitantes são enviados ao login ao clicar em Adicionar. Ao sair, o carrinho salvo permanece associado à conta.

Não há cálculo de valores, finalização de pedidos ou pagamentos.

Os preços das aves são apresentados como **Preço sob consulta**, e o catálogo de acessórios está indicado como disponível em breve.

## Próximas etapas

- Definir o fluxo de consulta ou compra.
- Adicionar os produtos da categoria de acessórios.
- Ampliar as informações dos exemplares.
- Validar a interface em diferentes dispositivos e navegadores.

## Status

Projeto em desenvolvimento, com evolução gradual da interface e das funcionalidades.
