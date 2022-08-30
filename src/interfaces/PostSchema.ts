import { Comment, User } from 'models';

interface PostSchema {
  id: number;
  userId: number;
  title: string;
  body: string;
  comments?: Comment[];
  author?: User;
}

export type { PostSchema };
