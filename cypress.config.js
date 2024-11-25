const { defineConfig } = require("cypress");

const data = new Date()

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://latinoware.api.prod:8080/api/',
    testIsolation: false,
    defaultCommandTimeout:10000,
    pageLoadTimeout: 12000,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },

  },
  reporterOptions: {
    reportDir: "cypress/report",
    overwrite : false,
    json : false,
    html : true,
    timestamp: 'dd-mm-yyyy',
    reportFilename: '[name]_data_do__teste_[datetime]'+ '_' + data.getHours() + 'h'+
    data.getMinutes() + 'm' + '_Status_[status]',

  },
});
