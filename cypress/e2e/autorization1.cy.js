/// <reference types="cypress"/> 

import homePage from "../support/pages/HomePage";
import loginPage from "../support/pages/LoginPage";
import user from "../fixtures/user.json"

it('Autorization2', () => { 

    homePage.visit();
    homePage.getLoginorRegisterButton().click();
    loginPage.submitLoginForm(user.username, user.password);

     

  }) 



