/// <reference types="cypress"/> 

import user from "../fixtures/user.json";
import { loginViaApi } from "../support/helper";
import loginPage from "../support/pages/LoginPage";

it('Autorization Via API', () => { 

  loginViaApi(user) 
  
  

  }) 

  //Написати хелпер функцію з авторизацією через http запит у проекті для https://automationteststore.com/
//Написати будь-який тест з використанням цієї функції

  

