/// <reference types="cypress" />
import product from "../fixtures/product"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
describe('Group product test suite', () => { 
    it('Group product url visit', function(){ 
        cy.visit(Cypress.env('PRODUCT_URL'))   // site url
        cy.wait(5000)
    })                                                                                                                                  
    it('Group product add to cart', function(){ 
        cy.get('div').then(($div) => {
            if($div.hasClass('box-tocart')){ 
                if($div.hasClass('grouped')){ // check group product (run sucess)
                    cy.get('tbody tr')
                    .then($tr => {
                        cy.wait(5000)
                        cy.wrap($tr).find('.control.qty').each(($attribute) => {
                            if($attribute.find('.input-text.qty').length)
                            cy.wrap($attribute).find('.input-text.qty').then(($qty) => {
                                cy.wrap($qty).clear()
                                cy.wrap($qty).type('2')
                            })
                        })
                    })
                    // cy.screenshot('Group product screenshot')
                }
                if($div.hasClass('input-group-qty')){ // Change product qyt
                    cy.wait(5000)
                    cy.get('#qty')
                        .then($qtyText => {
                            if ($qtyText.is(':visible')) {
                                cy.wrap($qtyText).clear()
                                cy.wrap($qtyText).type('2')
                            } 
                        })
                }
                cy.wait(5000)
                cy.addTocart()
                cy.showCart()
                // cy.deleteProduct()
                cy.checkout() // checkout button click
                cy.checkoutDetails() // checkout details fill
                cy.orderClick() // place order
            }
            else{
                cy.task('log', 'Product out of stock')
            }
        })
    })
})