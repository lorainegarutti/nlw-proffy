/// <reference types="Cypress" />
/// <reference path="../support/commands.js" />

const sizes = [[1920, 1080], 'samsung-s10'];

describe('fazendo cadastro de um professor e a busca no sistema por esse professor - sucesso', () => {

    sizes.forEach((size) => {

        context(`em tela ${size}`, () => {

            beforeEach(() => {
                cy.configuraViewport(size);
                cy.fixture('teachers.json').as('teachers');
            });

            it('entrando na home', () => {
                cy.visit('http://localhost:3000');
                cy.contains('sua plataforma de estudos online')
            });

            it('entrando na aba "Dar aulas"', () => {
                cy.contains('dar aulas')
                    .click({ force: true });
            });

            it('cadastrando a professora "Loraine" para dar aulas de "História do Brasil"', function () {
                const teacher1 = this.teachers.teacher1;

                cy.contains('que incrível que você quer dar aulas!')
                cy.get('#name')
                    .clear({ force: true })
                    .type(teacher1.name, { force: true })
                    .should('have.value', teacher1.name)

                cy.get('#avatar')
                    .clear({ force: true })
                    .type(teacher1.avatar, { force: true })
                    .should('have.value', teacher1.avatar);

                cy.get('#whatsapp')
                    .clear({ force: true })
                    .type(teacher1.whatsapp)
                    .should('have.value', teacher1.whatsapp);

                cy.get('#bio')
                    .clear({ force: true })
                    .type(teacher1.bio)
                    .should('have.value', teacher1.bio);

                cy.get('#subject')
                    .select(teacher1.subject)
                    .should('have.value', teacher1.subject);

                cy.get('#cost')
                    .clear({ force: true })
                    .type(teacher1.cost, { force: true })
                    .should('have.value', teacher1.cost);

                cy.get('#week_day')
                    .select(teacher1.firstDay);

                cy.get('#week_day')
                    .should('have.value', teacher1.firstDayValue);

                cy.get('#from')
                    .type(teacher1.startFirstDay)
                    .should('have.value', teacher1.startFirstDay);

                cy.get('#to')
                    .type(teacher1.finishFirstDay)
                    .should('have.value', teacher1.finishFirstDay);

                cy.contains('+ Novo horário')
                    .click({ force: true });

                cy.get(':nth-child(3) > .select-block > #week_day')
                    .select(teacher1.secondDay);

                cy.get(':nth-child(3) > .select-block > #week_day')
                    .should('have.value', teacher1.secondDayValue);

                cy.get(':nth-child(3) > :nth-child(2) > #from')
                    .type(teacher1.startSecondDay)
                    .should('have.value', teacher1.startSecondDay);

                cy.get(':nth-child(3) > :nth-child(3) > #to')
                    .type(teacher1.finishSecondDay)
                    .should('have.value', teacher1.finishSecondDay);

                cy.contains('salvar cadastro')
                    .click({ force: true });
            });

            it('entrando na aba "Estudar"', () => {
                cy.contains('estudar')
                    .click({ force: true });
            });

            it('fazendo busca de aulas de "História do Brasil" ministradas pela professora "Loraine"', function () {
                const teacher1 = this.teachers.teacher1;

                cy.contains('estes são os proffys disponíveis');                    
                cy.get('#subject')
                    .select(teacher1.subject)
                    .should('have.value', teacher1.subject);

                cy.get('#week_day')
                    .select(teacher1.secondDay)
                    .should('have.value', teacher1.secondDayValue);

                cy.get('#time')
                    .type('15:00')
                    .should('have.value', '15:00');

                cy.contains('buscar')
                    .click({ force: true });

                cy.contains(teacher1.name)
            });

            it('entrando em contato com "Loraine" para agendar uma aula', () => {
                cy.contains('entrar em contato')
                    .click({ force: true });
            });

            it('acompanhando conexão que foi criada', () => {
                cy.request('http://localhost:3333/connections')
                    .as('connections')

                cy.get('@connections')
                    .should( (response) => {
                        expect(response.body).to.have.property('total');
                        expect(response.status).to.eq(200);
                    });
            });
        });
    });

});