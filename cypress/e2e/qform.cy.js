const base_url = "http://localhost:3000/";

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

describe('qform spec', async () => {
  it('Verifying if QForm starts empty', () => {
    // Visiting
    cy.visit(base_url + "qform");

    // Setting
    cy.get('#txt_enunciado').as('txt_enunciado').should('be.empty');
    cy.get('.txt_alternativaA').as('txt_alternativaA').should('be.empty');
    cy.get('.txt_alternativaB').as('txt_alternativaB').should('be.empty');
    cy.get('.txt_alternativaC').as('txt_alternativaC').should('be.empty');
    cy.get('.txt_alternativaD').as('txt_alternativaD').should('be.empty');
    cy.get('.txt_alternativaE').as('txt_alternativaE').should('be.empty');
    cy.get('.select_assuntos').as('selectAssuntos').children().first().should('be.selected');
    cy.get('.select_disciplinas').as('selectDisciplinas').children().first().should('be.selected');
  })

  it('Verifying Cancel button', () => {
    // Visiting
    cy.visit(base_url + "qform");
    // Setting
    cy.get('#txt_enunciado').as('txt_enunciado').type('Enunciado')
    cy.get('.txt_alternativaA').as('txt_alternativaA').type("Alternativa A");
    cy.get('.txt_alternativaB').as('txt_alternativaB').type("Alternativa B");
    cy.get('.txt_alternativaC').as('txt_alternativaC').type("Alternativa C");
    cy.get('.txt_alternativaD').as('txt_alternativaD').type("Alternativa D");
    cy.get('.txt_alternativaE').as('txt_alternativaE').type("Alternativa E");
    cy.get('.select_disciplinas').as('selectDisciplinas')
      .children()
      .its('length')
      .then((length) => {
        expect(length).greaterThan(1);
        const n = randInt(1, length);
        console.log(n);
        cy.get('@selectDisciplinas').select(n);
      });
    
    cy.get('.select_assuntos').as('selectAssuntos');
    cy.wrap('@selectAssuntos', { timeout: 5000 });
    cy.get('@selectAssuntos')
      .children()
      .its('length')
      .then((length) => {
        expect(length).greaterThan(1);
        const n = randInt(1, length);
        console.log(n);
        cy.get('@selectAssuntos').select(n);
      });

    cy.get("#btnCancel").click();

    cy.get('@txt_enunciado').should('be.empty');
    cy.get('@txt_alternativaA').should('be.empty');
    cy.get('@txt_alternativaB').should('be.empty');
    cy.get('@txt_alternativaC').should('be.empty');
    cy.get('@txt_alternativaD').should('be.empty');
    cy.get('@txt_alternativaE').should('be.empty');
    cy.get('.select_assuntos').as('selectAssuntos').children().first().should('be.selected');
    cy.get('.select_disciplinas').as('selectDisciplinas').children().first().should('be.selected');
  });

  it('Verifying if generate is working', () => {
    // Visiting
    cy.visit(base_url + "qform");

    // Testing 10 times
    for (let i = 0; i < 20; i++) {

      cy.get('#btnCancel').click();

      cy.get('.select_disciplinas').as('selectDisciplinas')
        .children()
        .its('length')
        .then((length) => {
          expect(length).greaterThan(1);
          const n = randInt(1, length);
          console.log(n);
          cy.get('@selectDisciplinas').select(n);
        });
      
      cy.get('.select_assuntos').as('selectAssuntos');
  
      cy.wrap('@selectAssuntos', { timeout: 5000 });
      cy.get('@selectAssuntos')
        .children()
        .its('length')
        .then((length) => {
          expect(length).greaterThan(1);
          const n = randInt(1, length);
          console.log(n);
          cy.get('@selectAssuntos').select(n);
        });
  
      cy.get('#btnGenerate').as('btnGenerate');
      cy.get('@btnGenerate').click();
  
      cy.get('#txt_enunciado').as('txtEnunciado');
  
      cy.wrap('@txtEnunciado', { timeout: 10000 }).should('not.be.empty');
      cy.get('.txt_alternativaA').as('txt_alternativaA');
      cy.get('.txt_alternativaB').as('txt_alternativaB');
      cy.get('.txt_alternativaC').as('txt_alternativaC');
      cy.get('.txt_alternativaD').as('txt_alternativaD');
      cy.get('.txt_alternativaE').as('txt_alternativaE');

      cy.wrap('@txt_alternativaA', { timeout: 10000 }).should('not.be.empty');
      cy.wrap('@txt_alternativaB', { timeout: 10000 }).should('not.be.empty');
      cy.wrap('@txt_alternativaC', { timeout: 10000 }).should('not.be.empty');
      cy.wrap('@txt_alternativaD', { timeout: 10000 }).should('not.be.empty');
      cy.wrap('@txt_alternativaE', { timeout: 10000 }).should('not.be.empty');

      // cy.get('#btnCancel').click();
    }
  });

    
  it('Verifying if is possible generate with some select set to null', () => {
    // Visiting
    cy.visit(base_url + "qform");

    // Testing
    cy.get("#btnCancel").as('btnCancel').click();
    cy.get('.select_disciplinas').as('select_disciplinas').select(2);
    cy.get('.select_assuntos').as('select_assuntos').select(4);

    cy.get('@select_disciplinas').select(0);
    cy.get('#btnGenerate').as('btnGenerate').click().then(() => {
      cy.on('window:alert', (msg) => {
        expect(msg).to.equal('Não foi possível gerar a questão. Por favor, selecione uma disciplina e um assunto corretamente.');
      });
    });
  });

  it('Testing submit button', () => {
    cy.visit(base_url + "qform");

    cy.get('#txt_enunciado').type("Testing if statement saves correctly");
    cy.get('.txt_alternativaA').type("Testing if alternative A is working");
    cy.get('.txt_alternativaB').type("Testing if alternative B is working");
    cy.get('.txt_alternativaC').type("Testing if alternative C is working");
    cy.get('.txt_alternativaD').type("Testing if alternative D is working");
    cy.get('.txt_alternativaE').type("Testing if alternative E is working");

    cy.get('.select_disciplinas').as('selectDisciplinas')
      .children()
      .its('length')
      .then((length) => {
        expect(length).greaterThan(1);
        const n = randInt(1, length);
        console.log(n);
        cy.get('@selectDisciplinas').select(n);
      });
    
    cy.get('.select_assuntos').as('selectAssuntos');
    cy.wrap('@selectAssuntos', { timeout: 5000 });
    cy.get('@selectAssuntos')
      .children()
      .its('length')
      .then((length) => {
        expect(length).greaterThan(1);
        const n = randInt(1, length);
        console.log(n);
        cy.get('@selectAssuntos').select(n);
      });

    cy.get('#btnSubmit').click();

    cy.url().should('equal', base_url + 'questoes');

    cy.get('#q-wrapper').children().last().contains('Testing if statement saves correctly');
  });
});