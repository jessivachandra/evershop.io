import 'cypress-xpath';
var faker = require('faker');

describe('Login Story', () => {
    it('Successful & Failure Login', () => {
        cy.viewport(1366, 768)
        cy.visit('https://demo.evershop.io/') 
        // cy.xpath("//svg[contains(@xmlns,'http://www.w3.org/2000/svg')]").click();
        // cy.document().then((doc) => cy.wrap(doc.querySelector("svg")).click());

        // generate randomized email
        const email =faker.internet.email();
        // cy.writeFile('cypress/fixtures/saved_data_from_faker.json', { key: email });
        // generate randomized password
        const password =faker.internet.password();
        // cy.writeFile('cypress/fixtures/saved_data_from_faker.json', { key: password });
        // generate invalidemailformat from randomized email
        const invalidemailformat = email.slice(0, email.lastIndexOf('.com'));
        

        cy.fixture('login').then((data) => {
            data.forEach((userdata) => {
                // successful login (correct email & password, email format valid)
                if(userdata.LoginCase == 'PASS'){
                    cy.get('a[href="/account/login"]').click();
                    cy.get("input[placeholder='Email']").type(userdata.email);
                    cy.get("input[placeholder='Password']").type(userdata.password);
                    cy.get("button[type='submit']").click();
                    cy.xpath("//a[@href='/account']//*[name()='svg']").click();
                    cy.xpath("//a[normalize-space()='Logout']").click();
                    // cy.get("a[href='/account']").click();
                    // cy.get(".text-interactive").click();
                    // cy.contains('Logout').click()
                }
                
                else if(userdata.LoginCase == "Fail"){
                    // failure login (email/password incorrect or email not registered yet)
                    if(userdata.ConditionCase == "EmailOrPasswordIncorrect"){
                        cy.visit('https://demo.evershop.io/') 
                        cy.get('a[href="/account/login"]').click();
                        cy.get("input[placeholder='Email']").type(email);
                        cy.get("input[placeholder='Password']").type(password);
                        cy.get("button[type='submit']").click();
                        cy.visit('https://demo.evershop.io/') 
                    }
                    // failure login (invalid email format)
                    else if(userdata.ConditionCase == "InvalidFormatEmail"){
                        cy.visit('https://demo.evershop.io/') 
                        cy.get('a[href="/account/login"]').click();
                        cy.get("input[placeholder='Email']").type(invalidemailformat);
                        cy.get("input[placeholder='Password']").type(password);
                        cy.get("button[type='submit']").click();
                        cy.visit('https://demo.evershop.io/') 
                    }
                    // failure login (empty email and password fiel)
                    else if(userdata.ConditionCase == "EmptyFields"){
                        cy.visit('https://demo.evershop.io/') 
                        cy.get('a[href="/account/login"]').click();
                        cy.get("button[type='submit']").click();
                        cy.visit('https://demo.evershop.io/') 
                    }
                }
            });
        }); 
    });
})