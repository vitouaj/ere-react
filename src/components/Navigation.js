import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Navigation({ userEmail }) {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand fs-4" href="/">
          <span className="fst-italic fw-bold text-danger">E</span>
          <span className="text-primary fw-bold">Re </span>
          <span className="fs-6 text-primary fw-bold">System</span>
        </a>
        <div id="navbarText">
          <Link to="/me" class="navbar-text">
            {userEmail}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
