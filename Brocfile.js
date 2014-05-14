/* global require, module */

var EmberApp   = require("ember-cli/lib/broccoli/ember-app");
var pickFiles  = require("broccoli-static-compiler");
var mergeTrees = require('broccoli-merge-trees');

var bootstrapTree = pickFiles("vendor/bootstrap", {
  srcDir: "dist",
  destDir: "assets/vendor/bootstrap"
});

var app = new EmberApp({
  name: require("./package.json").name,

  getEnvJSON: require("./config/environment")
});

// Use this to add additional libraries to the generated output files.
app.import("vendor/phaser-official/build/phaser.js");
app.import("vendor/ember-data/ember-data.js");

// If the library that you are including contains AMD or ES6 modules that
// you would like to import into your application please specify an
// object with the list of modules as keys along with the exports of each
// module as its value.
app.import("vendor/ic-ajax/dist/named-amd/main.js", {
  "ic-ajax": [
    "default",
    "defineFixture",
    "lookupFixture",
    "raw",
    "request",
  ]
});

module.exports = mergeTrees([app.toTree(), bootstrapTree], {
  overwrite: true
});
