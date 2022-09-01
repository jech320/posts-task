import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Comment, Post, User } from 'models';
import { withLogger } from 'utils';
import { CommentsCard, Spinner } from 'components';
import { Logger } from 'interfaces';
import './index.css';

const PostPage = (props: Logger) => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      if (!postId) return;

      try {
        const _post = await Post.fetch(postId, { signal });
        const author = await User.fetch(_post.userId, { signal });
        const comments = await Comment.fetch(_post.id, { signal });

        setPost(
          new Post({
            ..._post,
            author,
            comments,
          })
        );
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [postId]);

  useEffect(() => {
    setLoading(!post);
  }, [post]);

  console.log(props.logProps?.message);

  if (loading) return <Spinner message="Loading..." />;

  return (
    <>
      <div id="postPageContainer" className="d-flex flex-column">
        <CommentsCard data={post} />
      </div>
    </>
  );
};

export default withLogger(PostPage, 'PostPage');
