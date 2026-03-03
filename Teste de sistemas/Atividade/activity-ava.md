# PARTE 1: Trabalhando com toThrow e try/catch

## Título da Atividade
Criação de API REST com Node.js, Express e Arquitetura em Camadas (ESM)

## Objetivo
Criar uma API simples em Node.js utilizando o framework Express, aplicando separação de responsabilidades e utilizando ECMAScript Modules (ESM).

---

## Instruções da Entrega

### 1. Configuração Inicial

```bash
npm init -y
npm install express
```

No package.json:

```json
"type": "module",
"start": "node src/server.js"
```

---

### 2. Estrutura do Projeto

```
meu-projeto/
├── package.json
└── src/
    ├── app.js
    ├── server.js
    └── userService.js
```

---

### 3. Regra de Negócio (userService.js)

Função exportada: createUser(userData)

Validações obrigatórias:

Se não existir propriedade name:
throw new Error("O nome do usuário é obrigatório.")

Se age < 18:
throw new Error("O usuário deve ser maior de idade.")

Retorno esperado:

{
  id: gerado_aleatoriamente,
  name: string,
  age: number,
  isActive: true,
  roles: ['user']
}

---

### 4. Express (app.js)

- app.use(express.json())
- Criar rota POST /users
- Retornar 201 em sucesso
- Retornar 400 em erro com:
{ "error": error.message }

---

### 5. Servidor (server.js)

Servidor rodando na porta 3000.

---

# PARTE 2: Documentação

## ENTREGA 01 — Requisitos Funcionais

| ID     | Requisito           | Descrição                                                                 |
|--------|--------------------|---------------------------------------------------------------------------|
| RF-01  | Criar usuário | O sistema deve permiitir a criação de usuários com nome e idade válidos. |
| RF-02  | Validação de nome obrigatório | O sistema não deve permitir a criação de usuários sem prencher o campo nome. |
| RF-03  | Validação de maioridade | O sistema não deve permitir a criação de usuário menores de 18 anos. |

---

# ENTREGA 08 — Descritivo de Casos de Teste

## 8.1 Casos de Teste

| ID Caso | ID Requisito | Descrição                                              | Precondição                  | Passos                                                                 | Resultado Esperado                                                                 |
|---------|-------------|--------------------------------------------------------|------------------------------|------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| CT-01   | RF-01      | Criar usuário com dados válidos | Ter dados válidos (name e age >= 18) | 1.Chamar createUser({name:"Isaac", age: 20}) | Retorna objeto com id, name, age, isActive = true, roles["user"] |
| CT-02   | RF-02      | Usuário sem nome | Nenhum | 1.Chamar createUser({age: 20}) | Lança erro: "O nome do usuário é obrigatório." |
| CT-03   | RF-03      | Usuário menor de idade | Nome preenchido | 1.Chamar createUser({name:"Ana", age:20}) | Lança erro: "O usuaário deve ser maior de idade." |

---

## 8.2 Ferramentas e Ambiente

Ferramentas:
- [Node.js]
- [Jest]
- [Express]

Ambiente:
- [Node.js 20.x]
- [API rodando na porta 3000]
- [Terminal do VS Code]

---

## Observações

- Testes unitários focados em userService
- Cobertura de sucesso e exceções
- Uso de toBe e toEqual
