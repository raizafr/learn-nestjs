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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../auth/users/users.service");
const prisma_service_1 = require("../prisma.service");
let PostService = class PostService {
    constructor(userService, prismaService) {
        this.userService = userService;
        this.prismaService = prismaService;
    }
    async createNewPost(createPostDto, res) {
        const { userId, content, caption } = createPostDto;
        try {
            const userIdNumber = typeof userId === 'string' ? parseInt(userId) : userId;
            const findUserId = await this.userService.findById(userIdNumber);
            if (!findUserId) {
                return res.status(404).json({ message: `${userId} not found` });
            }
            for (const cont of content) {
                if (!cont.name || !cont.path) {
                    return res.status(400).json({
                        message: 'Invalid content. content must have name and path properties',
                    });
                }
            }
            const newPost = await this.prismaService.post.create({
                data: {
                    userId: userIdNumber,
                    caption,
                    content: {
                        create: content.map((item) => ({
                            name: item.name,
                            path: item.path,
                        })),
                    },
                },
            });
            return res.status(201).json({ message: 'created post', newPost });
        }
        catch (err) {
            return res.status(500).json({ message: 'internal server error' });
        }
    }
    async deletePost(deletePostDto, res) {
        const { postId } = deletePostDto;
        try {
            const findPost = await this.prismaService.post.findUnique({
                where: { id: postId },
            });
            if (!findPost) {
                return res.status(404).json({ message: `post id ${postId} not found` });
            }
            await this.prismaService.content.deleteMany({
                where: {
                    postId,
                },
            });
            await this.prismaService.post.delete({
                where: {
                    id: postId,
                },
            });
            return res
                .status(200)
                .json({ message: `post id ${postId} delete success` });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'internal server error' });
        }
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        prisma_service_1.PrismaService])
], PostService);
//# sourceMappingURL=post.service.js.map