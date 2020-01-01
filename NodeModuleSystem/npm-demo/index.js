var _ = require("underscore");

// Core module
// File or folder
var result = _.contains([1, 2, 3], 3);
console.log(result);

// node_modules은 지워도
// npm i 를 하면 다시 다 설치됨.

// Semantic Versioning
// Major.Minor.Patch ex) ^4.13.6

// listing the Installed Packages
// npm list --depth=0

// Viewing Registry Info for a Package
// npm view mongoose
// npm view mongoose dependencies

// Installing a Specific Version of a Package
// npm i mongoose@2.4.2

// Updating Local Packages
// npm outdated
// npm update
// npm i -g npm-check-updates 모두 새버전으로 update
// https://www.npmjs.com/package/npm-check-updates?activeTab=dependents

// DevDependencies
// npm i jshint --save-dev

// Uninstalling a Package
// npm uninstall mongoose

// Working with Global Packages
// npm i -g npm
// npm -g outdated

// Publishing a Package
// mkdir lion-lib
// cd lion-lib/
// npm init --yes
// touch index.js
// module.exports.multiply = ...
// npm login
// npm publish, using unique name
// mkdir node-app
// npm init --yes
// npm i lion-lib

// Updating a Published Package
// module.exports.add
// npm version major or minor patch
// npm publish
