/// <reference types="cypress"/> 

describe.skip('Registration', () => {

  beforeEach(() => { 
    cy.visit('https://automationteststore.com/');

    cy.get('#customer_menu_top').click();
    cy.get('[title="Continue"]').click();
  })

  let Users = [{
    firstName: 'Anastasiya',
    lastName: 'Lushkova',
    email: '111@mail.com',
    telephone: '+123456789',
    fax: '987654321',
    company: 'UDS',
    address1: 'street',
    address2: 'space 57',
    city: 'Kyiv',
    region: 'Kyiv',
    postcode:'02000',
    country: 'Ukraine',
    login: 'Nassty',
    password: '123cghj',
    confirmpassword: '123cghj'
  },
  {
    firstName: 'Max',
    lastName: 'Sam',
    email: 'max@mail.com',
    telephone: '+36524878',
    fax: '444444',
    company: 'MMM',
    address1: 'street1',
    address2: '123',
    city: 'Cardiff',
    region: 'Cardiff',
    postcode:'45632',
    country: 'United Kingdom',
    login: 'Maxxx',
    password: '123qwe',
    confirmpassword: '123qwe'    
  },
{
  firstName: 'Zero',
    lastName: 'Oreo',
    email: 'zero@mail.com',
    telephone: '+365248789',
    fax: '4444444',
    company: 'OOps',
    address1: 'street2',
    address2: '88',
    city: 'Kara',
    region: 'Kara',
    postcode:'45632',
    country: 'Togo',
    login: 'Zero',
    password: '123qwe',
    confirmpassword: '123qwe'
}
]

const ExpResult = [{
  firstName: 'Anastasiya',
    lastName: 'Lushkova',
    email: '111@mail.com',
    telephone: '+123456789',
    fax: '987654321',
    company: 'UDS',
    address1: 'street',
    address2: 'space 57',
    city: 'Kyiv',
    region: 'Kyiv',
    postcode:'02000',
    country: 'Ukraine',
    login: 'Nassty',
    password: '123cghj',
    confirmpassword: '123cghj'
},
{
  firstName: 'Max',
    lastName: 'Sam',
    email: 'max@mail.com',
    telephone: '+36524878',
    fax: '444444',
    company: 'MMM',
    address1: 'street1',
    address2: '123',
    city: 'Cardiff',
    region: 'Cardiff',
    postcode:'45632',
    country: 'United Kingdom',
    login: 'Maxxx',
    password: '123qwe',
    confirmpassword: '123qwe'
},
{
  firstName: 'Zero',
    lastName: 'Oreo',
    email: 'zero@mail.com',
    telephone: '+365248789',
    fax: '4444444',
    company: 'OOps',
    address1: 'street2',
    address2: '88',
    city: 'Kara',
    region: 'Kara',
    postcode:'45632',
    country: 'Togo',
    login: 'Zero',
    password: '123qwe',
    confirmpassword: '123qwe'
}
]
  
  const Reg_form = (TestData, ExpResult) =>

  function () {

    cy.get('#AccountFrm_firstname').should('be.empty').type(`${TestData.firstName}`).should('have.value', `${ExpResult.firstName}`);
    cy.get('#AccountFrm_lastname').should('be.empty').type(`${TestData.lastName}`).should('have.value', `${ExpResult.lastName}`);
    cy.get('#AccountFrm_email').should('be.empty').type(`${TestData.email}`).should('have.value', `${ExpResult.email}`);
    cy.get('#AccountFrm_telephone').should('be.empty').type(`${TestData.telephone}`).should('have.value', `${ExpResult.telephone}`);
    cy.get('#AccountFrm_fax').should('be.empty').type(`${TestData.fax}`).should('have.value', `${ExpResult.fax}`);
    cy.get('#AccountFrm_company').should('be.empty').type(`${TestData.company}`).should('have.value', `${ExpResult.company}`);
    cy.get('#AccountFrm_address_1').should('be.empty').type(`${TestData.address1}`).should('have.value', `${ExpResult.address1}`);
    cy.get('#AccountFrm_address_2').should('be.empty').type(`${TestData.address2}`).should('have.value', `${ExpResult.address2}`);
    cy.get('#AccountFrm_city').should('be.empty').type(`${TestData.city}`).should('have.value', `${ExpResult.city}`);
    cy.get('#AccountFrm_country_id').select(`${TestData.country}`).should('contain', `${ExpResult.country}`);
    cy.get('#AccountFrm_zone_id').select(`${TestData.region}`).should('contain', `${ExpResult.region}`);
    cy.get('#AccountFrm_postcode').should('be.empty').type(`${TestData.postcode}`).should('have.value', `${ExpResult.postcode}`);
    cy.get('#AccountFrm_loginname').should('be.empty').type(`${TestData.login}`).should('have.value', `${ExpResult.login}`);
    cy.get('#AccountFrm_password').should('be.empty').type(`${TestData.password}`).should('have.value', `${ExpResult.password}`);
    cy.get('#AccountFrm_confirm').should('be.empty').type(`${TestData.confirmpassword}`).should('have.value', `${ExpResult.confirmpassword}`);
    cy.get('#AccountFrm_newsletter1').click();
    cy.get('[class="col-md-6 mt20 mb40"] [onclick]').should('have.attr', 'href');
    cy.get('[class="col-md-6 mt20 mb40"]').should('contain', 'I have read and agree to the');
    cy.get('#AccountFrm_agree').click();
    cy.get('button[title="Continue"]').should('contain', 'Continue').click();

    cy.get('.container-fluid').should('contain', 'Your Account Has Been Created!')
    cy.get('[title="Continue"]').should('contain', 'Continue').click();           
  }

Users.forEach((user, index) => {
  it(`User ${index+1}`, Reg_form(user, ExpResult[index]))
})
  
})

describe('Autorization', () => {

  /*beforeEach(() => { 
    cy.visit('https://automationteststore.com/index.php?rt=account/account');
    cy.get('.top.menu_account .menu_text').eq(2).should('contain', 'Account').find('[data-id="menu_logout"]');
  })*/

  beforeEach(() => { 
    cy.visit('https://automationteststore.com/');

    cy.get('#customer_menu_top').click();
    cy.get('.loginbox.form-horizontal').should('contain', 'I am a returning customer.');
    cy.get('.loginbox.form-horizontal').should('contain', 'Forgot your password?').and('contain', 'Forgot your login?');

    cy.get('#loginFrm button').should('contain', 'Login').click();
    cy.get('.alert-error').should('contain', 'Error: Incorrect login or password provided.').click();//'.alert-error .close'
  })

  let autUsers = [{    
    login: 'Nassty',
    password: '123cghj'    
  },
  {    
    login: 'Maxxx',
    password: '123qwe'    
  },
]

  const autExpResult = [{
    login: 'Nassty',
    password: '123cghj'
  },
{    
    login: 'Maxxx',
    password: '123qwe'    
  },
{    
    login: 'Zero',
    password: '123qwe'    
  }]

  const Aut_form = (TestData, ExpResult) =>

  function () {
    cy.get('#loginFrm .control-label.col-sm-4').eq(0).should('contain', 'Login Name:');
    cy.get('#loginFrm_loginname').should('be.empty').type(`${TestData.login}`).should('have.value', `${ExpResult.login}`);
    cy.get('#loginFrm .control-label.col-sm-4').eq(1).should('contain', 'Password:');
    cy.get('#loginFrm_password').should('be.empty').type(`${TestData.password}`).should('have.value', `${ExpResult.password}`);
    cy.get('#loginFrm button').should('contain', 'Login').click();
    cy.get('span.subtext').should('not.be.empty');
    /*cy.location().then ( location => {
      expect(location.pathname).to.be.eq('/index.php?rt=account/account');      
    }) */
  }

  autUsers.forEach((user, index) => {
    it(`Account ${index+1}`, Aut_form(user, autExpResult[index]))
  })
    
})
 