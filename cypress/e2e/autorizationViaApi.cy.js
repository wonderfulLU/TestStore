/// <reference types="cypress"/> 

import user from "../fixtures/user.json";
import { loginViaApi } from "../support/helper";

beforeEach('Login', () => {

  loginViaApi(user);
});

it('Autorization Via API', () => {

  cy.visit('/index.php?rt=account/account');
  //cy.get('span.subtext').should('contain', user.firstName);
  //findProduct(user);

})
  //Написати хелпер функцію з авторизацією через http запит у проекті для https://automationteststore.com/
//Написати будь-який тест з використанням цієї функції







