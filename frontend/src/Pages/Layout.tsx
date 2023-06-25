import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./styles/style.css";
type Props = {};

export const Layout = (props: Props) => {
  return (
    <>
      <div>
        <nav>
          <ul className="navbar-container">
            <li>
              <Link className="link-tag" to="/">
                Login
              </Link>
            </li>
            <li>
              <Link className="link-tag" to="/repo">
                Repositories
              </Link>
            </li>
            <li>
              <Link className="link-tag" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link className="link-tag" to="/faqs">
                Faqs
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />
    </>
  );
};
