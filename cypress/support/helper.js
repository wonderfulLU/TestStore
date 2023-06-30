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
      for (let i = 0; i < $items.length; i++) {
        let item = $items[i];
        if (item.text === user.productName) {
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
};


export function loginViaApi1(user) {

  cy.visit('/index.php?rt=account/login');
  cy.log('Check user is unauthorized');
  cy.getCookie('customer').should('be.null');

  const requestBody = new FormData();
  requestBody.loginname = user.username;
  requestBody.password = user.password;

  loginPage.getToken().then((token) => {
    requestBody.csrftoken = token
    loginPage.getInstance().then((instance) => {
      requestBody.csrfinstance = instance
      reqAuth();
    });
    cy.log('Authorization via http is succesfull')
  });

  function reqAuth() {
    debugger
    cy.request({
      method: 'POST',
      url: `/index.php?rt=account/login`,
      body: requestBody,
      failOnStatusCode: false
    }).then(response => {
      expect(response.isOkStatusCode).to.be.true;
    })
  }

  cy.request({
    method: 'POST',
    url: `/index.php?rt=account/account`,
    body: requestBody,
    failOnStatusCode: false
  }).then(response => {
    expect(response.isOkStatusCode).to.be.true;
  })
}

export function loginViaApi() {

  cy.request('GET', '/index.php?rt=account/account')
    .then(response => {
      const body = Cypress.$(response.body);
      const csrfToken = body.find('input[name="csrftoken"]').val();
      const csrfInstance = body.find('input[name="csrfinstance"]').val();
    })

  cy.request({
    method: 'POST',
    url: '/index.php?rt=account/login',
    form: true,
    body: {
      csrftoken: csrfToken,
      csrfinstance: csrfInstance,
      username: 'Nassty',
      password: '123cghj'
    }
  }).then(response => {
    expect(response.status).to.equal(200);
    expect(response.body).to.contain('html');
  });
  cy.log(csrfToken);
  cy.log(csrfInstance);
}


