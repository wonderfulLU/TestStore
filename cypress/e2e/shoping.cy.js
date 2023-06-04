/// <reference types="cypress"/> 

import user from "../fixtures/user.json"
import {findProduct, login} from "../support/helper.js"

  it('Shoping1', () => {   
      
    login(user);

    findProduct(user)

    
    cy.get('.productpagecart .cart').should('contain', 'Add to Cart').click();
    cy.get('#cart_quantity108').clear().type(user.quantity).should('have.value', user.quantity);
    cy.get('#cart_update').should('contain', 'Update').click();
    cy.get('#cart_checkout1').should('contain', 'Checkout').click();
    cy.get('#checkout_btn').should('contain', 'Confirm Order').click();
    cy.get('span.maintext').should('contain', ' Your Order Has Been Processed!');

   } ); 

        
