import { Col, Container, Row, Form, Image } from "react-bootstrap";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";
import { Link, Route } from "react-router-dom";
import InnerSidebar from "../components/InnerSidebar";
import Signature from "./signature-icon.svg";

export default function ReportDetail() {
  return (
    <Layout>
      <br></br>
      <Container className="h-75 overflow-auto">
        <Row>
          <Col>
            <br></br>
            <div>
              <h2>12 A</h2>
            </div>
            <br></br>
            <Container>
              <Row>
                <Col>
                  <Form.Group
                    as={Row}
                    className="w-50"
                    controlId="formPlaintextEmail"
                  >
                    <Form.Label>Student Name</Form.Label>
                    <Form.Select aria-label="Month" size="md">
                      <option>Nika</option>
                      <option>Chetra</option>
                      <option>Thida</option>
                      <option>Cheata</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    as={Row}
                    className=" w-25"
                    controlId="formPlaintextEmail"
                  >
                    <Form.Label>Student ID</Form.Label>
                    <Form.Select
                      aria-label="Month"
                      size="md"
                      disabled
                      aria-readonly
                    >
                      <option>S-00213</option>
                      <option>S-20932</option>
                      <option>S-21002</option>
                      <option>S-20323</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <br></br>
              <Link>Send to parent</Link>
            </Container>
            <br></br>

            <table className="table table-striped w-75">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Score</th>
                  <th scope="col">Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>History</td>
                  <td>75</td>
                  <td className="fw-bold">A</td>
                </tr>
                <tr>
                  <td>2</td>

                  <td>Chemistry</td>
                  <td>75</td>
                  <td className="fw-bold">A</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Math</td>
                  <td>110</td>
                  <td className="fw-bold">B</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Math</td>
                  <td>110</td>
                  <td className="fw-bold">B</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Math</td>
                  <td>110</td>
                  <td className="fw-bold">B</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <br></br>
        <Row className="w-75">
          <Col>
            <Row>
              <Col>
                <span>Total Score</span>
              </Col>
              <Col>
                <span className="fw-bold">484</span>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <span>Total Grade</span>
              </Col>
              <Col>
                <span className="fw-bold">A</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <br></br>
        <Row className="w-75">
          <Col>
            <Row>
              <Col>
                <span>Average</span>
              </Col>
              <Col>
                <span className="fw-bold">48.04</span>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <span></span>
              </Col>
              <Col>
                <span></span>
              </Col>
            </Row>
          </Col>
        </Row>
        <br></br>
        <Row className="w-75">
          <Col>
            <Row>
              <Col xs={3}>
                <span>Comment</span>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <br></br>
        <Row className="w-75">
          <Col>
            <Row>
              <Col xs={3}>
                <span>Parent Comment</span>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <br></br>
        <Row className="w-75">
          <Col className="d-flex flex-column">
            <Form.Label>Classholder Signature</Form.Label>
            <Image src={Signature} width={150}></Image>
            <Form.Select aria-label="Month" size="md">
              <option>Signed and Approved</option>
              <option>Deny</option>
            </Form.Select>
          </Col>
          <Col className="d-flex flex-column">
            <Form.Label>School Director Signature</Form.Label>
            <Image src={Signature} width={150}></Image>
            <Form.Select aria-label="Month" size="md">
              <option>Signed and Approved</option>
              <option>Deny</option>
            </Form.Select>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <Row className="w-25">
          <Col>
            <button className="btn">Cancel</button>
          </Col>
          <Col>
            <button className="btn btn-primary">Save</button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
