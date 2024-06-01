import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = window.sessionStorage.getItem("user");
    setUserEmail(email);
  }, []);

  return (
    <Container className="vh-100 vw-100">
      <Container className="fixed-top">
        <Navigation userEmail={userEmail} />
      </Container>
      <Row className="h-100 w-100">
        <Col className="bg-light">
          <br></br>
          <br></br>
          <Sidebar />
        </Col>
        <Col className="overflow-auto" xs={9}>
          {children}
        </Col>
      </Row>
      <Container className="fixed-bottom bg-light">
        <Footer />
      </Container>
    </Container>
  );
}
