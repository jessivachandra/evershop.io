import 'cypress-xpath';
var faker = require('faker');

describe('Sign Up Story', () => {
    it('Successful & Failure Sign Up', () => {
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
        // generate randomized fullname
        const fullname = faker.name.findName();
        // const lastName = faker.person.lastName();
        // const fullName = firstName + ' ' + lastName;

        cy.fixture('signup').then((data) => {
            data.forEach((userdata) => {
                // successful signup (email format & password format valid, and email not registered yet)
                if(userdata.SignupCase == 'PASS'){
                    cy.get('a[href="/account/login"]').click();
                    cy.xpath("//a[@class='text-interactive'][contains(.,'Create an account')]").click();
                    cy.get("input[placeholder='Full Name']").type(fullname);
                    cy.get("input[placeholder='Email']").type(email);
                    cy.get("input[placeholder='Password']").type(password);
                    cy.xpath("//button[@type='button']").click();
                    // cy.contains('SIGN UP').click()
                    // cy.contains('SIGN UP').click()
                    // cy.get("svg").click({ multiple: true });
                    cy.xpath("//a[@href='/account']//*[name()='svg']").click();
                    cy.xpath("//a[normalize-space()='Logout']").click();
                    cy.wait(1000)
                }
                // failure signup (email format invalid)
                else if(userdata.SignupCase == "Fail"){
                    if(userdata.ConditionCase == "InvalidFormatEmail"){
                        cy.visit('https://demo.evershop.io/') 
                        cy.wait(1000)
                        cy.get('a[href="/account/login"]').click();
                        cy.xpath("//a[@class='text-interactive'][contains(.,'Create an account')]").click();
                        cy.get("input[placeholder='Full Name']").type(fullname);
                        cy.get("input[placeholder='Email']").type(invalidemailformat);
                        cy.get("input[placeholder='Password']").type(password);
                        cy.xpath("//button[@type='button']").click();
                        cy.visit('https://demo.evershop.io/') 
                    }
                    // failure signup (email already exist)
                    else if(userdata.ConditionCase == "ExistingEmail"){
                        cy.get('a[href="/account/login"]').click();
                        cy.xpath("//a[@class='text-interactive'][contains(.,'Create an account')]").click();
                        cy.get("input[placeholder='Full Name']").type(fullname);
                        cy.get("input[placeholder='Email']").type(email);
                        cy.get("input[placeholder='Password']").type(password);
                        cy.xpath("//button[@type='button']").click();
                        cy.visit('https://demo.evershop.io/') 
                    } 
                    // failure signup (empty email and password field)
                    else if(userdata.ConditionCase == "EmptyFields"){
                        cy.get('a[href="/account/login"]').click();
                        cy.xpath("//a[@class='text-interactive'][contains(.,'Create an account')]").click();
                        cy.xpath("//button[@type='button']").click();
                        cy.visit('https://demo.evershop.io/') 
                    } 
                }
            });
        }); 
    });
})