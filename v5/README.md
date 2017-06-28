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

to install google api for php :
-install easyPhp
-in project folder run the following commands :
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
php composer.phar require google/apiclient:^2.0
and follow the quickstart of https://developers.google.com/sheets/api/quickstart/php
it will help you create your oauth file + your first php file to authenticate
then comment lines throwing exception when not using command lines
then give your application name (like greouxlocation) and define CLIENT_SECRET_PATH correctly with your oauth file
then run the php file a first time, it will give you a url you can copy and paste in another tab of your browser
go to this url and get your auth key from google
copy paste this key instead of having a STDIN prompt for this key, also remove the printf lines to prompt for STDIN
and you're done, you should have a content of google spreadsheet displayed in your page


Remains to be done:
------------------
-i18n
-partner pages
-sass less ?
- screens :
2- fares (reservation online? check availability. calendar?)

