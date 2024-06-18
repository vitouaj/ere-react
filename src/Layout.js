import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = window.sessionStorage.getItem("user");
    setUserEmail(email);
  }, []);

  return (
    <Container className="vh-100 vw-100">
      <Container className="fixed-top">
        <nav class="navbar navbar-expand-sm">
          <div class="container-fluid">
            <a class="navbar-brand fs-4" href="/">
              <span className="fst-italic fw-bold text-danger">E</span>
              <span className="text-primary fw-bold">Re </span>
              <span className="fs-6 text-primary fw-bold">System</span>
            </a>
            <div id="navbarText">
              <Link to="/me" class="navbar-text sp-normal">
                {window.sessionStorage.getItem("user")}
              </Link>
            </div>
          </div>
        </nav>
      </Container>
      <Row className="h-100 w-100">
        <Col className="">
          <br></br>
          <br></br>
          <Sidebar />
        </Col>
        <Col className="overflow-auto" xs={9}>
          {children}
        </Col>
      </Row>
      <Container className="fixed-bottom">
        <Footer />
      </Container>
    </Container>
  );
}
