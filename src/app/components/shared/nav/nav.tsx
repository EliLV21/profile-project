import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="grid grid-cols-4 w-full h-[4rem] flex justify-content items-center">
      <nav className="col-span-3 inline-block">
        <ul className="nav flex flex-row">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item ml-[1.25rem]">
            <Link className="nav-link" to="/board">
              Board
            </Link>
          </li>
          {/* <li className="nav-item ml-[1.25rem]">
            <Link className="nav-link" to="/carousel">
              Carousel
            </Link>
          </li>
          <li className="nav-item ml-[1.25rem]">
            <Link className="nav-link" to="/notes">
              Notes
            </Link>
          </li> */}
        </ul>
      </nav>
      <div className="flex justify-center items-center">{/* <Login /> */}</div>
    </div>
  );
};

export default NavBar;
