const { defineConfig } = require("cypress");

module.exports = defineConfig({
<<<<<<< HEAD
=======
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

>>>>>>> c322f14 (testes da rota /qform automatizados com cypress)
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
