import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleClickLogin = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            TodoList App
          </Link>
          <div className="collapse navbar-collapse justify-content-end">
            <div className="navbar-nav">
              {user ? (
                <>
                  <NavLink className={`nav-link`} to="/">
                    Home
                  </NavLink>
                  <a className="nav-link" href="/" onClick={handleClickLogin}>
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <NavLink className={`nav-link`} to="/login">
                    Login
                  </NavLink>
                  <NavLink className={`nav-link `} to="/register">
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
