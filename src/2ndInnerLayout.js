import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

import Homepage from "./pages/Homepage";

export default function SecondInnerLayout({ children }) {
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
        <Col>
          <br></br>
          <br></br>
          <Sidebar />
        </Col>
        <Col className="overflow-auto" xs={9}>
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="home" title="Reports">
              <Homepage />
            </Tab>
            <Tab eventKey="profile" title="Subject-Item"></Tab>
            <Tab eventKey="longer-tab" title="Student"></Tab>
          </Tabs>
        </Col>
      </Row>
      <Container className="fixed-bottom">
        <Footer />
      </Container>
    </Container>
  );
}
