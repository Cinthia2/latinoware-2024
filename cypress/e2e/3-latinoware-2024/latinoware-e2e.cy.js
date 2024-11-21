

beforeEach(() => {
      //Limpa os Cookies a cada teste feito
      cy.clearCookies();
      //Limpa os dados de cache a cada teste feito
      cy.clearLocalStorage();
      //Acessa o sistema LatinoWare 2024
      cy.visit('https://swge.latinoware.org/2024/login')
  })

  function gerarPalavrasAleatorias(quantidade, tamanhoMin = 3, tamanhoMax = 8) {
    const letras = "abcdefghijklmnopqrstuvwxyz";
    const palavras = [];
  
    for (let i = 0; i < quantidade; i++) {
      const tamanhoPalavra = Math.floor(Math.random() * (tamanhoMax - tamanhoMin + 1)) + tamanhoMin;
      let palavra = "";
      
      for (let j = 0; j < tamanhoPalavra; j++) {
        palavra += letras.charAt(Math.floor(Math.random() * letras.length));
 
      }
  
      palavras.push(palavra);
    }
  
    return palavras;
  }
  
  console.log(gerarPalavrasAleatorias(5)); // Gera 5 palavras aleatórias
describe('Testando Meus Feedbacks no LatinoWare2024', ()=>{

  it('Verificação da inserção de caracteres alfanuméricos, ou seja, verificar a não permissão de caracteres especiais no título', () => {
    const usuarios = require('../../../cypress.env.json');


    //Captura o elemento input através do nome email
    cy.get('[name="email"]')
    .should('be.visible')      // Verifica se o campo está visível
    .should('not.be.disabled')  // Verifica se o campo não está desativado
    .type(usuarios[0].email); // Digita o primeiro valor de senha do array de objetos em formato .json
    


    //Captura o elemento input através do nome password
    cy.get('[name="password"]')
    .should('be.visible')      // Verifica se o campo está visível
    .should('not.be.disabled')  // Verifica se o campo não está desativado
    .type(usuarios[0].senha,  { log: false} ); // Digita o primeiro valor de senha do array de objetos em formato .json e false para não apresentar a senha no log
   

    //Captura o elemento que contém a palavra 'entrar', no caso é um botão
    cy.contains('Entrar')
    .click()
    

    
    // Depois de logar, aguarda a sidebar (Barra de Menu lateral do sistema) carregar completamente
    cy.wait(3000)

    cy.contains('Feedback')
    .should('be.visible')
    .dblclick() 

  
    cy.contains('Meus Feedbacks')
    .should('be.visible', { timeout: 3000 })
    .click()

    cy.wait(100)
    cy.contains('Adicionar Feedback')
    .should('be.visible')
    .click()


    //Captura o elemento input através do nome email
    cy.get('[name="title"]')
    .should('be.visible')      // Verifica se o campo está visível
    .should('not.be.disabled')  // Verifica se o campo não está desativado
    .type("Olá galerinha do LatinoWare estou testando a validação para caracteres especias: Ol@ &u sou uma fr@$$e com caracteres &speciais!!!!");
     
   //Os Alfanuméricos não incluem: Esses caracteres não incluem espaços, símbolos ou caracteres especiais (como @, #, &, etc.). Portanto, uma string como "hello_world" ou "123!abc" não seria considerada estritamente alfanumérica.
  cy.contains('Novo Feedback').click()


    //Como é o id de fato do elemento: :rj:-helper-text
    //Como foi a recomendação do seletor gráfico do cypress cy.get('#\:rq\:-helper-text')
    //Como contornar caracteres especiais no id? Basta inserir duas barras invertidas a cada caractere especial
    //Ficando assim: cy.get('#\\:rj\\:-helper-text');
    cy.get('#\\:rj\\:-helper-text')
    .should('have.text', 'Digite apenas caracteres alfabéticos');

    cy.contains('Descrição do feedback...')
    .type("Teste de inserção de um feedback na Latinoware!!!")

  })

  it('Verificação de validação de campo vazio no título ao tentar salvar um feedback', () => {
    const usuarios = require('../../../cypress.env.json');


    //Captura o elemento input através do nome email
    cy.get('[name="email"]')
    .should('be.visible')      // Verifica se o campo está visível
    .should('not.be.disabled')  // Verifica se o campo não está desativado
    .type(usuarios[0].email, {delay: 0}) // Digita o primeiro valor de email do array de objetos em formato .json
    


    //Captura o elemento input através do nome password
    cy.get('[name="password"]')
    .should('be.visible')      // Verifica se o campo está visível
    .should('not.be.disabled')  // Verifica se o campo não está desativado
    .type(usuarios[0].senha,  { log: false, delay: 0} ) // Digita o primeiro valor de senha do array de objetos em formato .json e false para não apresentar a senha no log
  


    cy.contains('Entrar')
    .click()
    
    // Depois de logar, aguarda a sidebar (Barra de Menu lateral do sistema) carregar completamente
    cy.wait(3000)

    cy.contains('Feedback', { timeout: 20000 })
    .should('be.visible')
    .dblclick() 


    cy.contains('Meus Feedbacks', { timeout: 30000 })
    .should('be.visible')
    .should('not.be.disabled') 
    .click()

    cy.contains('Adicionar Feedback')
    .should('be.visible')
    .click()


   
    cy.get('[name="title"]')
    .should('be.visible')      // Verifica se o campo está visível
    .should('not.be.disabled')  // Verifica se o campo não está desativado
    .type('Olá sou um texto que será apagado para simular um teste de campo vazio', {delay:100})
    .clear()

 
    cy.contains('Descrição do feedback...')
    .type("Tentativa de salvar um feedback com campo de título vazio!")
   
 
    cy.contains('Salvar')
    .should('be.visible')
    .click()


    

  
  })


})

