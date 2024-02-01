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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const speakeasy = require("speakeasy");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma.service");
const nodemailer_service_1 = require("../../nodemailer/nodemailer.service");
const MailTemplate_1 = require("../../utils/MailTemplate");
let UsersService = class UsersService {
    constructor(prisma, nodemailerService, mailTemplate) {
        this.prisma = prisma;
        this.nodemailerService = nodemailerService;
        this.mailTemplate = mailTemplate;
    }
    async create(registerUserDto, res) {
        try {
            const { email, password, userName, fullName } = registerUserDto;
            const findUserByEmail = await this.findOne(email);
            if (findUserByEmail) {
                return res.status(409).json({ message: `${email} already exist` });
            }
            const findUserByUsername = await this.findByUsername(userName);
            if (findUserByUsername) {
                return res.status(409).json({ message: `${userName} already exist` });
            }
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            const secreat = speakeasy.generateSecret();
            const otp = speakeasy.totp({
                encoding: 'base32',
                secret: secreat.base32,
            });
            const createUser = await this.prisma.user.create({
                data: {
                    email,
                    fullName,
                    userName,
                    otpCode: otp,
                    isActive: false,
                    password: hash,
                },
            });
            await this.nodemailerService.sendMail({
                from: process.env.MAIL_USER,
                to: email,
                subject: 'OTP CODE',
                html: this.mailTemplate.verificationTemplate(userName, otp),
            });
            delete createUser.password;
            return res
                .status(201)
                .json({ message: `OTP code has been sent to ${email}`, createUser });
        }
        catch (err) {
            return err;
        }
    }
    async findOne(email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: email },
            });
            if (!user)
                return null;
            return user;
        }
        catch (err) {
            return err;
        }
    }
    async findByUsername(userName) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { userName: userName },
            });
            if (!user)
                return null;
            return user;
        }
        catch (err) {
            return err;
        }
    }
    async findById(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user)
                return null;
            return user;
        }
        catch (err) {
            return err;
        }
    }
    async updateProfil(updateProfilDto, res) {
        try {
            const { userId, fullName, userName, profilePictureUrl, bio, gender } = updateProfilDto;
            const findUserById = await this.findById(userId);
            if (!findUserById) {
                return res.status(404).json({ message: `user id ${userId} not found` });
            }
            const updateUser = await this.prisma.user.update({
                where: { id: userId },
                data: {
                    fullName: fullName,
                    userName: userName,
                    profilePictureUrl: profilePictureUrl,
                    bio: bio,
                    gender: gender,
                    updatedAt: new Date(),
                },
            });
            delete updateUser.otpCode;
            delete updateUser.isActive;
            delete updateUser.password;
            return res.status(201).json({ message: 'update success', updateUser });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'internal server error' });
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        nodemailer_service_1.NodemailerService,
        MailTemplate_1.MailTemplate])
], UsersService);
//# sourceMappingURL=users.service.js.map