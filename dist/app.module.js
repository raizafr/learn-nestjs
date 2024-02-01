"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const upload_module_1 = require("./upload/upload.module");
const follower_module_1 = require("./follower/follower.module");
const followed_module_1 = require("./followed/followed.module");
const dummy_module_1 = require("./dummy/dummy.module");
const post_module_1 = require("./post/post.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        imports: [auth_module_1.AuthModule, upload_module_1.UploadModule, follower_module_1.FollowerModule, followed_module_1.FollowedModule, dummy_module_1.DummyModule, post_module_1.PostModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map