"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var decorators_1 = require("../core/di/decorators");
var Router = (function () {
    function Router() {
    }
    return Router;
}());
exports.Router = Router;
var RootRouter = (function (_super) {
    __extends(RootRouter, _super);
    function RootRouter() {
        return _super.apply(this, arguments) || this;
    }
    return RootRouter;
}(Router));
RootRouter = __decorate([
    decorators_1.Injectable('$rootRouter'),
    __metadata("design:paramtypes", [])
], RootRouter);
exports.RootRouter = RootRouter;
var ChildRouter = (function (_super) {
    __extends(ChildRouter, _super);
    function ChildRouter() {
        return _super.apply(this, arguments) || this;
    }
    return ChildRouter;
}(Router));
ChildRouter = __decorate([
    decorators_1.Injectable('$router'),
    __metadata("design:paramtypes", [])
], ChildRouter);
exports.ChildRouter = ChildRouter;
//# sourceMappingURL=router.js.map