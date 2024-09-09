# Gerenciador de Tarefas

## Descrição
Este é um gerenciador de tarefas simples que permite aos usuários criar, editar e gerenciar suas tarefas. O projeto foi desenvolvido com React no front-end e NestJS no back-end.

## Tecnologias Utilizadas

### Front-end:
- React
- TypeScript
- SCSS
- Axios (para chamadas à API)

### Back-end:
- NestJS
- TypeScript
- MySQL
- TypeORM

## Funcionalidades
- **Página de Login**: Permite ao usuário autenticar-se e acessar o sistema.
- **Criação de Tarefas**: Usuários podem adicionar novas tarefas com título, descrição, status e data de expiração.
- **Gerenciamento de Tarefas**: Visualizar e editar tarefas existentes.
- **Status das Tarefas**: Tarefas podem ter os status TO_DO (Listada para começar), IN_PROGRESS (Em progresso) e DONE (Terminada).
- **Autenticação**: Utiliza JWT para autenticação e autorização.

## Instalação

### Pré-requisitos
- Node.js
- MySQL

### Configuração do Projeto
1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. Instale as dependências do front-end:
    Navegue até a pasta do front e execute:
    ```bash
    cd front
    npm install
    ```

3. Instale as dependências do back-end:
    Navegue até a pasta do BackEnd e execute:
    ```bash
    cd ../BackEnd
    npm install
    ```

4. Configure o banco de dados:
    - Crie um banco de dados MySQL para o projeto.
    - Crie o arquivo `.env` dentro da pasta do BackEnd com as seguintes variáveis:
        ```plaintext
        DB_HOST=localhost
        DB_PORT=3306
        DB_USERNAME=seu_usuario
        DB_PASSWORD=sua_senha
        DB_DATABASE=nome_do_banco_de_dados
        JWT_SECRET=sua_chave_secreta
        JWT_EXPIRATION_TIME=3600
        ```

5. Execute as migrações e inicie o back-end:
    ```bash
        npm run start
    ```

6. Inicie o front-end:
    ```bash
    cd ../front
    npm start
    ```

## Uso
1. Acesse a aplicação web através de seu navegador em `http://localhost:4000`.
2. Na página Home, você encontrará um resumo sobre como criar um usuário e uma tarefa.
3. Na página de login, insira suas credenciais para acessar o sistema.
4. Após o login, você poderá criar novas tarefas, visualizar e editar tarefas existentes, e gerenciar o status das tarefas.

