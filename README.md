# BrownieAPI

API REST para gerenciamento de usuários, autenticação, transações e controle de sabores de brownies.

## Índice

- [Tecnologias](#tecnologias)
- [Como rodar](#como-rodar)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Rotas principais](#rotas-principais)
  - [Usuários](#usuários)
  - [Autenticação](#autenticação)
  - [Transações](#transações)
  - [Brownies](#brownies)
  - [Admin](#admin)
- [Middlewares](#middlewares)
- [Exemplos de uso](#exemplos-de-uso)

---

## Tecnologias

- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- JWT (JSON Web Token)
- Bcrypt

---

## Como rodar

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/LimaEmanuel085/BrownieHub.git
   cd BrownieHub
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com:
   ```
   MONGODB_URI=seu_mongodb_atlas_uri
   SECRET_KEY=sua_secret_jwt
   ADMIN_KEY=sua_chave_admin
   ```

4. **Inicie o servidor:**
   ```sh
   npm start
   ```
   O servidor rodará em `http://localhost:3000` (ou porta definida).

---

## Variáveis de ambiente

- `MONGODB_URI`: String de conexão do MongoDB Atlas.
- `SECRET_KEY`: Chave secreta para JWT.
- `ADMIN_KEY`: Chave secreta para rotas de administrador.

---

## Rotas principais

### Usuários

- **Registrar usuário**
  - `POST /register`
  - Body: `{ "userName": "...", "userEmail": "...", "userPassword": "...", "confirmedPassword": "..." }`

- **Deletar usuário**
  - `DELETE /user`
  - Body: `{ "userEmail": "..." }`

- **Atualizar usuário**
  - `PUT /user`
  - Query: `?userEmail=...`
  - Body: `{ "newName": "...", "newPassword": "...", "confirmedPassword": "..." }`

- **Visualizar usuário**
  - `GET /user/:userEmail`

---

### Autenticação

- **Login**
  - `POST /login`
  - Body: `{ "userEmail": "...", "userPassword": "..." }`
  - Retorna: Token JWT

---

### Transações

- **Depositar saldo**
  - `POST /deposit`
  - Query: `?userEmail=...`
  - Body: `{ "valor": 100, "passwordUser": "..." }`

- **Transferir saldo**
  - `POST /transfer`
  - Query: `?userEmail=...`
  - Body: `{ "destinatario": "...", "valor": 50, "passwordUser": "..." }`

---

### Brownies

- **Listar brownies**
  - `GET /brownies`

- **Adicionar novo sabor**
  - `POST /brownie`
  - Body: `{ "flavor": "...", "quantity": 10 }`

- **Adicionar quantidade a um sabor existente**
  - `PATCH /brownie/add`
  - Body: `{ "flavor": "...", "quantity": 5 }`

- **Atualizar quantidade de um sabor**
  - `PUT /brownie`
  - Body: `{ "flavor": "...", "quantity": 20 }`

- **Deletar sabor**
  - `DELETE /brownie`
  - Body: `{ "flavor": "..." }`

---

### Admin

- **Listar todos os usuários**
  - `GET /users`
  - Header: `x-admin-key: SUA_CHAVE_ADMIN`

---

## Middlewares

- **JWT:** Protege rotas que exigem autenticação.
- **AdminVerify:** Protege rotas administrativas, exige header `x-admin-key`.

---

## Exemplos de uso

### Requisição autenticada

Envie o token JWT no header:
```
Authorization: Bearer SEU_TOKEN_JWT
```

### Requisição admin

Envie a chave admin no header:
```
x-admin-key: SUA_CHAVE_ADMIN
```

---

## Observações

- Não envie senhas ou chaves sensíveis pela URL.
- Sempre proteja rotas sensíveis com os middlewares adequados.
- O campo `email` do usuário é único no banco.

---

## Licença

MIT
