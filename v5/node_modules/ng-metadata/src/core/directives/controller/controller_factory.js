"use strict";
var collections_1 = require("../../../facade/collections");
var change_detector_ref_1 = require("../../change_detection/change_detector_ref");
var binding_factory_1 = require("../binding/binding_factory");
var directives_utils_1 = require("../directives_utils");
var lang_1 = require("../../../facade/lang");
var primitives_1 = require("../../../facade/primitives");
var constants_1 = require("./constants");
function directiveControllerFactory(caller, controller, $injector, locals, requireMap, _ddo, metadata) {
    var $scope = locals.$scope, $element = locals.$element, $attrs = locals.$attrs;
    var _services = {
        $parse: $injector.get('$parse'),
        $interpolate: $injector.get('$interpolate'),
        $rootScope: $injector.get('$rootScope')
    };
    var _localServices = {
        changeDetectorRef: change_detector_ref_1.ChangeDetectorRef.create($scope)
    };
    // Create an instance of the controller without calling its constructor
    var instance = Object.create(controller.prototype);
    // NOTE: this is not needed because we are creating bindings manually because of
    // angular behaviour https://github.com/ngParty/ng-metadata/issues/53
    // ===================================================================
    // Remember, angular has already set those bindings on the `caller`
    // argument. Now we need to extend them onto our `instance`. It is important
    // to extend after defining the properties. That way we fire the setters.
    //
    // StringMapWrapper.assign( instance, caller );
    // setup @Input/@Output/@Attrs for @Component/@Directive
    var _a = binding_factory_1._createDirectiveBindings(!directives_utils_1.isAttrDirective(metadata), $scope, $attrs, instance, metadata, _services), removeWatches = _a.removeWatches, initialChanges = _a.initialChanges;
    cleanUpWatchers(removeWatches);
    // change injectables to proper inject directives
    // we wanna do this only if we inject some locals/directives
    if (collections_1.StringMapWrapper.size(requireMap)) {
        controller.$inject = createNewInjectablesToMatchLocalDi(controller.$inject, requireMap);
    }
    var $requires = getEmptyRequiredControllers(requireMap);
    // $injector.invoke will delete any @Input/@Attr/@Output which were resolved within _createDirectiveBindings
    // and which have set default values in constructor. We need to store them and reassign after this invoke
    var initialInstanceBindingValues = getInitialBindings(instance);
    // Finally, invoke the constructor using the injection array and the captured locals
    $injector.invoke(controller, instance, collections_1.StringMapWrapper.assign(locals, _localServices, $requires));
    // reassign back the initial binding values, just in case if we used default values
    collections_1.StringMapWrapper.assign(instance, initialInstanceBindingValues);
    /*if ( isFunction( instance.ngOnDestroy ) ) {
     $scope.$on( '$destroy', instance.ngOnDestroy.bind( instance ) );
     }*/
    /*if (typeof instance.ngAfterViewInit === 'function') {
     ddo.ngAfterViewInitBound = instance.ngAfterViewInit.bind(instance);
     }*/
    // https://github.com/angular/angular.js/commit/0ad2b70862d49ecc4355a16d767c0ca9358ecc3e
    // onChanges is called before onInit
    if (lang_1.isFunction(instance.ngOnChanges)) {
        instance.ngOnChanges(initialChanges);
    }
    _ddo._ngOnInitBound = function _ngOnInitBound() {
        // invoke again only if there are any directive requires
        // #perf
        if (collections_1.StringMapWrapper.size(requireMap)) {
            var $requires_1 = getRequiredControllers(requireMap, $element, controller);
            // $injector.invoke will delete any @Input/@Attr/@Output which were resolved within _createDirectiveBindings
            // and which have set default values in constructor. We need to store them and reassign after this invoke
            var initialInstanceBindingValues_1 = getInitialBindings(instance);
            $injector.invoke(controller, instance, collections_1.StringMapWrapper.assign(locals, _localServices, $requires_1));
            // reassign back the initial binding values, just in case if we used default values
            collections_1.StringMapWrapper.assign(instance, initialInstanceBindingValues_1);
        }
        if (lang_1.isFunction(instance.ngOnInit)) {
            instance.ngOnInit();
        }
        // DoCheck is called after OnChanges and OnInit
        if (lang_1.isFunction(instance.ngDoCheck)) {
            var removeDoCheckWatcher = $postDigestWatch($scope, function () { return instance.ngDoCheck(); });
            cleanUpWatchers(removeDoCheckWatcher);
        }
    };
    // Return the controller instance
    return instance;
    function cleanUpWatchers(cb) {
        $scope.$on('$destroy', function () { return cb; });
    }
}
exports.directiveControllerFactory = directiveControllerFactory;
/**
 * Note: $$postDigest will not trigger another digest cycle.
 * So any modification to $scope inside $$postDigest will not get reflected in the DOM
 */
function $postDigestWatch(scope, cb) {
    var hasRegistered = false;
    var removeDoCheckWatcher = scope.$watch(function () {
        if (hasRegistered) {
            return;
        }
        hasRegistered = true;
        scope.$$postDigest(function () {
            hasRegistered = false;
            cb();
        });
    });
    return removeDoCheckWatcher;
}
function getInitialBindings(instance) {
    var initialBindingValues = {};
    collections_1.StringMapWrapper.forEach(instance, function (value, propName) {
        if (instance[propName]) {
            initialBindingValues[propName] = value;
        }
    });
    return initialBindingValues;
}
/**
 * Angular 1 copy of how to require other directives
 * @param require
 * @param $element
 * @param directive
 * @returns {any|null}
 */
function getRequiredControllers(require, $element, directive) {
    var value;
    if (lang_1.isString(require)) {
        var match = require.match(constants_1.REQUIRE_PREFIX_REGEXP);
        var name = require.substring(match[0].length);
        var inheritType = match[1] || match[3];
        var optional = match[2] === '?';
        //If only parents then start at the parent element
        if (inheritType === '^^') {
            $element = $element.parent();
        }
        if (!value) {
            var dataName = "$" + name + "Controller";
            value = inheritType ? $element.inheritedData(dataName) : $element.data(dataName);
        }
        if (!value && !optional) {
            throw new Error("Directive/Controller '" + name + "', required by directive '" + lang_1.getFuncName(directive) + "', can't be found!");
        }
    }
    else if (lang_1.isArray(require)) {
        value = [];
        for (var i = 0, ii = require.length; i < ii; i++) {
            value[i] = getRequiredControllers(require[i], $element, directive);
        }
    }
    else if (lang_1.isJsObject(require)) {
        value = {};
        collections_1.StringMapWrapper.forEach(require, function (controller, property) {
            value[property] = getRequiredControllers(controller, $element, directive);
        });
    }
    return value || null;
}
exports.getRequiredControllers = getRequiredControllers;
function getEmptyRequiredControllers(requireMap) {
    return collections_1.StringMapWrapper.keys(requireMap).reduce(function (acc, keyName) {
        acc[keyName] = undefined;
        return acc;
    }, {});
}
exports.getEmptyRequiredControllers = getEmptyRequiredControllers;
function createNewInjectablesToMatchLocalDi(originalInjectables, requireMap) {
    var requireKeys = collections_1.StringMapWrapper.keys(requireMap);
    return originalInjectables.slice()
        .map(function (injectable) {
        var replaceInjName = requireKeys
            .filter(function (keyName) { return primitives_1.StringWrapper.startsWith(keyName, injectable); })[0];
        // if found remove that key so we won't assign the same
        if (replaceInjName) {
            var idx = requireKeys.indexOf(replaceInjName);
            requireKeys.splice(idx, 1);
        }
        return replaceInjName || injectable;
    });
}
exports.createNewInjectablesToMatchLocalDi = createNewInjectablesToMatchLocalDi;
/**
 * @deprecated
 * @TODO remove?
 */
function injectionArgs(fn, locals, serviceName, injects) {
    var args = [], 
    // $inject = createInjector.$$annotate(fn, strictDi, serviceName);
    $inject = injects;
    for (var i = 0, length = $inject.length; i < length; i++) {
        var key = $inject[i];
        if (typeof key !== 'string') {
            throw new Error("itkn, Incorrect injection token! Expected service name as string, got " + key);
        }
        /*    args.push( locals && locals.hasOwnProperty( key )
         ? locals[ key ]
         : getService( key, serviceName ) );*/
        args.push(locals[key]);
    }
    return args;
}
//# sourceMappingURL=controller_factory.js.map