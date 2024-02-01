"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyController = void 0;
const common_1 = require("@nestjs/common");
const dummy_service_1 = require("./dummy.service");
let DummyController = class DummyController {
    constructor(dummyService) {
        this.dummyService = dummyService;
    }
    createManyUsers(res) {
        return this.dummyService.addDummyUser(res);
    }
};
exports.DummyController = DummyController;
__decorate([
    (0, common_1.Get)('create-many-users'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DummyController.prototype, "createManyUsers", null);
exports.DummyController = DummyController = __decorate([
    (0, common_1.Controller)('dummy'),
    __metadata("design:paramtypes", [dummy_service_1.DummyService])
], DummyController);
//# sourceMappingURL=dummy.controller.js.map