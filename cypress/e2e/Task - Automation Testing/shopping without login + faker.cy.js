import 'cypress-xpath';
var faker = require('faker');

describe('Shopping Without Login Story', () => {
    it('Shopping', () => {
        cy.viewport(1366, 700)
        cy.visit('https://demo.evershop.io/') 
        // generate randomized email
        const email =faker.internet.email();
        // generate randomized fullname
        const fullname = faker.name.findName();
        // generate randomized phone number
        const phone = faker.phone.phoneNumber();
        // generate randomized address
        const address = faker.address.streetName();
        // generate randomized city
        const city = faker.address.city();
        // generate randomized city
        const postcode = faker.address.zipCode();

        cy.fixture('shoppingwithoutlogin').then((data) => {
            data.forEach((userdata) => {

                //item 1
                cy.get('li:nth-child(1) a:nth-child(1)').click();
                cy.scrollTo(0, 150);
                // choose item
                cy.get(`img[alt='${userdata.fitemname}']`).click();
                cy.wait(2000)
                // enter quantity of item
                cy.get('input[placeholder="Qty"]').click().clear();
                cy.get('input[placeholder="Qty"]').type(userdata.fquantity);
                // set size of item
                cy.xpath(`(//a[normalize-space()='${userdata.fsize}'])[1]`).click();
                cy.wait(2000)
                // set color of item
                cy.xpath(`(//a[normalize-space()='${userdata.fcolor}'])[1]`).click();
                cy.wait(2000)
                // add to cart
                cy.xpath("(//button[@type='button'])[1]").click();
                
                //item 2

                // add new item
                cy.xpath("//a[@class='nav-link hover:underline'][contains(.,'Women')]").click();
                cy.scrollTo(0, 150);
                // choose item
                // cy.xpath("//img[contains(@alt,'Edge gameday shoes')]").click()
                cy.get(`img[alt='${userdata.sitemname}']`).click();
                // cy.xpath("//img[contains(@alt,'userdata.')]").click()
                cy.wait(2000)
                // enter quantity of item
                cy.get('input[placeholder="Qty"]').click().clear();
                cy.get('input[placeholder="Qty"]').type(userdata.squantity);
                // set size of item
                cy.xpath(`(//a[normalize-space()='${userdata.ssize}'])[1]`).click();
                cy.wait(2000)
                // set color of item
                cy.xpath(`(//a[normalize-space()='${userdata.scolor}'])[1]`).click();
                cy.wait(2000)
                // add to cart
                cy.xpath("(//button[@type='button'])[1]").click();

                // open the shopping bag
                cy.get('.add-cart-popup-button').click();
                // remove item in shopping bag
                cy.xpath("(//span[contains(text(),'Remove')])[2]").click();
                cy.wait(1500)
                cy.xpath("//span[normalize-space()='CHECKOUT']").click();
                cy.wait(1500)

                // fill email 
                cy.get('input[placeholder="Email"]').click().type(email);
                cy.get("button[type='button']").click();
                //fill information of shipping add
                cy.get('input[placeholder="Full name"]').click().type(fullname);
                cy.get('input[placeholder="Telephone"]').click().type(phone);
                cy.get('input[placeholder="Address"]').click().type(address);
                cy.get('input[placeholder="City"]').click().type(city);
                cy.get('select[id="address\\[country\\]"]').select(userdata.country);
                cy.get('select[id="address\\[province\\]"]').select(userdata.province);
                cy.get('input[placeholder="Postcode"]').click().type(postcode);
                cy.wait(3500)
                cy.xpath(`//input[@id='${userdata.shipping}']`).click({ force: true });
                cy.get("button[type='button']").click();
                cy.wait(1500)

                Cypress.Commands.add('clickOnSVGElement', { prevSubject: 'element' }, ($element) => {
                    return cy.wrap($element).trigger('click', { force: true });
                });
                cy.xpath("(//*[name()='circle'])[1]").clickOnSVGElement();
                // click place order button
                cy.get("button[type='button']").click();
                // click continue shopping button
                cy.xpath("//a[@class='button primary']").click();

            });
          });  
        


    });
})