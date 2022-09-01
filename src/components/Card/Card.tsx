import { Logger } from 'interfaces';
import { withLogger } from 'utils';

interface CardProps extends Logger {
  title: string;
  body: string;
  footer: string;
}

const Card = (props: CardProps) => {
  console.log(props.logProps?.message);

  return (
    <>
      <div className="d-flex text-start w-100 justify-content-between">
        <h5 className="mb-1">{props.title}</h5>
      </div>
      <p className="mb-1  text-start">{props.body}</p>
      <p className=" text-start">
        <small>{props.footer}</small>
      </p>
    </>
  );
};

export default withLogger(Card, 'Card');
