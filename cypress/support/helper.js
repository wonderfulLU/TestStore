//хелпер для спрощення (допомоги) авторизації через АПІ
import homePage from "../support/pages/HomePage";
import loginPage from "../support/pages/LoginPage";
import formData from "../fixtures/formData.json"

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
                  cy.get(`.prdocutname[title="${user.productName}"]`).click();
                  return;
                }
              }                         
                cy.get('.pagination li a:contains(">"):first').click().then(findItem);                    
            });
        }      
    findItem();
    cy.get('.productname .bgnone').should('contain', user.productName);     
}

export function loginViaApi(user){

  homePage.visit();
    homePage.getLoginorRegisterButton().click();
    cy.log('Check user is unauthorized');
    cy.getCookie('customer').should('be.null');

    /*cy.request({
      method: 'GET',
      url: 'https://api1.shoptimally.com/users/get_id', // baseUrl is prepend to URL
      qs: {
        user_agent: 'Mozilla%2F5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML%2C+like+Gecko)+Chrome%2F114.0.0.0+Safari%2F537.36', // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        api_key: 'DA431C28-1476-458B-A6D1-D2BC0BD6FBEC',
        client_ver: '1.2'
      }, 
      auth: {
        username: user.username,
        password: user.password,
      }
    }).as('api');
    
    cy.get('@api').then( response => {
    expect(response.isOkStatusCode).to.be.true;
    expect(response.status).eql('200');
    cy.log('Authorization via http is succesfull');
    cy.url().should('include', '/index.php?rt=account/account');
    cy.getCookie('customer').should('exist');

  })*/

  
    //cy.request('GET', 'https://api1.shoptimally.com/users/get_id?user_agent=Mozilla%2F5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML%2C+like+Gecko)+Chrome%2F114.0.0.0+Safari%2F537.36&api_key=DA431C28-1476-458B-A6D1-D2BC0BD6FBEC&client_ver=1.2', user.username, user.password).as('api');
    
    const requestBody = new FormData()
    //requestBody.set('loginname', user.name);
    //requestBody.set('password', user.password);

    //let requestBody = {"loginname": "","password": ""} 
    requestBody.loginname = user.username;
    requestBody.password = user.password;

    cy.request({
      method: 'POST',
      url: `/index.php?rt=account/login`,
      body: requestBody,
      failOnStatusCode: false
    }).then( response => {   
    
    expect(response.isOkStatusCode).to.be.true;

    let token = response.body.csrftoken;
    let instance = response.body.csrfinstance;

        cy.setCookie('AC_SF_8CEFDA09D5', token, instance);

        formData.password = user.password;
        formData.loginname = user.username;
        formData.csrftoken = token;
        formData.csrfinstance = instance;

        cy.setCookie('AC_SF_8CEFDA09D5', token)

    loginPage.getSubmitButton().click();

    loginPage.submitLoginForm(user.username, user.password);

    cy.get('span.subtext').should('contain', user.firstName); 

    cy.getCookie('customer').should('not.be.null');    
    cy.url().should('include', '/index.php?rt=account/account');
    

      //expect(response.body.loginname).to.be.equal(user.username);
      //expect(response.body.password).to.be.equal(user.password);
      cy.log('Authorization via http is succesfull')

    })
}

