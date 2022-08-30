import { PostSchema } from 'interfaces';
import { API } from 'utils';
import { Comment } from './Comment';

class Post implements PostSchema {
  id!: number;
  userId!: number;
  title!: string;
  body!: string;
  comments?: Comment[];

  constructor(props: PostSchema) {
    if (props) {
      Object.assign(this, props);
    }
  }

  static async fetchAll(options: RequestInit): Promise<Post[]> {
    const result = await API.get('posts', options);

    return result.map((data: Post) => new Post(data));
  }

  static async fetch(id: string, options: RequestInit): Promise<Post> {
    const result = await API.get(`posts/${id}`, options);

    return new Post(result);
  }

  static async fetchWithComments(options: RequestInit): Promise<Post[]> {
    const posts = await Post.fetchAll(options);

    return Promise.all(
      posts.map(async ({ id, ...postProps }: Post) => {
        const comments = await Comment.fetch(id, options);

        return new Post({ ...postProps, id, comments });
      })
    );
  }
}

export { Post };
