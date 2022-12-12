/// <reference types="cypress" />
import product from "../fixtures/product"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
describe('Simple product test suite', () => {
    it('Simple product url visit', function(){
        cy.visit(Cypress.env('PRODUCT_URL'))  // site url
        cy.wait(5000)
    })
    it('Simple product add to cart', function(){ 
        cy.get('div').then(($div) => {
            if($div.hasClass('box-tocart')){ 
                cy.addTocart()
                cy.showCart()
                // cy.deleteProduct() // delete product from the minicart
                // cy.checkout() // checkout button click
                // cy.checkoutDetails() // checkout details fill
                // cy.orderClick()
            }
            else{
                cy.task('log', 'Product out of stock')
            }
        })
    })
})