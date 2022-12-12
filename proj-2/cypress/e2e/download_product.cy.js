/// <reference types="cypress" />
import product from "../fixtures/product"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
describe('Download Product test suite', () => {
    it('Download product url visit', function(){ 
        cy.visit(Cypress.env('PRODUCT_URL'))  // site url
        cy.wait(5000)
    })
    it('Download product add to cart', function(){ 
        cy.get('div').then(($div) => {
            if($div.hasClass('box-tocart')){ 
                if($div.hasClass('downloads')) { // Downloaded product
                    if($div.hasClass('field downloads required')) {
                        cy.get('.field.downloads.required').then(($check) => {
                            cy.get('input[type="checkbox"]')
                                .each(($ele, index) => {
                                    if (index === 0) {
                                        cy.wrap($ele).click();
                                    }
                                })
                        })
                    }
                }
                cy.wait(5000)
                cy.addTocart()
                cy.showCart()
                // cy.deleteProduct()
                cy.checkout() // checkout button click
                cy.get('#customer-email').type(checkout.email,'{enter}')
                cy.get('#pass').type(checkout.password,'{enter}')
                cy.get('#send2').click()
                // cy.checkoutDetails() // checkout details fill
                cy.wait(35000)
                cy.orderClick()
            }
            else{
                cy.task('log', 'Product out of stock')
            }
        })
    })
})