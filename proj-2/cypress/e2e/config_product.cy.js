/// <reference types="cypress" />
import product from "../fixtures/product"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
describe('Config product test suite', () => {
    it('Config product url visit', function(){
        cy.visit(Cypress.env('PRODUCT_URL'))  // site url
        cy.wait(5000)
    })
    it('Config product add to cart', function(){
        cy.get('div').then(($div) => {
            if($div.hasClass('box-tocart')){ 
                if($div.hasClass('product-options-wrapper')){ // check config product
                    if($div.hasClass('swatch-opt')){
                        cy.wait(4000)
                        cy.get('.swatch-opt > .swatch-attribute')
                        .should('exist')
                        .then($attributes =>{
                            cy.wrap($attributes).each(($attribute) => {
                                if($attribute.find('.swatch-option').length)
                                    cy.wrap($attribute).find('.swatch-option').then(($select1) => {
                                        cy.wrap($select1).eq(0).click({multiple: true})
                                    })
                                if($attribute.find('select').length)
                                cy.wrap($attribute).find('select').then(($select) => {
                                    if($select.hasClass('swatch-select')){
                                        cy.wrap($select).select(1);
                                    }
                                })
                            })
                        });
                    }
                    if($div.hasClass('configurable')){
                        cy.get('.field.configurable', {timeout:15000})
                        .should('exist')
                        .then($configOpt => {
                            cy.wrap($configOpt).each(($attribute) => {
                                if($attribute.find('select').length){
                                    cy.wrap($attribute).find('select').then(($select) => {
                                        if($select.hasClass('super-attribute-select')){
                                            cy.wrap($select).select(1);
                                        }
                                    })
                                }
                            })
                        })
                    }
                }
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