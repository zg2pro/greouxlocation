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

- now we want to compile the project in a separate directory, for this, we must use some other devDependencies and add the following scripts to our package.json :
"clean": "rimraf target",
"html": "copyfiles -f src/app/index.html src/app/**/*.css src/app/**/*.js src/app/**/*.ico target/app",
"templates": "copyfiles -f src/app/templates/*.html target/app/templates",
"compile": "npm run clean && npm run html && npm run templates && npm run build"


