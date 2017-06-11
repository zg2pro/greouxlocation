"use strict";
var collections_1 = require("../../../facade/collections");
var constants_1 = require("./constants");
function setupFields(ngAttrs, rawInputs, rawOutputs) {
    if (rawInputs === void 0) { rawInputs = []; }
    if (rawOutputs === void 0) { rawOutputs = []; }
    var _a = _setupInputs(_parseFields(rawInputs), ngAttrs), inputs = _a.inputs, attrs = _a.attrs;
    var outputs = _setupOutputs(_parseFields(rawOutputs), ngAttrs).outputs;
    return {
        inputs: inputs,
        attrs: attrs,
        outputs: outputs
    };
}
exports.setupFields = setupFields;
function _parseFields(names) {
    var attrProps = [];
    if (!names) {
        return attrProps;
    }
    for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
        var name_1 = names_1[_i];
        var parts = name_1.split(':');
        var prop = parts[0].trim();
        var attr = (parts[1] || parts[0]).trim();
        var isTypeByDeclaration = _isTypeByDeclaration(attr);
        var attrName = _getNormalizedAttrName(attr, prop, isTypeByDeclaration);
        var type = _getBindingType(attr, isTypeByDeclaration);
        attrProps.push({
            prop: prop,
            attr: attrName,
            bracketAttr: "[" + attrName + "]",
            parenAttr: "(" + attrName + ")",
            bracketParenAttr: "[(" + attrName + ")]",
            type: type,
            typeByTemplate: !isTypeByDeclaration
        });
    }
    return attrProps;
}
exports._parseFields = _parseFields;
function _getBindingType(originalAttr, isTypeByDeclaration) {
    return isTypeByDeclaration
        ? originalAttr.charAt(0)
        : '';
}
function _isTypeByDeclaration(attr) {
    return collections_1.ListWrapper.contains([
        constants_1.BINDING_MODE.attr, constants_1.BINDING_MODE.oneWay, constants_1.BINDING_MODE.twoWay
    ], attr.charAt(0));
}
function _getNormalizedAttrName(originalAttr, propName, isTypeByDeclaration) {
    if (!isTypeByDeclaration) {
        return originalAttr;
    }
    return originalAttr.length > 1
        ? originalAttr.substring(1)
        : propName;
}
function _setupInputs(inputs, ngAttrs) {
    var parsedAttrs = {};
    var parsedInputs = {};
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var input = inputs_1[_i];
        if (input.typeByTemplate) {
            if (ngAttrs.hasOwnProperty(input.attr)) {
                // @
                parsedAttrs[input.prop] = {
                    mode: constants_1.BINDING_MODE.attr,
                    exp: ngAttrs[input.attr],
                    attrName: input.attr
                };
            }
            else if (ngAttrs.hasOwnProperty(input.bracketAttr)) {
                // <
                parsedInputs[input.prop] = {
                    mode: constants_1.BINDING_MODE.oneWay,
                    exp: ngAttrs[input.bracketAttr],
                    attrName: input.bracketAttr
                };
            }
            else if (ngAttrs.hasOwnProperty(input.bracketParenAttr)) {
                // =
                parsedInputs[input.prop] = {
                    mode: constants_1.BINDING_MODE.twoWay,
                    exp: ngAttrs[input.bracketParenAttr],
                    attrName: input.bracketParenAttr
                };
            }
        }
        else {
            if (ngAttrs.hasOwnProperty(input.attr)) {
                var attrMetadata = { mode: input.type, exp: ngAttrs[input.attr], attrName: input.attr };
                if (input.type === constants_1.BINDING_MODE.attr) {
                    parsedAttrs[input.prop] = attrMetadata;
                }
                else {
                    parsedInputs[input.prop] = attrMetadata;
                }
            }
        }
    }
    return {
        inputs: parsedInputs,
        attrs: parsedAttrs
    };
}
exports._setupInputs = _setupInputs;
function _setupOutputs(outputs, ngAttrs) {
    var parsedOutputs = {};
    for (var i = 0; i < outputs.length; i = i + 1) {
        var output = outputs[i];
        var baseParsedAttrField = { mode: constants_1.BINDING_MODE.output, exp: undefined, attrName: '' };
        // & via event
        if (ngAttrs.hasOwnProperty(output.attr)) {
            parsedOutputs[output.prop] = collections_1.StringMapWrapper.assign({}, baseParsedAttrField, { exp: ngAttrs[output.attr], attrName: output.attr });
        }
        else if (ngAttrs.hasOwnProperty(output.parenAttr)) {
            parsedOutputs[output.prop] = collections_1.StringMapWrapper.assign({}, baseParsedAttrField, { exp: ngAttrs[output.parenAttr], attrName: output.parenAttr });
        }
    }
    return { outputs: parsedOutputs };
}
exports._setupOutputs = _setupOutputs;
/**
 * parses input/output/attrs string arrays from metadata fro further processing
 * @param inputs
 * @param outputs
 * @param attrs
 * @returns {{inputs: ParsedBindingsMap, outputs: ParsedBindingsMap, attrs: ParsedBindingsMap}}
 * @private
 * @deprecated
 */
function _parseBindings(_a) {
    var _b = _a.inputs, inputs = _b === void 0 ? [] : _b, _c = _a.outputs, outputs = _c === void 0 ? [] : _c, _d = _a.attrs, attrs = _d === void 0 ? [] : _d;
    var SPLIT_BY = ':';
    return {
        inputs: _parseByMode(inputs, constants_1.BINDING_MODE.twoWay, [constants_1.BINDING_MODE.attr]),
        outputs: _parseByMode(outputs, constants_1.BINDING_MODE.output),
        attrs: collections_1.StringMapWrapper.merge(
        // this will be removed in 2.0
        _parseByMode(attrs, constants_1.BINDING_MODE.attr), 
        // attrs build from @Input('@')
        _parseByMode(inputs, constants_1.BINDING_MODE.twoWay, [constants_1.BINDING_MODE.oneWay, constants_1.BINDING_MODE.twoWay]))
    };
    function _parseByMode(bindingArr, defaultMode, excludeMode) {
        if (excludeMode === void 0) { excludeMode = []; }
        return bindingArr.reduce(function (acc, binding) {
            var _a = binding.split(SPLIT_BY).map(function (part) { return part.trim(); }), name = _a[0], _b = _a[1], modeConfigAndAlias = _b === void 0 ? '' : _b;
            var parsedConfigAndAlias = modeConfigAndAlias.match(constants_1.INPUT_MODE_REGEX);
            var _c = parsedConfigAndAlias || [], _d = _c[1], mode = _d === void 0 ? defaultMode : _d, _e = _c[2], optional = _e === void 0 ? '' : _e, _f = _c[3], alias = _f === void 0 ? '' : _f;
            // exit early if processed mode is not allowed
            // for example if we are parsing Input('@') which produces attr binding instead of one or two way
            if (excludeMode.indexOf(mode) !== -1) {
                return acc;
            }
            // @TODO remove this in next version where template parsing will be implemented
            if ((defaultMode !== constants_1.BINDING_MODE.output) && !(parsedConfigAndAlias && parsedConfigAndAlias[1])) {
                console.warn("\n        You need to explicitly provide type of binding(=,<,@) within your <code>'@Input() " + name + ";</code>.\n        Next version 2.0 will create binding by parsing template if you provide '@Input()' without binding type.\n        ");
            }
            acc[name] = {
                mode: mode,
                alias: alias,
                optional: optional === constants_1.BINDING_MODE.optional || true
            };
            return acc;
        }, {});
    }
}
exports._parseBindings = _parseBindings;
//# sourceMappingURL=binding_parser.js.map