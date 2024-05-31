import { Button, Container, Image, Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function doRegister(e) {
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
      userId: "",
      firstname: firstname,
      lastname: lastname,
      password: password,
      email: email,
      phone: phone,
      otherContact: parentEmail,
      profileId: "",
      roleId: 2,
    };
    var res = {};
    console.log(data);
    try {
      res = await axios.post(
        "http://localhost:5137/api/v1/user/register",
        data
      );
      setResult(res.data);
      console.log(result);
    } catch (e) {
      console.log(e);
      if (e.response === null || e.response === undefined) {
        setError(e.message);
      } else {
        setError(e.response.data.message);
      }
    }
    if (res.status === 200) {
      window.sessionStorage.setItem("activeUser", res.data.payload);
      return setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
    } else {
      return setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

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
            {result ?? <span className="text-danger">{error}</span>}
            <Form className="w-100 h-auto p-5 bg-light">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Firstname
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Lastname
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Email
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Password
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Parent Email
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    value={parentEmail}
                    type="email"
                    onChange={(e) => setParentEmail(e.target.value)}
                    placeholder="parent@example.com"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Phone Number
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="number"
                    placeholder="000 000 000"
                  />
                </Col>
              </Form.Group>

              <br></br>
              <Row>
                <Col className="d-flex justify-content-end">
                  <button onClick={doRegister} className="btn btn-primary">
                    Register
                  </button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col className="bg-light d-flex flex-column justify-content-center align-items-center">
            <a class="navbar-brand fs-1" href="/">
              <span className="fst-italic fw-bold text-danger">E</span>
              <span className="text-primary fw-bold">Re </span>
              <span className="fs-2 text-primary fw-bold">System Register</span>
            </a>
            <br></br>
            <Image className="w-100" src="/student.webp" width={200} />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Register;
