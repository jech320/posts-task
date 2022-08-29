interface CommentSchema {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

export type { CommentSchema };
