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
exports.FollowerController = void 0;
const common_1 = require("@nestjs/common");
const follower_service_1 = require("./follower.service");
const create_follower_dto_1 = require("./dto/create-follower.dto");
let FollowerController = class FollowerController {
    constructor(followerService) {
        this.followerService = followerService;
    }
    addFollower(createFollowerDto, res) {
        return this.followerService.addFollower(createFollowerDto, res);
    }
    removeFollower(createFollowerDto, res) {
        return this.followerService.removeFollower(createFollowerDto, res);
    }
};
exports.FollowerController = FollowerController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_follower_dto_1.CreateFollowerDto, Object]),
    __metadata("design:returntype", void 0)
], FollowerController.prototype, "addFollower", null);
__decorate([
    (0, common_1.Post)('remove'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_follower_dto_1.CreateFollowerDto, Object]),
    __metadata("design:returntype", void 0)
], FollowerController.prototype, "removeFollower", null);
exports.FollowerController = FollowerController = __decorate([
    (0, common_1.Controller)('follower'),
    __metadata("design:paramtypes", [follower_service_1.FollowerService])
], FollowerController);
//# sourceMappingURL=follower.controller.js.map