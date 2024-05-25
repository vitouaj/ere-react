import { Button, Container, Image } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

function Login() {
  return (
    <Container className="vh-100">
      <Row className="h-100">
        <Col className="d-flex justify-content-center align-items-center">
          <Form className="w-100 h-25 p-5 bg-light">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control type="email" placeholder="email@example.com" />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>

            <br></br>
            <Row className="p-0">
              <Col className="d-flex justify-content-between">
                <Link to="/register">Don't have an account yet</Link>
                <Link to="/">
                  <button className="btn btn-primary">Login</button>
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col className="bg-light d-flex flex-column justify-content-center align-items-center">
          <h1 className="fw-bold text-primary">eRE System Login</h1>
          <br></br>
          <Image className="w-100" src="/student.webp" width={200} />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
