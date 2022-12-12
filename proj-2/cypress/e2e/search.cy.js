/// <reference types="cypress" />
import product from "../fixtures/product"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
describe('Search product test suite', () => {
    it('Home page visit', function(){
        cy.visit(Cypress.env('HOME_URL'))  // site url  // site url
        cy.wait(5000)
    })
    it('Search product', function(){
        cy.get('#search').type(Cypress.env('PRODUCT_NAME')) 
        cy.wait(5000)
        cy.get('.product-item-info > a.product-item-photo').eq(0).click({force: true});
        cy.get('div').then(($div) => {
            if($div.hasClass('box-tocart')){ 
                cy.addTocart()
                cy.showCart()
                // cy.deleteProduct() // delete product from the minicart
                cy.checkout() // checkout button click
                cy.checkoutDetails() // checkout details fill
                cy.orderClick()
            }
            else{
                cy.task('log', 'Product out of stock')
            }
        })
    })
})

