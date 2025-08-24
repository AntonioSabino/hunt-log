# Hunt Log — API (NestJS + Prisma + Swagger)

Backend para registrar e consultar **armas**, **spots de hunt** e **logs** de hunts do Tibia, substituindo planilhas por uma API organizada e versionada.  
Arquitetura com **NestJS**, **Prisma (PostgreSQL)**, **Swagger** e **Repository Pattern**.

## ✨ Principais recursos (MVP)

- CRUD de **Weapons**.
- **Swagger UI** em `/docs` com DTOs e exemplos.
- **Repository Pattern**.
- Validação e serialização com **class-validator / class-transformer**.
- Migrations e client com **Prisma**.

> Próximos módulos (roadmap): `HuntSpots`, `HuntRecommendations`, `HuntSessions`, `Calc (DamageCalculator)`.

## 🧰 Stack

- **Node.js 20+**, **NestJS 10+**
- **Prisma 5+**, **PostgreSQL**
- **class-validator**, **@nestjs/swagger**
- **helmet**, **cors**

## ⚙️ Requisitos

- Node 20+
- npm
- Docker (opcional para rodar o Postgres)

## 🚀 Início rápido

1. **Clonar** e entrar no projeto:

```bash
git clone github.com/AntonioSabino/hunt-log.git
cd hunt-log
```

2. **Instalar dependências**:

```bash
npm i
```

3. **Subir o Postgres** (opcional via Docker):

```bash
docker compose up -d
```

4. **Variáveis de ambiente**: crie `.env` a partir de `.env.example`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hunt_log?schema=public"
PORT=3000
```

5. **Prisma (schema e migrations)**:

```bash
npm run prisma:generate
npm run prisma:migrate
```

6. **Rodar em desenvolvimento**:

```bash
npm run start:dev
# Swagger: http://localhost:3000/docs
```

## 📚 Endpoints (Weapons)

### Criar arma

`POST /api/v1/weapons`

```json
{
  "name": "Spike Sword",
  "type": "Sword",
  "levelReq": 0,
  "atk": 24,
  "atkElemental": 0,
  "hands": "One",
  "imbuementSlots": 2
}
```

### Listar armas

`GET /api/v1/weapons`  
Filtros: `q`, `type`

### Detalhar arma

`GET /api/v1/weapons/:id`

### Atualizar arma

`PUT /api/v1/weapons/:id`

```json
{ "atk": 26 }
```

### Remover arma

`DELETE /api/v1/weapons/:id`

## 🧪 Exemplos (cURL)

```bash
# Criar arma
curl -X POST http://localhost:3000/api/v1/weapons -H "Content-Type: application/json" -d '{
  "name": "Spike Sword",
  "type": "Sword",
  "levelReq": 0,
  "atk": 24,
  "atkElemental": 0,
  "hands": "one-handed",
  "imbuementSlots": 2
}'

# Listar armas
curl -X GET http://localhost:3000/api/v1/weapons

# Detalhar arma
curl -X GET http://localhost:3000/api/v1/weapons/<id>

# Atualizar arma
curl -X PUT http://localhost:3000/api/v1/weapons/<id> -H "Content-Type: application/json" -d '{
  "atk": 26
}'

# Remover arma
curl -X DELETE http://localhost:3000/api/v1/weapons/<id>
```

## 📄 Licença

MIT
