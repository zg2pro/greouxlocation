[![gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/zg2pro/greouxlocation?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![NPM version](https://img.shields.io/npm/v/greouxlocation.svg?style=flat-square)](https://www.npmjs.com/package/greouxlocation)
[![Build](https://travis-ci.org/zg2pro/greouxlocation.svg?branch=master)](https://travis-ci.org/zg2pro/greouxlocation)
[![codecov.io](https://codecov.io/github/zg2pro/greouxlocation/coverage.svg?branch=master)](https://codecov.io/github/zg2pro/greouxlocation?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

consult it online at http://greouxlocation.free.fr


# Version 4 of the website

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.


# greouxlocation

to start an angular project:

-install nodejs, npm, yo, typescript, gulp, express (all global)

npm install -g yo
npm install -g generator-typescript
npm install -g @angular/compiler-cli
yo typescript
(typescript comes with gulp)

-install the Netbeans plugin for Typescript and node (use Netbeans "All" version containing the HTML/JS features)
-in Netbeans options, point to the .cmd files inside the global node_modules, so that Netbeans targets can point to the gulp instructions to give in the gulp.js


-Now run ng new my-app (my-app is the name of the app)

-create web/html5 project from existing sources in NetBeans

-use Netbeans to "resolve project problems", it will  propose to import all the missing npm modules / alternatively run npm install

-for hosting purpose, can install either an easyPhp or a chrome netbeans extension that will host the website

-if you don't plan to write unit tests, delete all non essential files: follow instructions on angular.io

-run "npm run build" to build the project, if you're not using src as you're site root, you have to fix pathes for css and js in index.html and systemjs.config.js

- in Netbeans (project properties) define "dist" as the site root and "src" as the source folder, 
and now you should have your ts fully recognized with auto-completion of code and all...

- in your test browser, open F12, and go to settings, then disable cache, with cache you would not be able to see your changes between deployments.


In a next version?
------------------
- reservation online? check availability. calendar?
- site administration by gDocs
- several payment solutions (cheque and emv cards)
