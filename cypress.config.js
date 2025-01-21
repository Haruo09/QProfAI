const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  }
});
