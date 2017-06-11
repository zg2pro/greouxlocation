"use strict";
var decorators_1 = require("../util/decorators");
var metadata_di_1 = require("./metadata_di");
var metadata_directives_1 = require("./metadata_directives");
exports.Component = decorators_1.makeDecorator(metadata_directives_1.ComponentMetadata);
exports.Directive = decorators_1.makeDecorator(metadata_directives_1.DirectiveMetadata);
exports.ContentChildren = decorators_1.makePropDecorator(metadata_di_1.ContentChildrenMetadata);
exports.ContentChild = decorators_1.makePropDecorator(metadata_di_1.ContentChildMetadata);
exports.ViewChildren = decorators_1.makePropDecorator(metadata_di_1.ViewChildrenMetadata);
exports.ViewChild = decorators_1.makePropDecorator(metadata_di_1.ViewChildMetadata);
exports.Input = decorators_1.makePropDecorator(metadata_directives_1.InputMetadata);
/**
 *
 * @type {any}
 * @deprecated use @Input('@') instead. Will be removed in 2.0
 */
exports.Attr = decorators_1.makePropDecorator(metadata_directives_1.AttrMetadata);
exports.Output = decorators_1.makePropDecorator(metadata_directives_1.OutputMetadata);
exports.HostBinding = decorators_1.makePropDecorator(metadata_directives_1.HostBindingMetadata);
exports.HostListener = decorators_1.makePropDecorator(metadata_directives_1.HostListenerMetadata);
/**
 * Declares an ng module.
 * @experimental
 * @Annotation
 */
exports.NgModule = decorators_1.makeDecorator(metadata_directives_1.NgModuleMetadata);
//# sourceMappingURL=decorators.js.map