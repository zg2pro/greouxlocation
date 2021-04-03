[![Build](https://travis-ci.com/zg2pro/greouxlocation.svg?branch=master)](https://travis-ci.com/zg2pro/greouxlocation)
[![BCH compliance](https://bettercodehub.com/edge/badge/zg2pro/greouxlocation?branch=master)](https://bettercodehub.com/)


consult it online at https://zg2pro.github.io/greouxlocation


# Version 4 of the website

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

This project is actually very old as I **released it on "free pages perso" for the first time in 2005**. 

Version 4, the typescript/angular version, was made in 2017.

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


# Continuous integration

This project is integrated through Travis-CI (see badges for continuous results of build and deployment)
for FTP deployment, did:
- install ruby for windows
- run gem install travis
- created .travis.yml file with language header
