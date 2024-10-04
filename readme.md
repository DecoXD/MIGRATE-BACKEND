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
- **Gerenciamento de Ordens**: Receber e acompanhar o status de todas as ordens emitidas pelos usuários.
- **Envio de notificações**: Enviar notificações aos usuários sobre o status das compras e atualizações de produtos.

---

## Regras de Negócio

- Apenas **usuários autenticados** podem adicionar produtos ao carrinho e realizar compras.
- **Usuários não autenticados** podem visualizar e buscar produtos.
- Apenas **administradores** podem gerenciar produtos, usuários e ordens.
- Ao fechar uma compra, o status do carrinho é alterado para "fechado" e um novo carrinho com status "ativo" é criado automaticamente.
- O carrinho não pode ser modificado após a emissão de uma ordem.

---

## Requisitos Não Funcionais

- **Segurança**: A API deve garantir a segurança dos dados dos usuários, implementando autenticação e autorização.
- **Escalabilidade**: O sistema deve ser escalável para suportar um aumento no número de usuários e ordens.
- **Desempenho**: O tempo de resposta da API deve ser otimizado, especialmente para grandes volumes de produtos e ordens.
- **Manutenibilidade**: O código deve ser modular e seguir boas práticas para facilitar a manutenção futura.

---

## Endpoints

### Usuários

- **POST /users/signup** - Cadastro de novos usuários
- **POST /users/login** - Login de usuários
- **POST /users/logout** - Logout de usuários
- **GET /users/orders** - Visualizar todas as ordens do usuário autenticado

### Produtos

- **GET /products** - Listar todos os produtos
- **GET /products/:id** - Buscar detalhes de um produto específico
- **POST /cart** - Adicionar produto ao carrinho
- **POST /orders** - Emitir ordem de compra

### Administradores

- **POST /admin/products** - Criar novo produto
- **PUT /admin/products/:id** - Atualizar detalhes de um produto
- **DELETE /admin/products/:id** - Remover produto
- **GET /admin/orders** - Visualizar todas as ordens emitidas
- **POST /admin/notifications** - Enviar notificações para os usuários

---

## Tecnologias Utilizadas

- **Node.js** com **Express** para construção do backend.
- **MongoDB** para persistência de dados.
- **JWT** para autenticação e controle de acesso.
- **Docker** para containerização da aplicação.

---

## Próximas Funcionalidades

- **Cálculo de prazo de entrega**: Permitir que os usuários calculem o prazo de entrega com base em sua localização e o serviço de entrega selecionado.
- **Integração com serviços de pagamento**: Implementar integração com gateways de pagamento.

---

## Instalação e Uso

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
