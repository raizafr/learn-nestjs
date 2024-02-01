export declare class ContentType {
    name: string;
    path: string;
}
export declare class CreatePostDto {
    userId: number;
    caption: string;
    content: ContentType[];
}
