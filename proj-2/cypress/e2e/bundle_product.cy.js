/// <reference types="cypress" />
import product from "../fixtures/product"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
describe('Bundle Product test suite', () => {
    it('Bundle product url visit', function(){ 
        cy.visit(Cypress.env('PRODUCT_URL'))  // site url
        cy.wait(5000)
    })
    it('Bundle product add to cart', function(){ 
        cy.get('div').then(($div) => {
            if($div.hasClass('box-tocart')){ 
                if($div.hasClass('bundle-actions')){ // Bundle product add
                    cy.wait(5000)
                    cy.get('#bundle-slide').click(); 
                    cy.wait(5000)
                    cy.get('.fieldset-bundle-options').then(($bundleoptions) => {
                        cy.wrap($bundleoptions).find('.field.option').each(($options) => {
                            if($options.find('select').length){
                                cy.wrap($options).find('select').each(($select) => {
                                    if($select.hasClass('bundle-option-select')){
                                        cy.wrap($select).select(1);
                                    }
                                })
                            }
                            if($options.find('.options-list > .field.choice > .checkbox').length){
                                cy.wrap($options).find('.options-list > .field.choice').eq(0)
                                .find('input[type="checkbox"]')
                                    .check()
                            }
                            if($options.find('.options-list > .field.choice > .radio').length){
                                cy.wrap($options).find('.options-list > .field.choice').eq(0)
                                .find('input[type="radio"]')
                                    .check();
                            }
                            if($options.find('select.multiselect').length){
                                cy.wrap($options).find('select.multiselect').each(($select) => {
                                    // if($select.hasClass('bundle-option-select')){
                                        cy.wrap($select).select(0);
                                    // }
                                })
                            }
                        })
                    })
                }
                cy.wait(5000)
                cy.addTocart()
                cy.showCart()
                // cy.deleteProduct()
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