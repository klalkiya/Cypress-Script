import product from "../fixtures/product"
import selectors from "../fixtures/selector"
import checkout from "../fixtures/checkout_details"
import 'cypress-wait-until';

Cypress.Commands.add("addTocart", (ButtonClick) => { // add to cart button click
    cy.wait(5000)
    cy.get('div').then(($div) => {
      if($div.hasClass('box-tocart')){ //check in stock product
        cy.get('#product-addtocart-button').click()
      }
    })   
})

Cypress.Commands.add("showCart", (ButtonClick) => { // mini cart click
    cy.wait(7000)
    if(cy.get('.counter-number')){
      cy.get('.minicart-wrapper .showcart').click({ timeout: 10000 })
    }
})

Cypress.Commands.add("checkout", (ButtonClick) => {
  cy.wait(5000)
  cy.get('body').then($body => {
    if ($body.find('#top-cart-btn-checkout').length) {
      cy.get('#top-cart-btn-checkout').click()
    } 
  })
  // if(cy.get('#minicart-content-wrapper')) {
  //   cy.get('#top-cart-btn-checkout').click()
  // }
})

Cypress.Commands.add("checkoutDetails", (ButtonClick) => {
    cy.wait(40000)
    cy.get('body') // update button availble check
    .then($body=>{
      if($body.find('.aw-onestep-main').length){
        cy.get('.form-login #customer-email-fieldset #aw-customer-email').type(checkout.email,'{enter}')
        cy.get('input[name="firstname"]').type(checkout.firstname,'{enter}')
        cy.get('input[name="lastname"]').type(checkout.lastname,'{enter}')
        cy.get('input[name="street[0]"]').type(checkout.address,'{enter}')
        cy.get('input[name="postcode"]').type(checkout.postcode,'{enter}')
        cy.get('input[name="city"]').type(checkout.city,'{enter}')
        cy.get('input[name="telephone"]').type(checkout.telephone,'{enter}')
      }
      if($body.find('.action-toolbar > .action.primary').length){
        cy.get('.action-toolbar > .action.primary').click();
      }
    })
    
    cy.get('div').then(($div) => {
      if($div.hasClass('field _required fl-label fl-label-state')) {
          cy.get('select').eq(1).select(1,{force: true})
      }
      //}
    })
})

Cypress.Commands.add("orderClick", (ButtonClick) => {
    
    if(cy.get('.payment-methods-inner').find('.payment-method')){
      cy.get('[type="radio"]#checkmo').check({force:true})
    }

    // cy.get('body') // update button availble check
    // .then($body=>{
    //   if($body.find('.checkout-agreement').length){
    //     cy.get('[type="checkbox"]').check({force: true})
    //   }
    // })
    if(cy.get('.checkout-agreements').find('.checkout-agreement')){
      cy.get('[type="checkbox"]').check({force: true})
    }

    // cy.get('.aw-onestep-sidebar-content > .actions-toolbar .action.primary.checkout', { timeout: 10000 }) //checkout button click
    //   .should('be.visible')
    //   .then($btn  => cy.wrap($btn).click())
    //   cy.task('log', 'Product added')
})

// Cypress.Commands.add("deleteProduct", (ButtonClick) => { // delete 
//     cy.wait(5000)
//     cy.get('.product-item-details .product .delete').click({force: true})
//     cy.wait(5000)
//     cy.get('.modal-footer .action-accept').click()
//     cy.task('log', 'Product deleted')
// })
 

