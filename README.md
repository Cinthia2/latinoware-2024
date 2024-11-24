
# Exemplos de testes automatizados com Cypress

Projeto para a Apresentação da Palestra Do Zero ao QA: Começando sua Jornada em Qualidade de Software.

### Teste automatizado para testar a insterface (e2e)
Arquivo `latinoware-e2e.cy.js`
### Teste automatizado para testar a API (Application Programming Interface)
Arquivo `latinoware-api-fake.cy.js`

## 1° Passo: Instalação do Node.js 
Instalação do Node.js (é uma plataforma de execução de código JavaScript no lado do servidor).


#### 🔗 Disponível em: https://nodejs.org/pt-br/

## 2° Passo: Instalação do editor de código-fonte VSCode
O Visual Studio Code (VSCode) é um editor de código-fonte desenvolvido pela Microsoft, lançado em 2015, que se tornou uma das ferramentas mais populares entre desenvolvedores. 

#### 🔗 Disponível em: https://code.visualstudio.com/download



## 3º Passo: Inicialização do projeto no VSCode

Verificar se a instalação deu certo e quais são as versões correspondentes do Node.js e do gerenciador de depêndencias NPM (Node Package Manager).

Na pasta do projeto dentro do terminal do VSCode digite:
```bash
node -v
npm -v
```
Em seguida digite:

```bash
npm init
```
Após isso, responda as perguntas que irão ser gravadas no arquivo gerado package.json:
- package-name: (primeiro-projeto)<enter>
- version: 1.0.0 <enter>
- description: Primeiro projeto com Cypress
- entry point: (index.js) <enter>
- test command: npx cypress open <enter>
- git repository: <enter>
- keywords: <enter>
- author: Cinthia Rodrigues da Silva <enter>
- license: (ISC) <enter>
- Is this OK? <enter>


Em seguida, instale o framework Cypress:

```bash
npm install cypress --save-dev
```

## 4° Passo: Abrindo a interface do Cypress
Digite o comando direto:
```bash
npx cypress open
```
Ou digite o comando que foi configurado na chave `test` dentro do package.json, para executar a abertura do Cypress. 
```bash
npm run test
```
Após isso, permita a abertura da aplicação em sua máquina. 

- Selecione a opção `E2E Testing`.
- Clique em `Continue`
- Selecione o navegador de sua preferência: `Chrome`, `Edge` ou `Electron`.

#### 🔗 Para mais informações sobre o Cypress, acesse a documentação: https://www.cypress.io/


## 5º Passo: Gerando Relatórios com Mochawesome

### 5.1. Instalação do Mochawesome

Para gerar relatórios com o Mochawesome, instale-o no projeto:

```
npm i -D mochawesome
```

### 5.2. Configurando o Mochawesome

No arquivo `cypress.config.js`, adicione a seguinte configuração:

```js
reporterOptions: {
       reportDir: "cypress/report/mochawesome-report",
       overwrite : false,
       json : false,
       html : true,
       timestamp: 'dd-mm-yyyy',
       reportFilename: '[name]_data_do__teste_[datetime]'+ '_' + data.getHours() + 'h'+
       data.getMinutes() + 'm' + '_Status_[status]',

   },


```

### 5.3. Gerando a pasta Report para armazenar os relatórios

Para criar a pasta `report` e gerar um relatório, digite:
``` 
npx cypress run --spec "cypress\e2e\3-latinoware-2024\latinoware-e2e.cy.js" --reporter mochawesome
```

Ou, caso deseje criar relatório com todos os testes basta utilizar o comando:

```
npx cypress run –-reporter mochawesome 
```

O relatório será gerado na pasta `cypress/e2e/report`.



## 6° Passo: Instalação do GIT no Windows 
O Git é um sistema de controle de versão distribuído, criado por Linus Torvalds em 2005, que permite a desenvolvedores gerenciar e acompanhar o histórico de mudanças em código-fonte ou qualquer tipo de arquivo.

#### 🔗 Disponível em: https://git-scm.com/download/win 

## 🔗 Link Meu Contato

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cinthia-rodrigues-da-silva-68ba76105?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BhRiTFvW7RYuOviOaWfiLEA%3D%3D)

