const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080, //розширення екрану
  viewportWidth: 1920,
  pageLoadTimeout: 60000,
  e2e: {
    baseUrl: 'https://automationteststore.com',//URL що буде доступний по всьому проекту !!! без /, тоді cy.visit('/') на головну сторінку і т.д.
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
