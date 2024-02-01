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
exports.FollowerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const users_service_1 = require("../auth/users/users.service");
let FollowerService = class FollowerService {
    constructor(prismaService, userService) {
        this.prismaService = prismaService;
        this.userService = userService;
    }
    async addFollower(createFollowerDto, res) {
        const { userId, followerId } = createFollowerDto;
        try {
            if (userId === followerId) {
                return res
                    .status(409)
                    .json({ message: 'userId and followerId cannot be the same' });
            }
            const userIdNumber = typeof userId === 'string' ? parseInt(userId) : userId;
            const followerIdNumber = typeof followerId === 'string' ? parseInt(followerId) : followerId;
            const findUserId = await this.userService.findById(userIdNumber);
            if (!findUserId) {
                return res
                    .status(404)
                    .json({ message: `user with id ${userId} does not exist` });
            }
            const findFollowerId = await this.userService.findById(followerIdNumber);
            if (!findFollowerId) {
                return res
                    .status(404)
                    .json({ message: `user with id ${followerId} does not exist` });
            }
            const existFollower = await this.prismaService.follower.findFirst({
                where: { userId: userIdNumber, followerId: followerIdNumber },
            });
            if (existFollower) {
                return res.status(409).json({ message: 'failed to add, data exists' });
            }
            const add = await this.prismaService.follower.create({
                data: {
                    userId,
                    followerId,
                },
            });
            return res.status(201).json({ message: 'follower added', add });
        }
        catch (err) {
            res.status(500).json({ message: 'internal server error' });
        }
    }
    async removeFollower(createFollowerDto, res) {
        const { userId, followerId } = createFollowerDto;
        try {
            if (userId === followerId) {
                return res
                    .status(409)
                    .json({ message: 'userId and followerId cannot be the same' });
            }
            const userIdNumber = typeof userId === 'string' ? parseInt(userId) : userId;
            const followerIdNumber = typeof followerId === 'string' ? parseInt(followerId) : followerId;
            const findUserId = await this.userService.findById(userIdNumber);
            if (!findUserId) {
                return res
                    .status(404)
                    .json({ message: `user with id ${userId} does not exist` });
            }
            const findFollowerId = await this.userService.findById(followerIdNumber);
            if (!findFollowerId) {
                return res
                    .status(404)
                    .json({ message: `user with id ${followerId} does not exist` });
            }
            const existFollower = await this.prismaService.follower.findFirst({
                where: { userId: userIdNumber, followerId: followerIdNumber },
            });
            if (!existFollower) {
                return res
                    .status(404)
                    .json({ message: 'failed to delete, data is missing' });
            }
            await this.prismaService.follower.delete({
                where: existFollower,
            });
            return res.status(200).json({ message: 'delete success' });
        }
        catch (err) {
            res.status(500).json({ message: 'internal server error' });
        }
    }
};
exports.FollowerService = FollowerService;
exports.FollowerService = FollowerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], FollowerService);
//# sourceMappingURL=follower.service.js.map