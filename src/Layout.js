import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export default function Layout({ children }) {
  return (
    <Container>
      <Navigation />
      <Row>
        <Col>
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
