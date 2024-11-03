# MIGRATE E-COMMERCE API

## Descrição

Esta API MIGRATE permite que usuários se cadastrem, façam login, adicionem produtos ao carrinho, emitam ordens de compra e acompanhem suas compras. Administradores têm permissão para gerenciar produtos e usuários, além de acompanhar as ordens emitidas e enviar notificações sobre o status de compras.

---

## Funcionalidades

### Usuários

- **Cadastro de usuários**: Permite que novos usuários se registrem.
- **Login e Logout**: Autenticação de usuários para acessar as funcionalidades protegidas.
- **Visualizar produtos**: Exibição de todos os produtos disponíveis.
- **Buscar produtos**: Pesquisa por produtos através de filtros.
- **Adicionar ao carrinho**: Inclusão de produtos no carrinho de compras.
- **Emitir ordem de compra**: Finalização da compra, gerando uma ordem de compra com status "pendente".
- **Visualizar ordens**: Acompanhamento de ordens emitidas.

### Administradores

- **Gerenciamento de Produtos**: Criar, atualizar, remover e listar produtos.
- **Gerenciamento de Usuários**: Visualizar e editar detalhes dos usuários cadastrados.
- **Gerenciamento de Ordens**: Receber,acompanhar e alterar o status de todas as ordens emitidas pelos usuários.
- **Envio de notificações**: Enviar notificações aos usuários sobre o status das compras e atualizações de produtos.

---

## Regras de Negócio

- Apenas **usuários autenticados** podem adicionar produtos ao carrinho e realizar compras.
- **Usuários não autenticados** podem visualizar e buscar produtos.
- Apenas **administradores** podem gerenciar produtos, usuários e ordens.
- Ao fechar uma compra, o status do carrinho é alterado para "fechado" e um novo carrinho com status "ativo" é criado automaticamente quando o usuário decide adicionar um produto ao carrinho.
- O carrinho não pode ser modificado após a emissão de uma ordem.
- As rotas de criação de um usuário com privilégios de administrador só podem ser consumidas com o token de administrador,
---

## Requisitos Não Funcionais

- **Segurança**: A API deve garantir a segurança dos dados dos usuários, implementando autenticação e autorização.
- **Escalabilidade**: O sistema deve ser escalável para suportar um aumento no número de usuários e ordens.
- **Desempenho**: O tempo de resposta da API deve ser otimizado, especialmente para grandes volumes de produtos e ordens.
- **Manutenibilidade**: O código deve ser modular e seguir boas práticas para facilitar a manutenção futura.

---

## Endpoints

### Usuários

- **POST /api/users/createaccount** - Cadastro de novos usuários
- **POST /api/users/createadminaccount** - Login de usuários
- **POST /api/users/signin** - Logout de usuários
- **GET /api/users/orders** - Visualizar todas as ordens do usuário autenticado

### Produtos
- **GET /api/p/** - Listar todos os produtos 
- **POST /api/admin/p/create** - Criar um novo produto (requer permissões de administrador)
- **PUT /api/admin/p/update** - Atualizar dados de um produto específico (requer permissões de administrador)
- **DELETE /api/admin/p/delete** - Remover um produto específico (requer permissões de administrador)

### Carrinho de Produtos
- **GET /api/productcart/** - Obter todos os produtos do carrinho específico (requer token de autenticação)
- **POST /api/productcart/add** - Adicionar produto ao carrinho do usuário (requer token de autenticação)
- **DELETE /api/productcart/delete** - Remover produto do carrinho do usuário autenticado

---

### Ordem de compras
- **GET /api/order/** - Obter Todos os produtos do carrinho especifico 
- **POST /api/order/create** - Criar uma nova ordem de pedido (necessário estar autenticado)

## Tecnologias Utilizadas

- **Node.js** com **TypeScript** para o desenvolvimento da aplicação.
- **Express** como framework para construção do backend.
- **Prisma** como ORM para interagir com o banco de dados.
- **JWT** para autenticação e controle de acesso.
- **Docker** para containerização da aplicação.


---

## Próximas Funcionalidades

- **Integração com serviços de pagamento**: Implementar integração com gateways de pagamento.
- **Caching**: Implementar sistema de cache .
- **Monitoramento de acesso** - Implementar sistema de monitoramento de clicks e acesso.
---

## Instalação e Uso

1. Clone o repositório:
   ```bash
   git clone <https://github.com/DecoXD/MIGRATE-BACKEND>

2. 
  ```bash
  npm install

3. 
  ```bash
  npm start
