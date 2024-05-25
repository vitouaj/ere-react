import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import Layout from "../Layout";
import ClsCard from "../components/ClsCard";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Homepage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Layout>
      <Container>
        <br></br>

        <h2>Welcome Nika!</h2>
        <br></br>

        <button onClick={handleShow} className="btn btn-primary">
          Add new Classrooom
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create new Classroom</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Classname
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" placeholder="My Class" />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>

        <br></br>
        <br></br>
        <Row>
          <Col>
            <Link to="/classroom/subject-item">
              <ClsCard />
            </Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
