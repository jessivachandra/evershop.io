describe('Login Story', () => {
    it('Login with Success Login', () => {
        cy.visit('https://katalon-demo-cura.herokuapp.com/')
        cy.get('#btn-make-appointment').click()
        cy.get('#txt-username').type('John Doe')
        cy.get('#txt-password').type('ThisIsNotAPassword')
        cy.get('#btn-login').click()
        cy.wait(3000)
    });

    it('Login with Failure Login', () => {
        cy.visit('https://katalon-demo-cura.herokuapp.com/')
        cy.get('#btn-make-appointment').click()
        cy.get('#txt-username').type('Jane Doe')
        cy.get('#txt-password').type('Katalon')
        cy.get('#btn-login').click()
        cy.wait(3000)
    });
})