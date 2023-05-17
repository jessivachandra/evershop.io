describe('Login Story', () => {
    it('Login with Success & Failure Login', () => {
        cy.viewport(1366, 768)
        cy.visit('https://katalon-demo-cura.herokuapp.com/')
    
        cy.fixture('identify').then((data) => {
            data.forEach((userdata) => {
                if(userdata.LoginCase == 'PASS'){
                    cy.get('#btn-make-appointment').click()
                    cy.get('#txt-username').type(userdata.username)
                    cy.get('#txt-password').type(userdata.password)
                    cy.get('#btn-login').click()
                    cy.wait(3000)
                    cy.get('.fa.fa-bars').click()
                    cy.contains('Logout').click()
                }
                else if(userdata.LoginCase == "Fail"){
                    cy.get('#btn-make-appointment').click()
                    cy.get('#txt-username').type(userdata.username)
                    cy.get('#txt-password').type(userdata.password)
                    cy.get('#btn-login').click()
                }
            })
          })  
        });
});
