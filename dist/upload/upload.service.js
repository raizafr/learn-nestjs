"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
let UploadService = class UploadService {
    uploadProfileImage(createUploadDto, file, res) {
        const { userId } = createUploadDto;
        const uploadDir = 'resource/';
        const filePath = `${uploadDir}${userId}-${file.originalname}`;
        if (fs.existsSync(filePath)) {
            return res
                .status(409)
                .json({ message: `${file.originalname} already exist` });
        }
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        fs.writeFileSync(filePath, file.buffer);
        return res.status(201).json({ message: 'image uploaded', path: filePath });
    }
    uploadPosts(createUploadDto, files, res) {
        const { userId } = createUploadDto;
        const uploadDir = 'resource/post/';
        const uploadedFiles = [];
        files.map((file) => {
            const filePath = `${uploadDir}${userId}-${file.originalname}`;
            if (fs.existsSync(filePath)) {
                return uploadedFiles.push({
                    message: `failed ${file.originalname} already exist`,
                    name: file.originalname,
                });
            }
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            fs.writeFileSync(filePath, file.buffer);
            uploadedFiles.push({
                message: 'upload success',
                name: file.originalname,
                filePath,
            });
        });
        return res.status(201).json({ data: uploadedFiles });
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
//# sourceMappingURL=upload.service.js.map