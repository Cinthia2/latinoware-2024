const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //baseUrl: 'https://nome-da-url-base                                                  ',
    testIsolation: false,
    defaultCommandTimeout:10000,
    pageLoadTimeout: 12000,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },

  },
});
