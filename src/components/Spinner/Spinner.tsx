import { Logger } from 'interfaces';
import { withLogger } from 'utils';

interface SpinnerProps extends Logger {
  message?: string;
}

const Spinner = (props: SpinnerProps) => {
  console.log(props.logProps?.message);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden"></span>
      </div>
      {props.message && <div className="mt-2">{props.message}</div>}
    </div>
  );
};

export default withLogger(Spinner, 'Spinner');
