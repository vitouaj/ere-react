import { Button, Container, Image, Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function doLogin(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    console.log(e);
    setLoading(true);
    e.preventDefault();

    var data = {
      email: email,
      password: password,
    };
    var res = {};

    try {
      res = await axios.post("http://localhost:5137/api/v1/user/login", data);
      setResult(res.data);
    } catch (e) {
      console.log(e);

      if (e.response === null || e.response === undefined) {
        setError(e.message);
      } else {
        setError(e.response.data.message);
      }
    }

    if (res.status === 200) {
      window.sessionStorage.setItem("activeUser", res.data.payload.userId);
      window.sessionStorage.setItem("activeUserRole", res.data.payload.roleId);
      return setTimeout(() => {
        setLoading(false);

        if (res.data.payload.roleId === 2) {
          navigate("/");
        } else {
          navigate("/student-homepage");
        }
      }, 2000);
    } else {
      return setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  const [validated, setValidated] = useState(false);

  return (
    <Container className="vh-100">
      {isLoading ? (
        <div className="row h-100 bg-light opacity-25">
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </div>
        </div>
      ) : (
        <Row className="h-100">
          <Col className="d-flex justify-content-center align-items-center">
            <div className="w-100">
              {error && <span className="text-danger">"{error}"</span>}
              <Form
                className="w-100 h-25 p-5 bg-light"
                noValidate
                validated={validated}
                onSubmit={doLogin}
              >
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="email@example.com"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide email.
                    </Form.Control.Feedback>
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
                    <Form.Control
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      value={password}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide password.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <br></br>
                <Row className="p-0">
                  <Col className="d-flex justify-content-between">
                    <Link to="/register">Don't have an account yet</Link>
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col className="bg-light d-flex flex-column justify-content-center align-items-center">
            <a class="navbar-brand fs-1" href="/">
              <span className="fst-italic fw-bold text-danger">E</span>
              <span className="text-primary fw-bold">Re </span>
              <span className="fs-2 text-primary fw-bold">System Login</span>
            </a>
            <br></br>
            <Image className="w-100" src="/student.webp" width={200} />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Login;
