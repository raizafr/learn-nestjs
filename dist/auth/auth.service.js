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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
const speakeasy = require("speakeasy");
const nodemailer_service_1 = require("../nodemailer/nodemailer.service");
const MailTemplate_1 = require("../utils/MailTemplate");
let AuthService = class AuthService {
    constructor(usersService, jwtService, prisma, nodemailerService, mailTemplate) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.nodemailerService = nodemailerService;
        this.mailTemplate = mailTemplate;
    }
    async validateUser(loginUserDto, res) {
        try {
            const user = await this.usersService.findOne(loginUserDto.email);
            if (!user) {
                res.status(404).json({ message: `${loginUserDto.email} not found` });
            }
            if (!user.isActive) {
                res.status(401).json({ message: `${user.email} not yet verified` });
            }
            const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
            if (!isMatch) {
                res.status(401).json({ message: 'wrong password' });
            }
            return res.status(200).json({
                message: 'login success',
                access_token: this.jwtService.sign(loginUserDto),
            });
        }
        catch (err) {
            throw err;
        }
    }
    async login(loginUserDto, res) {
        try {
            const response = await this.validateUser(loginUserDto, res);
            return response;
        }
        catch (err) {
            return err;
        }
    }
    async getUserFromToken(token, res) {
        try {
            const { email } = this.jwtService.verify(token);
            const dataUser = await this.usersService.findOne(email);
            if (!dataUser.isActive) {
                return res.status(401).json({ message: `${email} not yet verified` });
            }
            delete dataUser.password;
            delete dataUser.otpCode;
            return res.status(200).json({ dataUser });
        }
        catch (err) {
            return err;
        }
    }
    logout(req, res) {
        res.clearCookie('access_token');
        return res.status(200).json({ message: 'Logout berhasil' });
    }
    async resendOtpCode(resendEmailAuthDto, res) {
        try {
            const { email } = resendEmailAuthDto;
            const user = await this.usersService.findOne(email);
            if (!user) {
                return res.status(404).json({ message: `${email} not found` });
            }
            const secreat = speakeasy.generateSecret();
            const otp = speakeasy.totp({
                encoding: 'base32',
                secret: secreat.base32,
            });
            await this.prisma.user.update({
                where: { email },
                data: { otpCode: otp },
            });
            await this.nodemailerService.sendMail({
                from: process.env.MAIL_USER,
                to: email,
                subject: 'OTP CODE',
                html: this.mailTemplate.verificationTemplate(user.userName, otp),
            });
            return res.status(200).json({ message: `resend email to ${email}` });
        }
        catch (err) {
            throw err;
        }
    }
    async verifyOtp(verificationOtpAuthDto, res) {
        try {
            const { email, otpCode } = verificationOtpAuthDto;
            const user = await this.usersService.findOne(email);
            if (!user) {
                return res.status(404);
                throw new common_1.NotFoundException(`${email} not found`);
            }
            if (otpCode === user.otpCode) {
                await this.prisma.user.update({
                    where: { email },
                    data: { isActive: true },
                });
                return res.status(200).json({ message: 'verification success' });
            }
            return res.status(401).json({ message: 'verification failed' });
        }
        catch (err) {
            throw err;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService,
        nodemailer_service_1.NodemailerService,
        MailTemplate_1.MailTemplate])
], AuthService);
//# sourceMappingURL=auth.service.js.map