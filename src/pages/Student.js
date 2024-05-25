import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";
import { Route } from "react-router-dom";
import { useState } from "react";

export default function Student() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <br></br>
            <div>
              <h2>12 A</h2>
              <span>class of joy</span>
            </div>
            <br></br>
            <div>
              <button onClick={handleShow} className="btn btn-primary">
                Add new Student
              </button>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column sm="3">
                    Student ID
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" placeholder="S-10210" />
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
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Student Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>S-0023</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>S-0024</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>S-0025</td>
                  <td>Larry</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
