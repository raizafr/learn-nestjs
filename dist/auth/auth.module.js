"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const prisma_service_1 = require("../prisma.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const users_module_1 = require("./users/users.module");
const users_service_1 = require("./users/users.service");
const jwt_strategy_1 = require("./jwt.strategy");
const nodemailer_service_1 = require("../nodemailer/nodemailer.service");
const MailTemplate_1 = require("../utils/MailTemplate");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '2d' },
            }),
            users_module_1.UsersModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            prisma_service_1.PrismaService,
            users_service_1.UsersService,
            jwt_strategy_1.JwtStrategy,
            nodemailer_service_1.NodemailerService,
            MailTemplate_1.MailTemplate,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map