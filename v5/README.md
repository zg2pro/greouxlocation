# greouxlocation

to start an angular project:

-install nodejs, npm, yo, typescript, gulp, express (all global)

npm install -g yo
npm install -g generator-typescript
yo typescript
(typescript comes with gulp)

-install the Netbeans plugin for Typescript and node (use Netbeans "All" version containing the HTML/JS features)
-in Netbeans options, point to the .cmd files inside the global node_modules, so that Netbeans targets can point to the gulp instructions to give in the gulp.js
-create a project from the "quickstart" of angular.io website (clone or dl the zip from github quickstart seed -https://github.com/angular/quickstart-)
-create web/html5 project from existing sources in NetBeans
-use Netbeans to "resolve project problems", it will  propose to import all the missing npm modules / alternatively run npm install

-for hosting purpose, can install either an easyPhp or a chrome netbeans extension that will host the website

-if you don't plan to write unit tests, delete all non essential files: follow instructions on angular.io

-run "npm run-script build" to build the project, if you're not using src as you're site root, you have to fix pathes for css and js in index.html and systemjs.config.js

- we want to compile the project in a separate directory, for this, we must use some other devDependencies and add the scripts to our package.json
- also we want to pack a distrib version with application dependencies bundled, css and js minified, thus we add more scripts in the package.json

- in Netbeans (project properties) define "target/app" as the site root and "src" as the source folder, 
and now you should have your ts fully recognized with auto-completion of code and all...

- in your test browser, open F12, and go to settings, then disable cache, with cache you would not be able to see your changes between deployments.

- use browserify to load all js files required by angular (concatenates the framework in one file)
- use uglify to minify the bundled file




Remains to be done:
------------------
-navbar going to pages
-i18n
-footer
-partner pages
-sass less ?
-remove unused files
-integrate gitlab ? docker ?
-pack to production keep old version in separate folder
- screens :
1- home with carousel
2- fares (reservation online? calendar?)
3- management by google spreadsheet
4- photos by angularui gallery
5- contact
6- location

