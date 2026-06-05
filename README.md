# deppi-extension-api

API backend construída com Node.js, TypeScript, Express e PostgreSQL.

---

## 🛠️ Tecnologias

- **[Node.js](https://nodejs.org/)** + **[TypeScript](https://www.typescriptlang.org/)** — linguagem e runtime
- **[Express 5](https://expressjs.com/)** — framework HTTP
- **[Prisma](https://www.prisma.io/)** — ORM com suporte a migrations e type-safety
- **[PostgreSQL](https://www.postgresql.org/)** — banco de dados relacional
- **[Zod](https://zod.dev/)** — validação de dados e schemas
- **[JWT](https://jwt.io/)** — autenticação via tokens
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** — hash de senhas
- **[Docker](https://www.docker.com/)** — ambiente de banco de dados em container

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) e Docker Compose

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/DiegoDMatos/deppi-extension-api.git
cd deppi-extension-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no exemplo abaixo:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE"
JWT_SECRET="sua_chave_aqui"
PORT=3333
```

### 4. Suba o banco de dados com Docker

```bash
docker compose up -d
```

### 5. Execute as migrations do Prisma

```bash
npm prisma generate
```

### 6. Inicie o servidor em modo de desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

---

## 📁 Estrutura do Projeto

```
deppi-extension-api/
├── src/                  # Código-fonte principal
├── prisma/               # Schema e migrations do banco de dados
├── generated/prisma/     # Cliente Prisma gerado automaticamente
├── docker-compose.yml    # Configuração do banco via Docker
├── prisma.config.ts      # Configuração do Prisma
├── tsconfig.json         # Configuração do TypeScript
└── package.json
```

---

## 🗄️ Banco de Dados

O projeto utiliza **PostgreSQL 15** via Docker. As credenciais padrão para desenvolvimento estão definidas no `docker-compose.yml`:

| Campo    | Valor                    |
|----------|--------------------------|
| Host     | `localhost`              |
| Porta    | `5432`                   |
| Banco    | `deppi_extension_db`     |
| Usuário  | `deppi_extension_user`   |
| Senha    | `deppi_extension_password` |

Para visualizar o banco de dados com a interface do Prisma:

```bash
npx prisma studio
```

---

## 📜 Scripts disponíveis

| Comando       | Descrição                                      |
|---------------|------------------------------------------------|
| `npm run dev` | Inicia o servidor com hot reload via `tsx watch` |

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação. Endpoints protegidos exigem o token no header da requisição:

```
Authorization: Bearer <seu_token>
```

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
