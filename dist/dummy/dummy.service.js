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
exports.DummyService = void 0;
const common_1 = require("@nestjs/common");
const faker_1 = require("@faker-js/faker");
const prisma_service_1 = require("../prisma.service");
let DummyService = class DummyService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async addDummyUser(res) {
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = {
                email: faker_1.faker.internet.email(),
                fullName: faker_1.faker.person.fullName(),
                userName: faker_1.faker.internet.userName(),
                otpCode: faker_1.faker.string.numeric(),
                isActive: true,
                profilePictureUrl: `https://picsum.photos/500/500?random=${i}`,
                bio: faker_1.faker.lorem.sentence(),
                gender: faker_1.faker.person.gender(),
                password: faker_1.faker.internet.password(),
            };
            users.push(user);
        }
        try {
            const createUser = await this.prismaService.user.createMany({
                data: users,
            });
            res.status(201).json(createUser);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'internal server error' });
        }
    }
};
exports.DummyService = DummyService;
exports.DummyService = DummyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DummyService);
//# sourceMappingURL=dummy.service.js.map