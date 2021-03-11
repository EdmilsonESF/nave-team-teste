# Desafio de back-end

## Iniciando API

- Após clonar o repositório, instale as dependências com `yarn` ou `npm i`.

- Para criar a base de dados, execute: `yarn typeorm migration:run` ou `npm run typeorm migration:run`.

- Inicie a API com `yarn dev:server` ou `npm run dev:server`. (A porta de execução será: 3333)

- Workspace do Insominia pode ser baixado neste [link](https://doc-14-2s-docs.googleusercontent.com/docs/securesc/29otrubh7vk12j6udstqounv8mea28cc/m5ca3ubk1ke5nm1kouoqp4vsvh87pruu/1615480350000/01698077691459988657/01698077691459988657/1eVHLoMbOWjEXF1Dj14Q2TG8rE1x_RuPA?e=download&authuser=0).
---
## Rotas
- ### /signup
  - Cria um usuário com nome, email e senha.
  - Retorno será um objeto com o usúario criado.
  ```json
    {
      "name": "fulano",
      "email": "fulano@teste.com",
      "user_id": 1,
      "created_at": "2021-03-11T16:18:43.000Z"
    }
- ### /login
  - O usuário poderá efetuar login com email e senha.
  - Retorna o usúario e um token JWT.
    ```json
    {
      "user": {
        "user_id": 1,
        "name": "teste",
        "email": "teste@teste.com",
        "created_at": "2021-03-06T21:30:30.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTU0MTUwMjYsImV4cCI6MTYxNTU4NzgyNiwic3ViIjoiMSJ9.Isvj5-7GeUOSL_XDKO4260dRIYbJo1ZfI2U-8zRprMY"
    }
- ### /navers

  (*Só pode ser acessada por usúarios com token JWT*)

  - /index
    - Filtra os navers por nome, cargo e tempo de empresa em anos, pode ser aplicado mais de um filtro.
    - Os filtros devem ser informado por query string.
    - Exemplos:

      `/index?name=Fulano`

      `/index?job_role=Desenvolvedor`

      `/index?companyTime=2`

      `/index?name=Fulano&job_role=Desenvolvedor&companyTime=2`

    - Retorna um array com os navers encontrados.
      ```json
      [
        {
          "id": 1,
          "name": "Fulano",
          "birthdate": "1999-05-15",
          "admission_date": "2020-06-12",
          "job_role": "Desenvolvedor"
        },
        {
          "id": 2,
          "name": "Ciclano",
          "birthdate": "1999-05-15",
          "admission_date": "2020-06-12",
          "job_role": "UX-UI"
        }
      ]

  - /show
    - Detalha um único naver através do seu id, que deve ser informado por query string.
    - Exemplo:

      `/show?id=1`

    - O retorno será um objeto.
      ```json
      {
        "naver_id": 1,
        "name": "Fulano",
        "birthdate": "05-14-1999",
        "admission_date": "12-03-2021",
        "job_role": "Desenvolvedor",
        "projects": [
          {
            "project_id": 3,
            "name": "Projeto bom"
          }
        ]
      }

  - /store
    - Cria um novo naver e retorna o mesmo.
    - Os dados para criação do naver deve ser passados pelo body da requisição.
    - Exemplo:
      ```json
      {
        "name": "Fulano",
        "birthdate": "1999-05-15",
        "admission_date": "12-03-2021",
        "job_role": "Desenvolvedor",
        "projects": [3]
      }

  - /update
    - Atualiza um naver.
    - Os dados para atualização do naver deve ser passados pelo body da requisição.
    - Exemplo:
      ```json
      {
        "name": "Fulano",
        "birthdate": "1999-05-15",
        "admission_date": "12-03-2021",
        "job_role": "Desenvolvedor",
        "projects": [2, 3]
      }

  - /delete
    - Deleta um único naver através do seu id, que deve ser informado por query string.
    - Exemplo:

    `/delete?id=1`

- ### /projects/

  (*Só pode ser acessada por usúarios com token JWT*)

  - /index
    - Filtra os projetos por nome.
    - O filtro devem ser informado por query string.
    - Exemplos:

      `/index?name=Projeto%20bom`

      - Retorna um array com os navers encontrados.
      ```json
      [
        {
          "project_id": 1,
          "name": "Projeto bom"
        },
        {
          "project_id": 2,
          "name": "Projeto muito bom"
        }
      ]

  - /show
    - Detalha um único projeto através do seu id, que deve ser informado por query string.
    - Exemplo:

      `/show?id=1`

    - O retorno será um objeto.
      ```json
      {
        "project_id": 1,
        "name": "Projeto Bom",
        "navers": [
          {
            "naver_id": 1,
            "name": "Fulano",
            "birthdate": "05-14-1997",
            "admission_date": "06-11-2020",
            "job_role": "Desenvolvedor"
          }
        ]
      }

  - /store
    - Cria um novo projeto e retorna o mesmo.
    - Os dados para criação do naver deve ser passados pelo body da requisição.
    - Exemplo:
      ```json
      {
        "name": "Projeto Bom",
        "navers": [1]
      }

  - /update
    - Atualiza um projeto.
    - Os dados para atualização do naver deve ser passados pelo body da requisição.
    - Exemplo:
      ```json
      {
        "name": "Projeto Bom",
        "navers": [3]
      }
  - /delete
    - Deleta um único projeto através do seu id, que deve ser informado por query string.
    - Exemplo:

    `/delete?id=1`


