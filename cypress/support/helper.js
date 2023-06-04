//хелпер для спрощення (допомоги) авторизації через АПІ
import homePage from "../support/pages/HomePage";
import loginPage from "../support/pages/LoginPage";

export function login(user) {

    homePage.visit();
    homePage.getLoginorRegisterButton().click();
    cy.log('Check user is unauthorized');
    cy.getCookie('customer').should('be.null'); //чекнути, що немає даних по сесії
    loginPage.submitLoginForm(user.username, user.password);

    cy.get('span.subtext').should('contain', user.firstName);
}

export function findProduct(user) {
    
    cy.get('#filter_keyword').should('have.attr', 'placeholder', 'Search Keywords').type(user.keyword);
    cy.get('.button-in-search').click();

        function findItem() {
            cy.get('.prdocutname').then(($items) => {
               for(let i = 0; i < $items.length; i++)
              {
                let item = $items[i];
                if(item.text === user.productName) {                  
                  //cy.contains('.prdocutname', productName)
                  
                  cy.get('.prdocutname[title="Lancome Hypnose Doll Lashes Mascara 4-Piece Gift Set"]').click();
                  return;
                }
              }      
                   
                cy.get('.pagination li a:contains(">"):first').click().then(findItem);
                    
            });
        }
      
    findItem();

    cy.get('.productname .bgnone').should('contain', user.productName);   
    
}

