var replace = require("replace");
var copyfiles = require('copyfiles');

var nodeEnvArg = function () {
    var valIndex = -1;
    for (var index in process.argv) {
        if (process.argv.hasOwnProperty(index)) {
            var val = process.argv[index];
            if (val === "--NODE_ENV") {
                valIndex = parseInt(index) + 1;
            } else if (parseInt(index) === valIndex) {
                return val;
            }
        }
    }
    return undefined;
}

var env = nodeEnvArg();

console.log("the environment selected for replacements is: " + env);

if (env === 'target') {
    var targets = {
        "@_NPM_BASE_@": "../../node_modules",
        "@_HREF_BASE_@": "/edsa-greouxlocation/v3/target/app/",
        "@_MAIN_JS_@": "main.js"
    };
    for (var key in targets) {
        if (targets.hasOwnProperty(key)) {
            replace({
                regex: key,
                replacement: targets[key],
                paths: ['target/app/index.html', 'target/app/systemjs.config.js'],
                recursive: true,
                silent: false
            });
        }
    }
} else if (env === 'dist') {
    copyfiles(
            ["src/app/index.html", "src/app/systemjs.config.js", "dist"],
            {up: true},
            function () {
                var dists = {
                    "@_NPM_BASE_@": "node_modules",
                    "@_HREF_BASE_@": "/edsa-greouxlocation/v3/dist/",
                    "@_MAIN_JS_@": "bundle.min.js"
                };
                for (var key in dists) {
                    if (dists.hasOwnProperty(key)) {
                        replace({
                            regex: key,
                            replacement: dists[key],
                            paths: ['dist/index.html', 'dist/systemjs.config.js'],
                            recursive: true,
                            silent: false
                        });
                    }
                }
            }
    );
} else {
    throw "NODE_ENV is not set correctly to make replacements";
}

