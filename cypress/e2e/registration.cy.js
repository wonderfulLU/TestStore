/// <reference types="cypress"/> 

import homePage from "../support/pages/HomePage";
//import loginPage from "../support/pages/LoginPage";

import {faker} from '@faker-js/faker'
import user from "../fixtures/user.json"
import {login} from "../support/helper.js" //login - назва ф-ції яка всередині хелпера зберігається

//faker застосовується тільки для того, що треба згенерити, то що не треба, можна не прописувати і брати  із user.json
user.username = faker.internet.userName();
user.firstName = faker.person.firstName();
user.lastName = faker.person.lastName();
user.postcode = faker.location.zipCode('####');//# кількість цифр, які треба згенерити
user.postcode = faker.number.int();
user.address1 = faker.location.street();
user.address2 = faker.location.street();
user.email = faker.internet.email();
user.password = faker.internet.password({ length: 20 }); //довжина пароля

  it('Registration', () => {

    cy.log('Open website login page');
    homePage.visit();
    homePage.getLoginorRegisterButton().click();    
    cy.get('#customer_menu_top').click(); 
    cy.get('[title="Continue"]').click();

    cy.get('#AccountFrm_firstname').should('be.empty').type(user.firstName).should('have.value', user.firstName);
    cy.get('#AccountFrm_lastname').should('be.empty').type(user.lastName).should('have.value', user.lastName);
    cy.get('#AccountFrm_email').should('be.empty').type(user.email).should('have.value', user.email);
    //cy.get('#AccountFrm_telephone').should('be.empty').type(user.telephone);//.should('have.value', user.telephone);
    //cy.get('#AccountFrm_fax').should('be.empty').type(user.fax);//.should('have.value', user.fax);
    //cy.get('#AccountFrm_company').should('be.empty').type(user.company);//.should('have.value', user.company);
    cy.get('#AccountFrm_address_1').should('be.empty').type(user.address1).should('have.value', user.address1);
    cy.get('#AccountFrm_address_2').should('be.empty').type(user.address2).should('have.value', user.address2);
    cy.get('#AccountFrm_city').should('be.empty').type(user.city).should('have.value', user.city);
    cy.get('#AccountFrm_country_id').select(user.country).should('contain', user.country);
    cy.get('#AccountFrm_zone_id').select(user.region).should('contain', user.region);
    cy.get('#AccountFrm_postcode').should('be.empty').type(user.postcode).should('have.value', user.postcode);
    cy.get('#AccountFrm_loginname').should('be.empty').type(user.username).should('have.value', user.username);
    cy.get('#AccountFrm_password').should('be.empty').type(user.password).should('have.value', user.password);
    cy.get('#AccountFrm_confirm').should('be.empty').type(user.password).should('have.value', user.password);
    cy.get('#AccountFrm_newsletter1').check();
    cy.get('[class="col-md-6 mt20 mb40"] [onclick]').should('have.attr', 'href');
    cy.get('[class="col-md-6 mt20 mb40"]').should('contain', 'I have read and agree to the');
    cy.get('#AccountFrm_agree').check();
    cy.get('button[title="Continue"]').should('contain', 'Continue').click();

    cy.get('.container-fluid').should('contain', 'Your Account Has Been Created!')
    //cy.get('#maincontainer').contains(user.firstName).should('exist');
    cy.get('[title="Continue"]').should('contain', 'Continue').click();  
    
    cy.clearAllCookies(); //щоб не робити лог аут
    login(user); //застосування хелпера
  })

 

