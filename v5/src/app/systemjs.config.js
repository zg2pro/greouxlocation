/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

    var map = {
        // our app is within the app folder
        'app': 'ts',
        // angular bundles
        '@angular': 'npm:@angular',
        // other libraries
        'rxjs': 'npm:rxjs',
        'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
        'traceur': 'npm:traceur/bin/traceur.js',
        '@ng-bootstrap': 'npm:@ng-bootstrap',
        '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap',
        'core-js': 'npm:core-js',
        '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',  
        'hammerjs': 'npm:hammerjs/hammer.min.js',
        'ng2-dragula': 'npm:ng2-dragula/bundles/ng2-dragula.umd.min.js',
        '@angular/material': 'npm:ng2-image-gallery/node_modules/@angular/material/bundles/material.umd.js',
        'ng2-image-gallery': 'npm:ng2-image-gallery/dist/bundles/ng2-image-gallery.umd.min.js',
        'list-files-in-dir': 'npm:list-files-in-dir/lib/index.js'
    };

    var packages = {
        app: {
            defaultExtension: 'js',
            meta: {
                './*.js': {
                    loader: 'systemjs-angular-loader.js'
                }
            }
        },
        rxjs: {
            defaultExtension: 'js'
        },
        'core-js': {
            defaultExtension: 'js'
        },
        'angular2-in-memory-web-api': {
            defaultExtension: 'js'
        },
        '@ng-bootstrap/ng-bootstrap': {
            main: 'index.js',
            defaultExtension: 'js'
        }
    };


    var ngPackageNames = [
        'animations',
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
    ];

    var ngBootstrapPackageNames = [
//        'accordion',
        'alert',
        'bundles',
        'buttons',
        'carousel',
        'collapse',
        'dropdown',
//        'esm',
//        'modal',
//        'pagination',
//        'popover',
//        'progressbar',
//        'rating',
//        'tabset',
//        'timepicker',
//        'tooltip',
//        'typeahead',
//        'util'
    ];


    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = {main: 'index.js', defaultExtension: 'js'};
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = {main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js'};
    }

    function ngBootstrapPackIndex(pkgName) {
        packages['@ng-bootstrap/ng-bootstrap/' + pkgName] = {main: 'index.js', defaultExtension: 'js'};
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = packUmd;
    if (System.packageWithIndex === true) {
        setPackageConfig = packIndex;
    }

    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    ngBootstrapPackageNames.forEach(ngBootstrapPackIndex);

    var config = {
        
        paths: {
            // paths serve as alias
            'npm:': '../../node_modules/'
        },
        // map tells the System loader where to look for things
        map: map,
        // packages tells the System loader how to load when no filename and/or no extension
        packages: packages
    };

    System.config(config);

})(this);