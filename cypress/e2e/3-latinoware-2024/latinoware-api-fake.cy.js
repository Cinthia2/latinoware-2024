beforeEach(() => {
 //caso quisesse logar ou executar alguma instr
})

const data = new Date();
const semMilissegundos = data.toISOString().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }).slice(0, 19)
console.log(semMilissegundos)

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max - min) + min)
}

function geraTextoRandomica(texto){
    var num_random = getRandomInt(65,122);
    var caracter_random = String.fromCharCode(num_random)
    return texto+caracter_random+num_random
}

const id_palestrante =  {
    "id": 1
}
 //Função para cadastrar uma atividade, que estamos chamando de evento    
function criarEvento(name, date, location, id_palestrante) {
    return cy.request({
        method: 'POST',
        url: 'event/post',
        body: {
            "name": name,
            "date": date,
            "location": location,
            "orator": {
                "id": id_palestrante
            }
        }  
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).is.not.null;
        expect(response.body).to.eq("Evento criado com sucesso!");

   
    });

}
//Função para cadastrar um palestrante, que estamos chamando de evento 
function criarPalestrante(name, age, jobTitle, companyName) {
    return cy.request({
        method: 'POST',
        url: 'orator/post',
        body: {
                "name": name,
                "age": age,
                "jobTitle": jobTitle,
                "companyName": companyName
        }
        
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).is.not.null;
        expect(response.body).to.eq("Orador cadastrado com sucesso!");

    });

}
//Função para cadastrar um palestrante com dados inválido, gerando o Bad Resquest erro 400
function criarPalestranteInvalido(name, age, jobTitle, companyName, mensagemInvalidaEsperada) {
    return cy.request({
        method: 'POST',
        url: 'orator/post',
        body: {
                "name": name,
                "age": age,
                "jobTitle": jobTitle,
                "companyName": companyName
        },failOnStatusCode: false  
        
    }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).is.not.null;
        expect(response.body).to.eq(mensagemInvalidaEsperada);

    });

}

describe("Testes de API FAKE do latinoware na seção de enpoints de Atividades ", ()=>{
   
    //POST
    it("Verificação de inserção de uma atividade bem sucedida", ()=>{
        //Chamada da função que faz uma requisição para criar um evento que se refere a atividade do palestrante
        criarEvento(geraTextoRandomica("Atividade"), "2024-11-19T10:30:00", "Espaço_Brasil",1)
    })
    //Teste com requisições aninhadas afim de verificar criação de registro duplicado
    it("Verificação de inserção de uma atividade duplicada", ()=>{
        const nome_atividade = "Como e por que ter sua própria IA generativa"+getRandomInt(65,122);
        cy.request({
            method: 'POST',
            url: 'event/post',
            body: {
                "name": nome_atividade,
                "date": "2024-11-19T10:30:00",
                "location": "Espaço_Argentina",
                "register": semMilissegundos,
                "orator": id_palestrante,
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).is.not.null;
        
        }).request({
            method: 'POST',
            url: 'event/post',
            body: {
                "name": nome_atividade,
                "date": "2024-11-19T10:30:00",
                "location": "Espaço_Argentina",
                "register": semMilissegundos,
                "orator": id_palestrante,
    
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).is.not.null;
            expect(response.body).to.eq("Já existe um evento com o nome "+nome_atividade);
        });


    })

    it("Verificação de quantidade mínima de carteres para o nome da atividade", ()=>{
        cy.request({
            method: 'POST',
            url: 'event/post',
            body: {
                "name": "",
                "date": "2024-11-19T10:30:00",
                "location": "Espaço_Argentina",
                "orator": id_palestrante,
                "register": semMilissegundos
            },
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).is.not.null;
            expect(response.body).to.eq("No mínimo 3 e no máximo 50 caracteres.")
        });
        
    })

    it("Verificação de quantidade máxima de carteres para o nome da atividade", ()=>{
        cy.request({
            method: 'POST',
            url: 'event/post',
            body: {
                "name": "Do Zero ao QA Começando a sua jornada em QA-teste12"+geraTextoRandomica(),
                "date": "2024-11-19T10:30:00",
                "location": "Espaço_Argentina",
                "orator": id_palestrante,
                "register": semMilissegundos
            },
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).is.not.null;
            expect(response.body).to.eq("No mínimo 3 e no máximo 50 caracteres.")
        });
        
    })
    describe("Testes na listagem e busca para alteração de atividade ", ()=>{
        //GET
        it("Verificação da listagem de todas as atividades", ()=>{
        cy.request({
            method: 'GET',
            url: 'event/all',
            
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).is.not.null;


        });

        })

        it("Verificação da listagem de uma atividade específica", ()=>{
            cy.request({
                method: 'GET',
                url: 'event/id/1',
                
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).is.not.null;
                expect(response.body.id).to.eq(1);

            });
            
        })

        //PUT
        it("Verificação de alteração de uma atividade", ()=>{
            cy.request({
                method: 'PUT',
                url: 'event/put',
                body: { "id":1,
                    "name": "DO Zero ao QA Começando a sua jornada em QA",
                    "date": "2024-11-19T10:30:00",
                    "location": "Espaço_Argentina",
                    "orator": {
                      "id": 1
                  
                    },
                    "register": "2024-11-19T10:30:00"
                  }
                  
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).is.not.null;
                expect(response.body.name).to.eq("TESTE DE ALTERAÇÃO")

            });
            
        })

        //DELETE
        it("Verificação de deleção de uma atividade", ()=>{
        cy.request({
            method: 'DELETE',
            url: 'event/disable/12'
                
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).is.not.null;
            expect(response.body).includes("desativado com sucesso!")

        });

        })
    })
  
})


describe("Testes de API FAKE do latinoware na seção de enpoints de Palestrantes ", ()=>{
    const nome_palestrante = "Bruna "+getRandomInt(65,122);
    //POST
    it("Verificação de inserção de um palestrante bem sucedida", ()=>{
        criarPalestrante(geraTextoRandomica("Palestrante"), 24, "Espaço_Argentina", "Itaipu teste")
    })

    it("Verificação de inserção de um palestrante duplicado", ()=>{
     
        cy.request({
            method: 'POST',
            url: 'orator/post',
            body: {
                "name": nome_palestrante,
                "age": 27,
                "jobTitle": "Desenvolvedora",
                "companyName": "Itaipu"
        }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).is.not.null;
        
        }).request({
            method: 'POST',
            url: 'orator/post',
            body: {
                "name": nome_palestrante,
                "age": 27,
                "jobTitle": "Desenvolvedora",
                "companyName": "Itaipu"
        }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).is.not.null;
    
        });


    })

    it("Verificação de quantidade mínima de carteres para o nome do palestrante", ()=>{
        cy.request({
            method: 'POST',
            url: 'orator/post',
            body: {
                "name": "",
                "age":29 ,
                "jobTitle": "Quality Assurance",
                "companyName": "Itaipu Parquetec"
        },
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).is.not.null;
            expect(response.body).to.eq("No mínimo 3 e no máximo 40 caracteres.")
        });
        
    })

    it("Verificação de quantidade máxima de carteres para o nome do palestrante", ()=>{
        cy.request({
            method: 'POST',
            url: 'orator/post',
            body:  {
                "name": "Palestrante com nome grande e excede 40 caracteres",
                "age": 34,
                "jobTitle": "Desenvolvedor",
                "companyName": "Itaipu"
        },
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).is.not.null;
            expect(response.body).to.eq("No mínimo 3 e no máximo 40 caracteres.")
        });
        
    })
   
    it("Verificação de inserção de um palestrante sem o nome da empresa", ()=>{
    criarPalestranteInvalido(geraTextoRandomica("Palestrante"), 24, "Espaço_Argentina","", "Por favor, insira a empresa do Orador.")
    })

    it("Verificação de inserção sem o nome do palestrante", ()=>{
        criarPalestranteInvalido("", 24, "Espaço_Argentina","Itaipu teste", "Por favor, insira a empresa do Orador.")
    })

    it("Verificação de inserção sem preencher nenhum campo do cadastro de palestrante", ()=>{
        criarPalestranteInvalido("", "", "","", "Por favor, insira a empresa do Orador.")
    })

    describe("Testes na listagem e busca para alteração de palestrante ", ()=>{
        //GET
        it("Verificação da listagem de todas os palestrantes", ()=>{
        cy.request({
        method: 'GET',
        url: 'orator/all',

        }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).is.not.null;

        for (var i=0; i<response.body.length; i++) {
        console.log("teste"+response.body[i].id)
        }
        var tamanho = response.body.length
        var ultima_posicao = response.body[tamanho-1].id;

        console.log("ultimo"+response.body[tamanho-1].id)


        Cypress.env("ultimo-id",ultima_posicao)
        });

        })

        it("Verificação da listagem do último palestrante cadastrado", ()=>{
        cy.request({
        method: 'GET',
        url: 'orator/id/'+Cypress.env("ultimo-id"),

        }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).is.not.null;
        expect(response.body.id).to.eq(Cypress.env("ultimo-id"));

        });

        })

        //PUT
        it("Verificação de alteração dos dados do último palestrante cadastrado", ()=>{
        cy.request({
        method: 'PUT',
        url: 'orator/put/'+Cypress.env("ultimo-id"),
        body: {
            "name": "TESTE DE ALTERAÇÃO",
            "age": 25,
            "jobTitle": "Engenheiro de Software alteração",
            "companyName": "Itaipu Parquetec alteração"
        }
        }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).is.not.null;
        expect(response.body.name).to.eq("TESTE DE ALTERAÇÃO")

        });

        })

        //DELETE
        it("Verificação de deleção de um palestrante", ()=>{
        cy.request({
            method: 'DELETE',
            url: 'orator/disable/9'
                
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).is.not.null;
            expect(response.body).includes("desativado com sucesso!")

        });

        })
    })


    
})
