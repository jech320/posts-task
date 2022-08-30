import { PostSchema } from 'interfaces';
import { API } from 'utils';
import { Comment } from './Comment';
import { User } from './User';

class Post implements PostSchema {
  id!: number;
  userId!: number;
  title!: string;
  body!: string;
  comments?: Comment[];
  author?: User;

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

  static async fetchWithAuthorAndComments(
    options: RequestInit
  ): Promise<Post[]> {
    const [posts, users] = await Promise.all([
      Post.fetchAll(options),
      User.fetchAll(options),
    ]);

    type UsersIndexType = {
      [userId: string]: User;
    };

    const usersIndex: UsersIndexType = users.reduce(
      (acc, curr: User) => ({
        ...acc,
        [curr.id]: curr,
      }),
      {}
    );

    return Promise.all(
      posts.map(async ({ id, userId, ...postProps }: Post) => {
        const comments = await Comment.fetch(id, options);

        return new Post({
          ...postProps,
          id,
          comments,
          userId,
          author: usersIndex[userId],
        });
      })
    );
  }
}

export { Post };
