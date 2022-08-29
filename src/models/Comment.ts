import { CommentSchema } from 'interfaces';
import { API } from 'utils';

class Comment implements CommentSchema {
  id!: number;
  postId!: number;
  name!: string;
  email!: string;
  body!: string;

  constructor(props: CommentSchema) {
    if (props) {
      Object.assign(this, props);
    }
  }

  static async fetch(postId: number, options: RequestInit) {
    const result = await API.get(`posts/${postId}/comments`, options);

    return result.map((data: Comment) => new Comment(data));
  }
}

export { Comment };
