import { Comment } from 'models';

interface PostSchema {
  id: number;
  userId: number;
  title: string;
  body: string;
  comments?: Comment[];
}

export type { PostSchema };
