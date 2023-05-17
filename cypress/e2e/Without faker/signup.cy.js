import 'cypress-xpath';

describe('Sign Up Story', () => {
    it('Successful & Failure Sign Up', () => {
        cy.viewport(1366, 768)
        cy.visit('https://demo.evershop.io/') 
        // cy.xpath("//svg[contains(@xmlns,'http://www.w3.org/2000/svg')]").click();
        // cy.document().then((doc) => cy.wrap(doc.querySelector("svg")).click());
        

        cy.fixture('signup').then((data) => {
            data.forEach((userdata) => {
                // successful signup (email format & password format valid, and email not registered yet)
                if(userdata.SignupCase == 'PASS'){
                    cy.get('a[href="/account/login"]').click();
                    cy.xpath("//a[@class='text-interactive'][contains(.,'Create an account')]").click();
                    cy.get("input[placeholder='Full Name']").type(userdata.fullname);
                    cy.get("input[placeholder='Email']").type(userdata.email);
                    cy.get("input[placeholder='Password']").type(userdata.password);
                    cy.xpath("//button[@type='button']").click();
                    // cy.contains('SIGN UP').click()
                    // cy.contains('SIGN UP').click()
                    // cy.get("svg").click({ multiple: true });
                    cy.xpath("//a[@href='/account']//*[name()='svg']").click();
                    cy.xpath("//a[normalize-space()='Logout']").click();
                }
                // failure signup (email format invalid)
                else if(userdata.SignupCase == "Fail"){
                    if(userdata.ConditionCase == "InvalidFormatEmail"){
                        cy.visit('https://demo.evershop.io/') 
                        cy.get('a[href="/account/login"]').click();
                        cy.xpath("//a[@class='text-interactive'][contains(.,'Create an account')]").click();
                        cy.get("input[placeholder='Full Name']").type(userdata.fullname);
                        cy.get("input[placeholder='Email']").type(userdata.email);
                        cy.get("input[placeholder='Password']").type(userdata.password);
                        cy.xpath("//button[@type='button']").click();
                        cy.visit('https://demo.evershop.io/') 
                    }
                    // failure signup (email already exist)
                    else if(userdata.ConditionCase == "ExistingEmail"){
                        cy.get('a[href="/account/login"]').click();
                        cy.xpath("//a[@class='text-interactive'][contains(.,'Create an account')]").click();
                        cy.get("input[placeholder='Full Name']").type(userdata.fullname);
                        cy.get("input[placeholder='Email']").type(userdata.email);
                        cy.get("input[placeholder='Password']").type(userdata.password);
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