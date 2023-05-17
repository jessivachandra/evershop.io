describe('Login Story', () => {
    it('Login with Success Login', () => {
        cy.viewport(1366, 768)
        cy.visit('https://katalon-demo-cura.herokuapp.com/')
        // cy.get('#btn-make-appointment').click()
        // cy.get('#txt-username').type('John Doe')
        // cy.get('#txt-password').type('ThisIsNotAPassword')
        // cy.get('#btn-login').click()
        // cy.wait(3000)
        
        cy.fixture('webcura').then((data) => {
            data.forEach((userdata) => {
                if(userdata.LoginCase == 'PASS'){
                    cy.get('#btn-make-appointment').click()
                    cy.get('#txt-username').type(userdata.username)
                    cy.get('#txt-password').type(userdata.password)
                    cy.get('#btn-login').click()
                    cy.wait(3000)
                    if(userdata.facility == "Tokyo"){
                        cy.get("#combo_facility").select("Tokyo CURA Healthcare Center")             
                    }
                    else if(userdata.facility == "Hongkong"){
                        cy.get("#combo_facility").select("Hongkong CURA Healthcare Center")
                    }
                    else if(userdata.facility == "Seoul"){
                        cy.get("#combo_facility").select("Seoul CURA Healthcare Center")
                    }
                    if(userdata.readmission == "yes"){
                        cy.get('#chk_hospotal_readmission').click()
                    }
                    else if(userdata.readmission == "no"){
                        cy.get('#chk_hospotal_readmission').uncheck()
                    }
                    if(userdata.healthcare == "Medicare"){
                        cy.get("#radio_program_medicare").click()
                    }
                    else if(userdata.healthcare == "Medicaid"){
                        cy.get("#radio_program_medicaid").click()
                    }
                    else if(userdata.healthcare == "None"){
                        cy.get("#radio_program_none").click()
                    }
                    cy.get('#txt_visit_date').type(userdata.visitdate)
                    cy.contains('Comment').click()
                    // cy.get("label[for='txt_comment']").click()
                    cy.get('#txt_comment').type(userdata.comment)

                    cy.get('#btn-book-appointment').click()
                    cy.get('.fa.fa-bars').click()
                    cy.contains('Logout').click()
                }
                else if(userdata.LoginCase == 'Fail'){
                    cy.get('#btn-make-appointment').click()
                    cy.get('#txt-username').type(userdata.username)
                    cy.get('#txt-password').type(userdata.password)
                    cy.get('#btn-login').click()
                    cy.wait(3000)
                }
            });
          });  
    });
})