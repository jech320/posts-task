import { Logger } from 'interfaces';
import { Link, Outlet } from 'react-router-dom';
import { withLogger } from 'utils';

const Navbar = (props: Logger) => {
  console.log(props.logProps?.message);

  return (
    <>
      <ul className="nav justify-content-center mt-3">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="posts">
            Posts
          </Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default withLogger(Navbar, 'Navbar');
