import { Link } from 'react-router-dom';
import { ContactMe } from '../contact/contact';
import { useState } from 'react';

const NavBar = () => {
  const [showForm, setShowForm] = useState(false);

  const isProd = process.env.NODE_ENV === 'production';

  return (
    <div className="grid grid-cols-6 w-full h-[4rem] flex justify-content items-center border-b-8 border-[#451a03] z-10">
      <nav className="col-span-3 inline-block">
        <ul className="nav flex flex-row">
          <li className="nav-item">
            <Link className="nav-link" to={`${isProd ? '/profile-project' : '/'}`}>
              Home
            </Link>
          </li>
          <li className="nav-item ml-[1.25rem]">
            <Link className="nav-link" to="/board">
              Board
            </Link>
          </li>
          <li className="nav-item ml-[1.25rem]">
            <Link className="nav-link" to="/notes">
              Notes
            </Link>
          </li>
          <li className="nav-item ml-[1.25rem]">
            <Link className="nav-link" to="/calculator">
              Calculator
            </Link>
          </li>
        </ul>
      </nav>
      <div className="col-span-2 flex justify-center items-center">
        <Link to="https://github.com/EliLV21/profile-project" className="btn btn-primary hover:underline">
          https://github.com/EliLV21/profile-project
        </Link>
      </div>
      <div className="flex justify-end items-center">
        <ContactMe setShowForm={setShowForm} showForm={showForm} />
      </div>
    </div>
  );
};

export default NavBar;
