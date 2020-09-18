//import { TeacherData } from './teacherData.po';

describe('fazendo cadastro de um professor e a busca no sistema por esse professor - sucesso', () => {
//    let teacherData;

//    beforeEach(() => {
//        teacherData = new TeacherData();
//    });

    it('deve entrar na homepage', () => {
        browser
            .waitForAngularEnabled(false);

        browser
            .get('');

        expect(browser.getTitle())
            .toEqual('Proffy');
    });

    it('deve entrar na aba "Dar aulas"', () => {
        element(by.linkText('Dar aulas'))
            .click();
    });

    it('deve cadastrar a professora "Loraine" para dar aulas de "História do Brasil"', function () {
        expect(element(by.className('header-content')).getText())
            .toContain('Que incrível que você quer dar aulas!');

        element(by.id('name'))
            .sendKeys('Loraine');

        element(by.id('avatar'))
            .sendKeys('https://avatars3.githubusercontent.com/u/60954622?s=460&u=9a84ce4661b8c23d675c6567262b6de026dd728c&v=4');

        element(by.id('whatsapp'))
            .sendKeys('17981017030');

        element(by.id('bio'))
            .sendKeys('Economista apaixonada por explicar as relações entre fatos históricos e fatos econômicos.');
        
        element(by.id('subject'))
            .sendKeys('História do Brasil');

        element(by.id('cost'))
            .sendKeys('120');

        element(by.id('week_day'))
            .sendKeys('Segunda-feira');

        element(by.id('from'))
            .sendKeys('12:00');

        element(by.id('to'))
            .sendKeys('18:00');

        element(by.buttonText('+ Novo horário'))
            .click();

        element(by.xpath('//form/fieldset[3]/div[2]/div[1]/select'))
            .sendKeys('Terça-feira');

        element(by.xpath('//form/fieldset[3]/div[2]/div[2]/input'))
            .sendKeys('08:00');

        element(by.xpath('//form/fieldset[3]/div[2]/div[3]/input'))
            .sendKeys('12:00');

        element(by.buttonText('Salvar cadastro'))
            .click();

        browser.switchTo().alert().accept()
    });

    it('deve entrar na aba "Estudar"', () => {
        element(by.linkText('Estudar'))
            .click();
    });

    it('deve fazer busca de aulas de "História do Brasil" ministradas pela professora "Loraine"', () => {
        expect(element(by.className('header-content')).getText())
            .toContain('Estes são os proffys disponíveis.');

        element(by.id('subject'))
            .sendKeys('História do Brasil');

        element(by.id('week_day'))
            .sendKeys('Segunda-feira');

        element(by.id('time'))
            .sendKeys('10:00');

        element(by.buttonText('Buscar'))
            .click();
    });
  });