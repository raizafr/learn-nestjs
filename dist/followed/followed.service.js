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
exports.FollowedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const users_service_1 = require("../auth/users/users.service");
let FollowedService = class FollowedService {
    constructor(prismaService, userService) {
        this.prismaService = prismaService;
        this.userService = userService;
    }
    async addFollowed(createFollowedDto, res) {
        const { userId, followedId } = createFollowedDto;
        try {
            if (userId === followedId) {
                return res
                    .status(409)
                    .json({ message: 'userId and followedId cannot be the same' });
            }
            const userIdNumber = typeof userId === 'string' ? parseInt(userId) : userId;
            const followedIdNumber = typeof followedId === 'string' ? parseInt(followedId) : followedId;
            const findUserId = await this.userService.findById(userIdNumber);
            if (!findUserId) {
                return res
                    .status(404)
                    .json({ message: `user with id ${userId} does not exist` });
            }
            const findFollowedId = await this.userService.findById(followedIdNumber);
            if (!findFollowedId) {
                return res
                    .status(404)
                    .json({ message: `user with id ${followedId} does not exist` });
            }
            const existFollowed = await this.prismaService.followed.findFirst({
                where: { userId: userIdNumber, followedId: followedIdNumber },
            });
            if (existFollowed) {
                return res.status(409).json({ message: 'failed to add, data exists' });
            }
            const add = await this.prismaService.followed.create({
                data: {
                    userId,
                    followedId,
                },
            });
            return res.status(201).json({ message: 'followed added', add });
        }
        catch (err) {
            res.status(500).json({ message: 'internal server error' });
        }
    }
    async removeFollowed(createFollowedDto, res) {
        const { userId, followedId } = createFollowedDto;
        try {
            if (userId === followedId) {
                return res
                    .status(409)
                    .json({ message: 'userId and followedId cannot be the same' });
            }
            const userIdNumber = typeof userId === 'string' ? parseInt(userId) : userId;
            const followedIdNumber = typeof followedId === 'string' ? parseInt(followedId) : followedId;
            const findUserId = await this.userService.findById(userIdNumber);
            if (!findUserId) {
                return res
                    .status(404)
                    .json({ message: `user with id ${userId} does not exist` });
            }
            const findFollowedId = await this.userService.findById(followedIdNumber);
            if (!findFollowedId) {
                return res
                    .status(404)
                    .json({ message: `user with id ${followedId} does not exist` });
            }
            const existFollowed = await this.prismaService.followed.findFirst({
                where: { userId: userIdNumber, followedId: followedIdNumber },
            });
            if (!existFollowed) {
                return res
                    .status(404)
                    .json({ message: 'failed to delete, data is missing' });
            }
            await this.prismaService.followed.delete({
                where: existFollowed,
            });
            return res.status(200).json({ message: 'delete success' });
        }
        catch (err) {
            res.status(500).json({ message: 'internal server error' });
        }
    }
};
exports.FollowedService = FollowedService;
exports.FollowedService = FollowedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], FollowedService);
//# sourceMappingURL=followed.service.js.map