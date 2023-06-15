const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080, //розширення екрану
  viewportWidth: 1920,
  watchForFileChanges: false, //щоб cypress не перезавантажувався після кожної зміни
  e2e: {
    baseUrl: 'https://automationteststore.com',//URL що буде доступний по всьому проекту !!! без /, тоді cy.visit('/') на головну сторінку і т.д.
    /*retries: {
      "runMode": 0,
      "openMode": 0 //віконце відкриття cypress
    }*/
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

//налаштування в cypress/references/configuration!!!! изучить
