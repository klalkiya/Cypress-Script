const { defineConfig } = require('cypress');

module.exports = defineConfig({
  "viewportWidth": 1200,
  
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    supportFile: 'False',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
      
          return null
        },
      })
      return require('./cypress/plugins/index.js')(on, config);
    }
    

  }
});
