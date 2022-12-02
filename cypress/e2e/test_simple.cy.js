/// <reference types="cypress" />
import product from "../fixtures/product"
import checkout from "../fixtures/checkout_details"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Simple Product test suite', () => {
    if(product.simpleProduct.isproductExits){
        it('Simple product', function(){ 
            cy.visit(product.simpleProduct.simpleProductUrl) // site url
                cy.wait(5000)
                cy.get('div').then(($div) => {
                    if($div.hasClass('box-tocart')){ 
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
    }
})

describe('Config Product test suite', () => {
    if(product.configProduct.isproductExits){
        it('Config product', function(){
            cy.visit(product.configProduct.configProductUrl) // site url
            cy.wait(5000)
            cy.get('div').then(($div) => {
                if($div.hasClass('box-tocart')){ 
                    if($div.hasClass('product-options-wrapper')){ // check config product
                        if($div.hasClass('swatch-opt')){
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

                // cy.wait(5000)
                // cy.addTocart()
                // cy.showCart()
                // // cy.deleteProduct()
                // cy.checkout() // checkout button click
                // cy.checkoutDetails() // checkout details fill
                // cy.orderClick() // place order
            })
        })
    }
})

describe('Group Product test suite', () => {                                                                                                                                   
    if(product.groupProduct.isproductExits){
        it('Group product', function(){ 
            cy.visit(product.groupProduct.groupProductUrl) // site url
            cy.wait(6000)
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
    }
})

describe('Bundle Product test suite', () => {
    if(product.bundleProduct.isproductExits){
        it('Bundle Product test', function(){ 
            cy.visit(product.bundleProduct.bundleProductUrl) // site url
            cy.wait(6000)
      
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
    }
})

// describe('Download Product test suite', () => {
//     if(product.downlodProduct.isproductExits){
//         it('Download Product', function(){ 
//             cy.visit(product.downlodProduct.downlodroductUrl) // site url
//             cy.wait(6000)

//             cy.get('div').then(($div) => {
//                 if($div.hasClass('box-tocart')){ 
//                     if($div.hasClass('downloads')) { // Downloaded product
//                         if($div.hasClass('field downloads required')) {
//                             cy.get('.field.downloads.required').then(($check) => {
//                                 cy.get('input[type="checkbox"]')
//                                     .each(($ele, index) => {
//                                         if (index === 0) {
//                                             cy.wrap($ele).click();
//                                         }
//                                     })
//                             })
//                         }
//                     }
//                     cy.wait(5000)
//                     cy.addTocart()
//                     cy.showCart()
//                     // cy.deleteProduct()
//                     cy.checkout() // checkout button click
//                     cy.get('#customer-email').type(checkout.email,'{enter}')
//                     cy.get('#pass').type(checkout.password,'{enter}')
//                     cy.get('#send2').click()
//                     // cy.checkoutDetails() // checkout details fill
//                     cy.wait(35000)
//                     cy.orderClick()
//                 }
//                 else{
//                     cy.task('log', 'Product out of stock')
//                 }
//             })
//         })
//     }
// })