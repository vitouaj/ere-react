import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          ERe System
        </a>
        <div id="navbarText">
          <Link to="/me" class="navbar-text">
            nika@ere-sys.com
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
