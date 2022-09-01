import { useEffect, useState } from 'react';
import { Post } from 'models';
import { withLogger } from 'utils';
import { CommentsCard, List } from 'components';
import { Logger } from 'interfaces';
import './index.css';

const PostsPage = (props: Logger) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPosts = async () => {
      try {
        const _posts = await Post.fetchWithAuthorAndComments({ signal });

        setPosts(_posts);
      } catch (e) {
        console.log(e);
      }
    };

    fetchPosts();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    setLoading(!posts);
  }, [posts]);

  console.log(props.logProps?.message);

  return (
    <>
      <List
        searchable
        data={posts}
        loading={loading}
        onRowClick={(data) => {
          window.open(`/posts/${data.id}`);
        }}
        renderRow={(data) => <CommentsCard key={data.id} data={data} />}
      />
    </>
  );
};

export default withLogger(PostsPage, 'PostsPage');
