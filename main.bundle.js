webpackJsonp(["main"],{

/***/ "./src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_gendir lazy recursive";

/***/ }),

/***/ "./src/app/app.analytics.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppAnalytics; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__ = __webpack_require__("./node_modules/rxjs/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Simple Google Analytics service. Note that all its methods don't do anything unless the app
 * is deployed on ng-bootstrap.github.io. This avoids sending events and page views during development.
 */
var AppAnalytics = (function () {
    function AppAnalytics(_location, _router) {
        this._location = _location;
        this._router = _router;
        this._enabled = window.location.href.indexOf('ng-bootstrap.github.io') >= 0;
    }
    /**
     * Intended to be called only once. Subscribes to router events and sends a page view
     * after each ended navigation event.
     */
    AppAnalytics.prototype.trackPageViews = function () {
        var _this = this;
        if (this._enabled) {
            __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_filter__["filter"].call(this._router.events, function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* NavigationEnd */]; })
                .subscribe(function () {
                ga('send', { hitType: 'pageview', page: _this._location.path() });
            });
        }
    };
    /**
     * Sends an event.
     */
    AppAnalytics.prototype.trackEvent = function (action, category) {
        if (this._enabled) {
            ga('send', { hitType: 'event', eventCategory: category, eventAction: action });
        }
    };
    return AppAnalytics;
}());
AppAnalytics = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["e" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["e" /* Location */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AppAnalytics);

var _a, _b;
//# sourceMappingURL=app.analytics.js.map

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".center {\n    text-align: center;\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<navbar></navbar>\n<router-outlet></router-outlet>\n<foot></foot>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_analytics__ = __webpack_require__("./src/app/app.analytics.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(_analytics, translate) {
        this._analytics = _analytics;
        this.translate = translate;
        this.navbarCollapsed = true;
        translate.addLangs(["en", "fr", "de", "it", "sp"]);
        translate.setDefaultLang('en');
        var browserLang = document['locale'];
        translate.use(browserLang.match(/en|fr|sp|it|de/) ? browserLang : 'en');
    }
    AppComponent.prototype.ngOnInit = function () {
        this._analytics.trackPageViews();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("./src/app/app.component.html"),
        styles: [__webpack_require__("./src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__app_analytics__["a" /* AppAnalytics */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_analytics__["a" /* AppAnalytics */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_analytics__ = __webpack_require__("./src/app/app.analytics.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__navbar_navbar_module__ = __webpack_require__("./src/app/navbar/navbar.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__foot_foot_module__ = __webpack_require__("./src/app/foot/foot.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_home_module__ = __webpack_require__("./src/app/home/home.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__greoux_greoux_module__ = __webpack_require__("./src/app/greoux/greoux.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__visit_visit_module__ = __webpack_require__("./src/app/visit/visit.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__fares_fares_module__ = __webpack_require__("./src/app/fares/fares.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__equipment_equipment_module__ = __webpack_require__("./src/app/equipment/equipment.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ngx_translate_http_loader__ = __webpack_require__("./node_modules/@ngx-translate/http-loader/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















// AoT requires an exported function for factories
function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_16__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, "assets/locale/", ".json");
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_15__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_15__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: HttpLoaderFactory,
                    deps: [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]]
                }
            }), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_7__navbar_navbar_module__["a" /* NavbarModule */], __WEBPACK_IMPORTED_MODULE_8__foot_foot_module__["a" /* FootModule */], __WEBPACK_IMPORTED_MODULE_9__home_home_module__["a" /* HomeModule */],
            __WEBPACK_IMPORTED_MODULE_10__greoux_greoux_module__["a" /* GreouxModule */], __WEBPACK_IMPORTED_MODULE_11__visit_visit_module__["a" /* VisitModule */], __WEBPACK_IMPORTED_MODULE_12__fares_fares_module__["a" /* FaresModule */], __WEBPACK_IMPORTED_MODULE_13__equipment_equipment_module__["a" /* EquipmentModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */].forRoot([]), __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["b" /* NgbModule */].forRoot()],
        declarations: [__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* AppComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_6__app_analytics__["a" /* AppAnalytics */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./src/app/equipment/equipment.component.css":
/***/ (function(module, exports) {

module.exports = ".row {\n    margin-top: 4%;\n    margin-bottom: 10%;\n}\n.row u {\n    font-size: 42px;\n}\n.row .col-6 {\n    padding-left: 80px;\n    padding-right: 80px;\n}\n.row .col-6 ul.no-bullets li {\n    list-style-type: none;\n}\n[class^=\"fugue-\"] {\n\tbackground-position: 8px center;\n        background-repeat: no-repeat;\n        padding: 16px;\n}\n/*\nsmall icons :\n*/\n.fugue-lift { \n\tbackground-image: url(/greouxlocation/assets/img/equipment/application-dock-090.png) !important; \n}\n.fugue-broom { \n\tbackground-image: url(/greouxlocation/assets/img/equipment/broom.png) !important; \n}\n.fugue-car { \n\tbackground-image: url(/greouxlocation/assets/img/equipment/car.png) !important; \n}\n.fugue-train { \n\tbackground-image: url(/greouxlocation/assets/img/equipment/train.png) !important; \n}\n.fugue-cookies { \n\tbackground-image: url(/greouxlocation/assets/img/equipment/cookies.png) !important; \n}\n.fugue-store { \n\tbackground-image: url(/greouxlocation/assets/img/equipment/store.png) !important; \n}\n.fugue-television { \n\tbackground-image: url(/greouxlocation/assets/img/equipment/television.png) !important; \n}\n.fugue-sun { \n\tbackground-image: url(/greouxlocation/assets/img/equipment/weather.png) !important; \n}\n\n\n"

/***/ }),

/***/ "./src/app/equipment/equipment.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-6\">\n            <u>{{\"equipment.services.title\" | translate}}</u>\n            <ul class=\"no-bullets\">\n                <li>\n                    <span class=\"fugue-broom\"></span>\n                    {{\"equipment.services.broom\" | translate}}\n                </li>\n                <li>\n                    <span class=\"fugue-television\"></span>\n                    {{\"equipment.services.screen\" | translate}}\n                </li>\n                <li>\n                    <span class=\"fugue-cookies\"></span>\n                    {{\"equipment.services.microwaves\" | translate}}\n                </li>\n                <li>\n                    <span class=\"fugue-sun\"></span>\n                    {{\"equipment.services.sun\" | translate}}\n                </li>\n                <li>\n                    <span class=\"fugue-lift\"></span>\n                    {{\"equipment.services.elevators\" | translate}}\n                </li>\n                <li>\n                    <span class=\"fugue-car\"></span>\n                    {{\"equipment.services.parking\" | translate}}\n                </li>\n                <li>\n                    <span class=\"fugue-train\"></span>\n                    {{\"equipment.services.shuttle\" | translate}}\n                </li>\n                <li>\n                    <span class=\"fugue-store\"></span>\n                    {{\"equipment.services.supermarket\" | translate}}\n                </li>\n            </ul>\n        </div>\n        <div class=\"col-6\">\n            <u>{{\"equipment.conditions.title\" | translate}}</u>\n            <ul>\n                <li>\n                    {{\"equipment.conditions.one\" | translate}}\n                </li>\n                <li>\n                    {{\"equipment.conditions.two\" | translate}}\n                </li>\n                <li>\n                    {{\"equipment.conditions.three\" | translate}}\n                </li>\n                <li>\n                    {{\"equipment.conditions.four\" | translate}}\n                </li>\n                <li>\n                    {{\"equipment.conditions.five\" | translate}}\n                </li>\n                <li>\n                    {{\"equipment.conditions.six.one\" | translate}} <a href=\"assets/form.pdf\" target=\"_blank\">{{\"equipment.conditions.six.two\" | translate}}</a> \n                    {{\"equipment.conditions.six.three\" | translate}}\n                    <br/>\n                    {{\"equipment.conditions.six.four\" | translate}}\n                </li>\n            </ul>\n        </div>\n    </div>\n    <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ "./src/app/equipment/equipment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EquipmentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var EquipmentComponent = (function () {
    function EquipmentComponent() {
    }
    return EquipmentComponent;
}());
EquipmentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'equipment-component',
        template: __webpack_require__("./src/app/equipment/equipment.component.html"),
        styles: [__webpack_require__("./src/app/equipment/equipment.component.css")]
    })
], EquipmentComponent);

//# sourceMappingURL=equipment.component.js.map

/***/ }),

/***/ "./src/app/equipment/equipment.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EquipmentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__equipment_routes__ = __webpack_require__("./src/app/equipment/equipment.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var EquipmentModule = (function () {
    function EquipmentModule() {
    }
    return EquipmentModule;
}());
EquipmentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["b" /* NgbModule */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__equipment_routes__["b" /* MODULE_ROUTES */]), __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__equipment_routes__["a" /* MODULE_COMPONENTS */]]
    })
], EquipmentModule);

//# sourceMappingURL=equipment.module.js.map

/***/ }),

/***/ "./src/app/equipment/equipment.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MODULE_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MODULE_COMPONENTS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__equipment_component__ = __webpack_require__("./src/app/equipment/equipment.component.ts");

var CHILD_ROUTES = [];
var MODULE_ROUTES = [
    { path: 'equipment', component: __WEBPACK_IMPORTED_MODULE_0__equipment_component__["a" /* EquipmentComponent */], children: CHILD_ROUTES.slice() }
];
var MODULE_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_0__equipment_component__["a" /* EquipmentComponent */]
];
//# sourceMappingURL=equipment.routes.js.map

/***/ }),

/***/ "./src/app/fares/fares.component.css":
/***/ (function(module, exports) {

module.exports = "\ntable#faresTab {\n    table-layout: fixed;\n}\n\n.row {\n    margin-top: 100px;\n}\n\n.row.stuck {\n    margin-top: 30px;\n}\n\ntable {\n    width: 100%;\n    height: 100%;\n}\n\n.equal-width tr td {\n    width: 50%;\n}\n\n.category-td {\n    background-color: orange;\n    color: #754C78;\n    font-weight: bold;\n}\n"

/***/ }),

/***/ "./src/app/fares/fares.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row\">\n        {{\"fares.title\" | translate}}\n    </div>\n    <div class=\"row stuck\">\n        <table id=\"faresTab\">\n            <tbody>\n                <tr>\n                    <td *ngFor=\"let faresItem of fares\">\n                        <table class=\"equal-width\" border=\"2\" *ngIf=\"faresItem.category !== 'Taxes_de_sejour'\">\n                            <tr>\n                                <td class=\"category-td\">\n                                    {{\"fares.\"+faresItem.category | translate}}\n                                </td>\n                                <td>{{faresItem.value}} &euro;</td>\n                            </tr>\n                        </table>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n    <div class=\"row stuck\">\n        {{\"fares.discount\" | translate}}\n    </div>\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/fares/fares.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaresComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fares_service__ = __webpack_require__("./src/app/fares/fares.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FaresComponent = (function () {
    function FaresComponent(_dataService) {
        this._dataService = _dataService;
    }
    FaresComponent.prototype.ngOnInit = function () {
        this.getAllItems();
    };
    FaresComponent.prototype.getAllItems = function () {
        var _this = this;
        this._dataService
            .getFares()
            .subscribe(function (data) {
            return _this.fares = data;
        }, function (error) {
            return console.log(error);
        }, function () {
            return console.log('Get all Items complete');
        });
    };
    return FaresComponent;
}());
FaresComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'fares-component',
        providers: [__WEBPACK_IMPORTED_MODULE_1__fares_service__["a" /* FaresService */]],
        template: __webpack_require__("./src/app/fares/fares.component.html"),
        styles: [__webpack_require__("./src/app/fares/fares.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__fares_service__["a" /* FaresService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__fares_service__["a" /* FaresService */]) === "function" && _a || Object])
], FaresComponent);

var _a;
//# sourceMappingURL=fares.component.js.map

/***/ }),

/***/ "./src/app/fares/fares.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaresModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__fares_routes__ = __webpack_require__("./src/app/fares/fares.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var FaresModule = (function () {
    function FaresModule() {
    }
    return FaresModule;
}());
FaresModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["b" /* NgbModule */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__fares_routes__["b" /* MODULE_ROUTES */]), __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__fares_routes__["a" /* MODULE_COMPONENTS */]]
    })
], FaresModule);

//# sourceMappingURL=fares.module.js.map

/***/ }),

/***/ "./src/app/fares/fares.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MODULE_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MODULE_COMPONENTS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fares_component__ = __webpack_require__("./src/app/fares/fares.component.ts");

var CHILD_ROUTES = [];
var MODULE_ROUTES = [
    { path: 'fares', component: __WEBPACK_IMPORTED_MODULE_0__fares_component__["a" /* FaresComponent */], children: CHILD_ROUTES.slice() }
];
var MODULE_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_0__fares_component__["a" /* FaresComponent */]
];
//# sourceMappingURL=fares.routes.js.map

/***/ }),

/***/ "./src/app/fares/fares.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaresService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FaresService = (function () {
    function FaresService(_http) {
        this._http = _http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    FaresService.prototype.getFares = function () {
        return this._http.get("assets/data/fares.json")
            .map(function (response) {
            var fares = response.json();
            fares.forEach(function (elt) {
                if (elt.category === "Taxes_de_sejour") {
                    elt.value /= 100;
                }
            });
            return fares;
        })
            .catch(this.handleError);
    };
    FaresService.prototype.handleError = function (error) {
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    };
    return FaresService;
}());
FaresService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], FaresService);

var _a;
//# sourceMappingURL=fares.service.js.map

/***/ }),

/***/ "./src/app/foot/foot.component.css":
/***/ (function(module, exports) {

module.exports = ".footer {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    height: 150px;\n    width: 100%;\n    background-color: orange;\n    color: #754C78;\n    font-weight: bold;\n}\n.row {\n    padding-right: 30px;\n    padding-left: 30px;\n}\n.row i {\n    color: black;\n    padding-right: 20px;\n}"

/***/ }),

/***/ "./src/app/foot/foot.component.html":
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\n    <div class=\"row\">\n        <div class=\"col-4\">\n            <i class=\"fa fa-pencil-square-o fa-lg\"></i>\n            <u>{{\"footer.address\" | translate}}</u> <br/>\n            Mr et Mme ANNE<br/>\n            Les jardins d’Emilie, Bt C<br/>\n            42, traverse Rottweil<br/>\n            83400 Hyères<br/>\n            FRANCE\n        </div>\n        <div class=\"col-4\">\n            <i class=\"fa fa-phone fa-lg\"></i> \n            <u>{{\"footer.phone\" | translate}}</u> <br/>\n            <div>\n                {{\"footer.landline\" | translate}} +33(0)9.50.24.42.73.<br/>\n                {{\"footer.mobile\" | translate}} +33(0)6.14.90.88.30.\n            </div>\n        </div>\n        <div class=\"col-4\">\n            <i class=\"fa fa-envelope fa-lg\"></i>\n            <u>\n                {{\"footer.email\" | translate}}\n            </u> <br/>\n            raymond . anne + greoux @ gmail . com\n            <br/><br/>\n            <a href=\"assets/form.pdf\"  target=\"_blank\" class=\"btn btn-primary btn-lg btn-block\">\n                <i class=\"fa fa-key\"></i> \n                {{\"footer.form\" | translate}}\n            </a>\n        </div>\n    </div>\n</footer>\n"

/***/ }),

/***/ "./src/app/foot/foot.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FootComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FootComponent = (function () {
    function FootComponent() {
    }
    return FootComponent;
}());
FootComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'foot',
        template: __webpack_require__("./src/app/foot/foot.component.html"),
        styles: [__webpack_require__("./src/app/foot/foot.component.css")]
    })
], FootComponent);

//# sourceMappingURL=foot.component.js.map

/***/ }),

/***/ "./src/app/foot/foot.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FootModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foot_component__ = __webpack_require__("./src/app/foot/foot.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var FootModule = (function () {
    function FootModule() {
    }
    return FootModule;
}());
FootModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["b" /* NgbModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__foot_component__["a" /* FootComponent */]],
        exports: [__WEBPACK_IMPORTED_MODULE_4__foot_component__["a" /* FootComponent */]]
    })
], FootModule);

//# sourceMappingURL=foot.module.js.map

/***/ }),

/***/ "./src/app/greoux/greoux.component.css":
/***/ (function(module, exports) {

module.exports = "table {\n    border-style: inset;\n    margin-top: 100px;\n}\ntable tr td:first-child {\n    padding-right: 10px;\n}\ntable tr:first-child td {\n    padding-top: 0px;\n}\ntable tr td {\n    padding-top: 20px;\n}\ntable tr td .row {\n    margin-left: -3px;\n}"

/***/ }),

/***/ "./src/app/greoux/greoux.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-6\">\n            <table>\n                <tbody>\n                    <tr>\n                        <td>\n                            <i class=\"fa fa-plane fa-3x\"></i>\n                        </td>\n                        <td>\n                            <u>{{\"greoux.plane\"| translate}}</u>\n                            <div class=\"row\">\n                                {{\"greoux.airport\"| translate}}\n                            </div>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <i class=\"fa fa-train fa-3x\"></i>\n                        </td>\n                        <td>\n                            <u>{{\"greoux.train\"| translate}}</u>\n                            <div class=\"row\">\n                                {{\"greoux.railway\"| translate}}\n                            </div>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <i class=\"fa fa-car fa-3x\"></i>\n                        </td>\n                        <td>\n                            <u>{{\"greoux.car\"| translate}}</u>\n                            <div class=\"row\">\n                                {{\"greoux.motorway\"| translate}}\n                            </div>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n            <div class=\"row\">\n                {{\"greoux.canyon\"| translate}}\n            </div>\n            <div class=\"row\">\n                {{\"greoux.aix\"| translate}}\n            </div>\n        </div>\n        <div class=\"col-6\">\n            <iframe width=\"100%\" height=\"500px\" frameborder=\"0\" scrolling=\"no\"\n                    marginheight=\"0\" marginwidth=\"0\"\n                    src=\"https://maps.google.fr/maps?f=d&amp;hl=fr&amp;geocode=&amp;saddr=Chemin+de+Sainte-Annette,+04800+Gr%C3%A9oux-les-Bains&amp;daddr=&amp;mra=pr&amp;sll=43.770102,5.873566&amp;sspn=0.38874,0.922852&amp;ie=UTF8&amp;ll=43.770102,5.873566&amp;spn=0.38874,0.922852&amp;output=embed&amp;s=AARTsJrTLWLWMKcVQ4tAB20zIJURDyWQCA\"></iframe>\n            <br />\n            <a href=\"https://maps.google.fr/maps?f=d&amp;hl=fr&amp;geocode=&amp;saddr=Chemin+de+Sainte-Annette,+04800+Gr%C3%A9oux-les-Bains&amp;daddr=&amp;mra=pr&amp;sll=43.770102,5.873566&amp;sspn=0.38874,0.922852&amp;ie=UTF8&amp;ll=43.770102,5.873566&amp;spn=0.38874,0.922852&amp;source=embed\" style=\"color:#0000FF;text-align:left\">\n                Google Maps\n            </a>\n        </div>\n    </div>\n    <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./src/app/greoux/greoux.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GreouxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GreouxComponent = (function () {
    function GreouxComponent() {
    }
    return GreouxComponent;
}());
GreouxComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'greoux-component',
        template: __webpack_require__("./src/app/greoux/greoux.component.html"),
        styles: [__webpack_require__("./src/app/greoux/greoux.component.css")]
    })
], GreouxComponent);

//# sourceMappingURL=greoux.component.js.map

/***/ }),

/***/ "./src/app/greoux/greoux.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GreouxModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__greoux_routes__ = __webpack_require__("./src/app/greoux/greoux.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var GreouxModule = (function () {
    function GreouxModule() {
    }
    return GreouxModule;
}());
GreouxModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["b" /* NgbModule */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__greoux_routes__["b" /* MODULE_ROUTES */]), __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__greoux_routes__["a" /* MODULE_COMPONENTS */]]
    })
], GreouxModule);

//# sourceMappingURL=greoux.module.js.map

/***/ }),

/***/ "./src/app/greoux/greoux.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MODULE_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MODULE_COMPONENTS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__greoux_component__ = __webpack_require__("./src/app/greoux/greoux.component.ts");

var CHILD_ROUTES = [];
var MODULE_ROUTES = [
    { path: 'greoux', component: __WEBPACK_IMPORTED_MODULE_0__greoux_component__["a" /* GreouxComponent */], children: CHILD_ROUTES.slice() }
];
var MODULE_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_0__greoux_component__["a" /* GreouxComponent */]
];
//# sourceMappingURL=greoux.routes.js.map

/***/ }),

/***/ "./src/app/home/bootstrap/carousel.component.html":
/***/ (function(module, exports) {

module.exports = "<ngb-carousel>\n    <ng-template ngbSlide>\n        <img src=\"assets/img/carousel/landscape.jpg\" alt=\"Landscape\">\n        <div class=\"carousel-caption dark\">\n            <h3>\n                {{\"home.one\"| translate}}\n            </h3>\n        </div>\n    </ng-template>\n    <ng-template ngbSlide>\n        <img src=\"assets/img/carousel/cure.jpg\"  alt=\"Cure\">\n        <div class=\"carousel-caption dark\">\n            <h3>\n                {{\"home.two\"| translate}}\n            </h3>\n        </div>\n    </ng-template>\n    <ng-template ngbSlide>\n        <img src=\"assets/img/carousel/apartment.jpg\" alt=\"Apartment\">\n        <div class=\"carousel-caption dark\">\n            <h3>\n                {{\"home.three.one\"| translate}}\n                <br/>\n                {{\"home.three.two\"| translate}}\n                <br/>\n                {{\"home.three.three\"| translate}}\n            </h3>\n        </div>\n    </ng-template>\n</ngb-carousel>\n<div class=\"row small disclaimer\">\n   {{\"gdpr.disclaimer\"| translate}}\n</div>\n"

/***/ }),

/***/ "./src/app/home/bootstrap/carousel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GreouxCarousel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GreouxCarousel = (function () {
    function GreouxCarousel(config) {
        // customize default values of carousels used by this component tree
        config.interval = 4500;
        config.wrap = true;
        config.keyboard = false;
    }
    return GreouxCarousel;
}());
GreouxCarousel = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngbd-carousel-config',
        template: __webpack_require__("./src/app/home/bootstrap/carousel.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* NgbCarouselConfig */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* NgbCarouselConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* NgbCarouselConfig */]) === "function" && _a || Object])
], GreouxCarousel);

var _a;
//# sourceMappingURL=carousel.component.js.map

/***/ }),

/***/ "./src/app/home/home.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <ngbd-carousel-config></ngbd-carousel-config>\n    <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'home-component',
        template: __webpack_require__("./src/app/home/home.component.html"),
        styles: [__webpack_require__("./src/app/home/home.component.css")]
    })
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "./src/app/home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bootstrap_carousel_component__ = __webpack_require__("./src/app/home/bootstrap/carousel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_routes__ = __webpack_require__("./src/app/home/home.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["b" /* NgbModule */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__home_routes__["b" /* MODULE_ROUTES */]), __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__home_routes__["a" /* MODULE_COMPONENTS */], __WEBPACK_IMPORTED_MODULE_4__bootstrap_carousel_component__["a" /* GreouxCarousel */]]
    })
], HomeModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ "./src/app/home/home.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MODULE_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MODULE_COMPONENTS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_component__ = __webpack_require__("./src/app/home/home.component.ts");

var CHILD_ROUTES = [];
var MODULE_ROUTES = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_0__home_component__["a" /* HomeComponent */], children: CHILD_ROUTES.slice() }
];
var MODULE_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_0__home_component__["a" /* HomeComponent */]
];
//# sourceMappingURL=home.routes.js.map

/***/ }),

/***/ "./src/app/navbar/navbar-routes.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navbar_metadata__ = __webpack_require__("./src/app/navbar/navbar.metadata.ts");

var ROUTES = [
    { path: '', title: 'navbar.title', menuType: __WEBPACK_IMPORTED_MODULE_0__navbar_metadata__["a" /* MenuType */].BRAND },
    { path: 'greoux', title: 'navbar.greoux', menuType: __WEBPACK_IMPORTED_MODULE_0__navbar_metadata__["a" /* MenuType */].LEFT },
    { path: 'visit', title: 'navbar.visit', menuType: __WEBPACK_IMPORTED_MODULE_0__navbar_metadata__["a" /* MenuType */].LEFT },
    { path: 'fares', title: 'navbar.fares', menuType: __WEBPACK_IMPORTED_MODULE_0__navbar_metadata__["a" /* MenuType */].LEFT },
    { path: 'equipment', title: 'navbar.equipment', menuType: __WEBPACK_IMPORTED_MODULE_0__navbar_metadata__["a" /* MenuType */].LEFT }
];
//# sourceMappingURL=navbar-routes.config.js.map

/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/***/ (function(module, exports) {

module.exports = ".navbar-toggler {\n    border: solid 1px silver;\n    border-radius: 2px;\n    color: #eee;\n}\n.navbar-brand > img {\n    margin: -15px; \n    height: 70px;\n}\nnav {\n    height: 70px;\n    background-color: orange;\n}\n.nav-item > a {\n    height: 70px;\n    font-size: 28px;\n    padding-right: 20px;\n    padding-left: 20px;\n}\n.nav-item > a.active {\n    color: #754C78;\n    background-color: lightsalmon;\n}\n.nav-item > a.navbar-brand,\n.nav-item > a.navbar-brand:focus,\n.nav-item > a:hover {\n    background-color: darkorange;\n    color: #754C78;\n    font-size: 28px;\n    padding-right: 20px;\n    padding-left: 20px;\n}\n.nav-item > a.navbar-brand  {\n    padding-top: 9px;\n}\n.nav-item > a  {\n    color: #754C78;\n    padding-top: 11px;\n}\nnav a {\n    color: #754C78;   \n}\n.dropdown-menu {\n    min-width: 50px;\n}\n.dropdown-menu a.dropdown-item img {\n    height: 20px;\n}"

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-toggleable-md navbar-light bg-faded\">\n    <button class=\"navbar-toggler navbar-toggler-right\" \n            type=\"button\" data-toggle=\"collapse\" \n            data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" \n            aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n    </button>\n    <a class=\"navbar-brand\" href=\"#\">\n        <img [src]=\"fullImagePath\"/>\n    </a>\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n        <ul class=\"navbar-nav mr-auto\">\n            <li class=\"nav-item active\">\n                <a class=\"navbar-link navbar-brand\" [routerLink]=\"[brandMenu.path]\">\n                    {{brandMenu.title | translate}}\n                    <span class=\"sr-only\">(current)</span>\n                </a>\n            </li>\n            <li class=\"nav-item\"  *ngFor=\"let menuItem of menuItems\" routerLinkActive=\"active\">\n                <a class=\"nav-link\" [routerLink]=\"[menuItem.path]\" routerLinkActive=\"active\">\n                    {{menuItem.title | translate}}\n                </a>\n            </li>\n        </ul>\n        <ul class=\"navbar-nav\">\n            <li class=\"nav-item\" ngbDropdown>\n                <a class=\"nav-link dropdown\" \n                   id=\"navbarDropdownMenuLink\" \n                   data-toggle=\"dropdown\" \n                   aria-haspopup=\"true\" \n                   aria-expanded=\"false\" ngbDropdownToggle>\n                    {{\"navbar.language\" | translate}}\n                </a>\n                <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdownMenuLink\">\n                    <a class=\"dropdown-item\" href=\"?locale=fr\">\n                        <img src=\"assets/img/flags/fr.svg\"/>\n                    </a>\n                    <a class=\"dropdown-item\" href=\"?locale=en\">\n                        <img src=\"assets/img/flags/en.svg\"/>            \n                    </a>\n                    <a class=\"dropdown-item\" href=\"?locale=sp\">\n                        <img src=\"assets/img/flags/sp.svg\"/>            \n                    </a>\n                    <a class=\"dropdown-item\" href=\"?locale=de\">\n                        <img src=\"assets/img/flags/de.svg\"/>            \n                    </a>\n                    <a class=\"dropdown-item\" href=\"?locale=it\">\n                        <img src=\"assets/img/flags/it.svg\"/>            \n                    </a>\n                </div>\n            </li>\n        </ul>\n    </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navbar_routes_config__ = __webpack_require__("./src/app/navbar/navbar-routes.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__navbar_metadata__ = __webpack_require__("./src/app/navbar/navbar.metadata.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavbarComponent = (function () {
    function NavbarComponent() {
        this.isCollapsed = true;
        this.fullImagePath = 'assets/img/ind_sight_of_greoux.jpg';
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.menuItems = __WEBPACK_IMPORTED_MODULE_1__navbar_routes_config__["a" /* ROUTES */].filter(function (menuItem) { return menuItem.menuType !== __WEBPACK_IMPORTED_MODULE_2__navbar_metadata__["a" /* MenuType */].BRAND; });
        this.brandMenu = __WEBPACK_IMPORTED_MODULE_1__navbar_routes_config__["a" /* ROUTES */].filter(function (menuItem) { return menuItem.menuType === __WEBPACK_IMPORTED_MODULE_2__navbar_metadata__["a" /* MenuType */].BRAND; })[0];
    };
    NavbarComponent.prototype.getMenuItemClasses = function (menuItem) {
        return {
            'pull-xs-right': this.isCollapsed && menuItem.menuType === __WEBPACK_IMPORTED_MODULE_2__navbar_metadata__["a" /* MenuType */].RIGHT
        };
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'navbar',
        template: __webpack_require__("./src/app/navbar/navbar.component.html"),
        styles: [__webpack_require__("./src/app/navbar/navbar.component.css")]
    }),
    __metadata("design:paramtypes", [])
], NavbarComponent);

//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ "./src/app/navbar/navbar.metadata.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuType; });
var MenuType;
(function (MenuType) {
    MenuType[MenuType["BRAND"] = 0] = "BRAND";
    MenuType[MenuType["LEFT"] = 1] = "LEFT";
    MenuType[MenuType["RIGHT"] = 2] = "RIGHT";
})(MenuType || (MenuType = {}));
//# sourceMappingURL=navbar.metadata.js.map

/***/ }),

/***/ "./src/app/navbar/navbar.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__navbar_component__ = __webpack_require__("./src/app/navbar/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var NavbarModule = (function () {
    function NavbarModule() {
    }
    return NavbarModule;
}());
NavbarModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["b" /* NgbModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__navbar_component__["a" /* NavbarComponent */]],
        exports: [__WEBPACK_IMPORTED_MODULE_4__navbar_component__["a" /* NavbarComponent */]]
    })
], NavbarModule);

//# sourceMappingURL=navbar.module.js.map

/***/ }),

/***/ "./src/app/visit/visit.component.css":
/***/ (function(module, exports) {

module.exports = ".container-fluid {\n    margin-top: 10%;\n}"

/***/ }),

/***/ "./src/app/visit/visit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <ng2-image-gallery [images]=\"myImages\"></ng2-image-gallery>\n    <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ "./src/app/visit/visit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__visit_metadata__ = __webpack_require__("./src/app/visit/visit.metadata.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VisitComponent = (function () {
    function VisitComponent() {
        var listNames = ["IM000521", "IM000523", "im000043", "im000044", "im000057",
            "im000058", "im000060", "im000066", "im000069", "im000073", "im000076",
            "jm1", "jm2", "jm3", "jm4", "jm5"];
        this.myImages = [];
        for (var _i = 0, listNames_1 = listNames; _i < listNames_1.length; _i++) {
            var entry = listNames_1[_i];
            var ii = new __WEBPACK_IMPORTED_MODULE_1__visit_metadata__["a" /* ImageInterface */](entry);
            this.myImages.push(ii);
        }
    }
    return VisitComponent;
}());
VisitComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'visit-component',
        template: __webpack_require__("./src/app/visit/visit.component.html"),
        styles: [__webpack_require__("./src/app/visit/visit.component.css")]
    }),
    __metadata("design:paramtypes", [])
], VisitComponent);

//# sourceMappingURL=visit.component.js.map

/***/ }),

/***/ "./src/app/visit/visit.metadata.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageInterface; });
var ImageInterface = (function () {
    function ImageInterface(file) {
        this.file = file;
        this.pathBase = "assets/img/gallery/";
        this.thumbnailsBase = "thumbnails/";
        this.extension = ".jpg";
        this.thumbnail = this.pathBase + this.thumbnailsBase + file + this.extension;
        this.image = this.pathBase + file + this.extension;
    }
    return ImageInterface;
}());

//# sourceMappingURL=visit.metadata.js.map

/***/ }),

/***/ "./src/app/visit/visit.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_image_gallery__ = __webpack_require__("./node_modules/ng2-image-gallery/dist/ng2-image-gallery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__visit_routes__ = __webpack_require__("./src/app/visit/visit.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var VisitModule = (function () {
    function VisitModule() {
    }
    return VisitModule;
}());
VisitModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["b" /* NgbModule */], __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_4_ng2_image_gallery__["a" /* Ng2ImageGalleryModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__visit_routes__["b" /* MODULE_ROUTES */]), __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__visit_routes__["a" /* MODULE_COMPONENTS */]]
    })
], VisitModule);

//# sourceMappingURL=visit.module.js.map

/***/ }),

/***/ "./src/app/visit/visit.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MODULE_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MODULE_COMPONENTS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__visit_component__ = __webpack_require__("./src/app/visit/visit.component.ts");

var CHILD_ROUTES = [];
var MODULE_ROUTES = [
    { path: 'visit', component: __WEBPACK_IMPORTED_MODULE_0__visit_component__["a" /* VisitComponent */], children: CHILD_ROUTES.slice() }
];
var MODULE_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_0__visit_component__["a" /* VisitComponent */]
];
//# sourceMappingURL=visit.routes.js.map

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




var getParameterByName = function (name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};
var loc = getParameterByName("locale", null);
if (loc === undefined || loc === "" || loc === null) {
    loc = navigator['language'] || navigator['userLanguage'];
}
if (loc === "en-US" || loc === "en-GB") {
    loc = "en";
}
document['locale'] = loc;
if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map