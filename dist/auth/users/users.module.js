"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const prisma_service_1 = require("../../prisma.service");
const users_controller_1 = require("./users.controller");
const nodemailer_module_1 = require("../../nodemailer/nodemailer.module");
const nodemailer_service_1 = require("../../nodemailer/nodemailer.service");
const MailTemplate_1 = require("../../utils/MailTemplate");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [nodemailer_module_1.NodemailerModule],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, prisma_service_1.PrismaService, nodemailer_service_1.NodemailerService, MailTemplate_1.MailTemplate],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map