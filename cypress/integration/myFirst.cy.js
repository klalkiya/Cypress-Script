/// <reference types="cypress" />


    it('home page', function(){
        cy.visit('https://smaakryb.stag2.salecto.dk/artingarden')
        cy.wait(15000)

        cy.contains("a", "Produkter").realHover('mouse')
        cy.get('.minicart-wrapper .showcart').click() // open cart
        cy.wait(8000)
        cy.get('#btn-minicart-close').click({force: true})   // Close mini cart window

        cy.get('#search').type('Test{enter}') // search the test and enter 
        cy.wait(5000)

        cy.get('.header .account .my-account').click()

        cy.wait(5000)
        cy.get('#email').type('kla')
        cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('Kavita@123')
        
        cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
        cy.wait(5000)

      
        cy.get('#email').clear()
        cy.get('#pass').clear()
        cy.wait(5000)

      // Login with correct credential 
        cy.get('#email').type('kla@salecto.in')
        cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('Kavita@123')
        cy.wait(5000)
        cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
        cy.wait(5000)
        cy.contains('Log ud').click({force: true}) 
})


   
    // cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('Kavita@123')
    // cy.wait(5000)
    // cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
    // cy.wait(5000)

    // // Login with correct credential 
    // cy.get('#email').clear()
    // cy.get('#pass').clear()
    // cy.wait(5000)
   
    // cy.get('#email').type('kla@salecto.in')
    // cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('Kavita@123')
    // cy.wait(5000)
    // cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
    // // Logout
    // cy.wait(5000)
    // cy.contains('Log ud').click({force: true}) 

//   cy.contains('Produkter').trigger('mouseover')
//   cy.wait(6000);
  
    

// it.only('Login' , function(){
//     cy.visit('https://smaakryb.stag2.salecto.dk/artingarden')
//     cy.get(':nth-child(1) > #idILqKQJXt').click()
//     cy.wait(5000)
//     cy.get('#email').type('kla@salecto.in ')
//     cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('Kavita@123')
//     cy.wait(5000)
//     cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
//     cy.wait(5000)


//     cy.screenshot()
//     cy.get(':nth-child(1) > #idq9373dGE').click()
//     // cy.get('.category-item > .level-top').trigger('mouseover')
// })
