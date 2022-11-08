/// <reference types="cypress" />
describe('Home Page', function () {
    it('visit site', function(){
        cy.visit('https://laerkehovedet.stag2.salecto.dk/') // site url
        cy.wait(6000)
    })
   // home page slider , click on second slider 
    // it('Slider', function () { 
    //     cy.get('ul').then(($ul) => {
    //     // cy.scrollTo(0, 500)
    //         if ($ul.hasClass('slick-dots')) {
    //             cy.wait(1000)
    //             cy.get('.slick-dots > li').eq(1).click({ multiple: true, force: true })  
    //         } 
    //       })
    // })

    //  Click on prev link 
    // it('Clicks every prev', () => { //prev
    //         cy.get('.slick-prev').each(($button) => {
    //         cy.wrap($button).click()
    //         cy.wait(5000)  
    //     })
    // })

    // Click on every product slider first product
    it('Product click', () => { //prev
        cy
        .get('.slick-track')
        .find('li.product-item > .product-item-info > a.product-item-photo:first')
        .then($els => [...$els].map((a) => a.href))
        .each(url => {
            cy.get('.slick-track').find('a[href="'+url+'"]').first().click();
            cy.go('back');
            cy.wait(5000);
        })
    });
    
    it('Product Add', () => { //prev
        cy.get('.product-item-info > a.product-item-photo').eq(2).click({force: true});
        cy.get('div').then(($div) => {
            if($div.hasClass('product-options-wrapper')){ // check config product
                if($div.hasClass('swatch-opt')){ 
                    cy.get('.swatch-opt')
                    .then($configOpt => {
                        cy.wait(5000)
                            cy.wrap($configOpt).find('.swatch-attribute').each(($attribute) => {
                                cy.wait(5000)
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
                    })
                }

                if($div.hasClass('configurable')){ 
                    cy.get('.field.configurable')
                    .then($configOpt => {
                        cy.wait(5000)
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
            }
            
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
        })
        cy.wait(5000)
            cy.get('#product-addtocart-button').click(); // Add product to cart
        cy.wait(7000)
    });
    
   it('minicart', () => {
    cy.get('.minicart-wrapper .showcart').click() // open cart
   })
    //Newsletter 
    // it('Newsletter', () =>{
    //     cy.get('div').then(($div) => {
    //             // cy.scrollTo(0, 500)
    //                 if ($div.hasClass('newsletter')) {
                       
    //                     // Enter blank value
    //                     cy.get('#newsletter').type('  {enter}')
    //                     cy.wait(4000)
    //                     cy.get('#newsletter-error').contains('Dette er et obligatorisk felt.')
    //                     // Enter wrong value
    //                     cy.get('#newsletter').type('kla{enter}')
    //                     cy.wait(4000)
    //                     cy.get('#newsletter-error').contains('Angiv en gyldig e-mail-adresse (Ex: johndoe@domain.com).')
    //                     // Enter correct value
    //                     // cy.get('#newsletter').type('kla@salecto.in{enter}')
    //                     // cy.wait(4000)
    //                     // cy.get('.page.messages').contains('Tak for din tilmelding.')
    //                     // already register 
    //                     cy.get('#newsletter').type('kla@salecto.in{enter}')
    //                     cy.wait(4000)
    //                     cy.get('.page.messages').contains('Denne e-mailadresse er allerede tilmeldt.')
    //                 } 
    //     })
    // })
})
