import 'cypress-xpath';

describe('Shopping With Login Static Story', () => {
    it('Shopping', () => {
        cy.viewport(1366, 700)
        cy.visit('https://demo.evershop.io/') 
        // cy.xpath("//svg[contains(@xmlns,'http://www.w3.org/2000/svg')]").click();
        // cy.document().then((doc) => cy.wrap(doc.querySelector("svg")).click());
        cy.get('a[href="/account/login"]').click();
        cy.get("input[placeholder='Email']").type("jess@gmail.com");
        cy.get("input[placeholder='Password']").type("Jess123*");
        cy.get("button[type='submit']").click();
        cy.wait(1500)
        cy.get('li:nth-child(1) a:nth-child(1)').click();
        cy.scrollTo(0, 150);
        // choose item
        cy.get("img[alt='Continental 80 shoes']").click();
        
        cy.wait(2000)
        // enter quantity of item
        cy.get('input[placeholder="Qty"]').click().clear();
        cy.get('input[placeholder="Qty"]').type('3');
        // set size of item
        cy.xpath("(//a[normalize-space()='L'])[1]").click();
        cy.wait(2000)
        // set color of item
        cy.xpath("(//a[normalize-space()='Pink'])[1]").click();
        cy.wait(2000)
        // add to cart
        cy.xpath("(//button[@type='button'])[1]").click();
        // add new item
        cy.xpath("//a[@class='nav-link hover:underline'][contains(.,'Women')]").click();
        cy.scrollTo(0, 150);
        // choose item
        cy.xpath("//img[contains(@alt,'Edge gameday shoes')]").click()
        cy.wait(2000)
        // enter quantity of item
        cy.get('input[placeholder="Qty"]').click().clear();
        cy.get('input[placeholder="Qty"]').type('3');
        // set size of item
        cy.xpath("(//a[normalize-space()='L'])[1]").click();
        cy.wait(2000)
        // set color of item
        cy.xpath("(//a[normalize-space()='Blue'])[1]").click();
        cy.wait(2000)
        // add to cart
        cy.xpath("(//button[@type='button'])[1]").click();

        // open the shopping bag
        cy.get('.add-cart-popup-button').click();
        // remove item in shopping bag
        cy.xpath("(//span[contains(text(),'Remove')])[2]").click();
        cy.wait(1500)

        cy.xpath("//span[normalize-space()='CHECKOUT']").click();

        //fill information of shipping add
        cy.get('input[placeholder="Full name"]').click().type('Jeje');
        cy.get('input[placeholder="Telephone"]').click().type('1234567890');
        cy.get('input[placeholder="Address"]').click().type('123 Main Street');
        cy.get('input[placeholder="City"]').click().type('New York');
        cy.get('select[id="address\\[country\\]"]').select('United States');
        cy.get('select[id="address\\[province\\]"]').select('California');
        cy.get('input[placeholder="Postcode"]').click().type('10001');
        cy.wait(3500)
        cy.xpath("//input[@id='method0']").click({force: true});
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
})