import { Logger } from 'interfaces';
import { Post } from 'models';
import { withLogger } from 'utils';
import Card from './Card';

interface CommentsCardProps extends Logger {
  data: Post | null;
}

const CommentsCard = (props: CommentsCardProps) => {
  if (!props.data) return <></>;

  const { data } = props;

  console.log(props.logProps?.message);

  return (
    <>
      <Card
        title={data.title}
        body={data.body}
        footer={data.author?.name || ''}
      />
      <p>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapseContainer-${data.id}`}
          aria-expanded="false"
          aria-controls="collapseWidthExample"
          onClick={(e) => e.stopPropagation()}
        >
          Toggle Comments
        </button>
      </p>
      <div id="commentsContainer">
        <div
          className="collapse collapse-horizontal"
          id={`collapseContainer-${data.id}`}
        >
          {data.comments &&
            !!data.comments.length &&
            data.comments.map((comment) => (
              <Card
                key={comment.id}
                title={comment.name}
                body={comment.body}
                footer={comment.email}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default withLogger(CommentsCard, 'CommentsCard');
