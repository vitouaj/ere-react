import {
  Col,
  Container,
  Row,
  Modal,
  Form,
  Button,
  Spinner,
  Tabs,
  Tab,
  Toast,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGripLines } from "@fortawesome/free-solid-svg-icons";
import Layout from "../Layout";
import InnerSidebar from "../components/InnerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Student from "./Student";
import Report from "./Report";

export default function Classroom() {
  const [show, setShow] = useState(false);
  const [roleId, setRoleId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [subjectItems, setSubjectItems] = useState([]);

  async function getSubjectItem(classId) {
    var result = {};
    try {
      result = await axios.get(
        "http://localhost:5137/api/v1/classroom/" + classId + "/subjectItem"
      );
      console.log(result);
      setSubjectItems(result.data.payload);
      console.log(subjectItems);
    } catch (e) {
      console.log(e);
    }
  }

  const [classID, setClassID] = useState("");
  const [classname, setClassname] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname;
    var paths = pathname.split("/");
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    setClassname(name);
    const localRole = window.sessionStorage.getItem("activeUserRole");
    setRoleId(localRole);
    setClassID(paths.at(-1));
    getSubjectItem(paths.at(-1));
    getSubjectOptions();
  }, []);

  const [subjectOptions, setSubjectOptions] = useState([]);

  async function getSubjectOptions() {
    try {
      var result = await axios.get(
        "http://localhost:5137/api/v1/classroom/subjects"
      );
      setSubjectOptions(result.data.payload);
    } catch (e) {
      console.log(e);
    }
  }

  const [seletedSubject, setSeletedSubject] = useState("");
  const [maxScore, setMaxScore] = useState(0);
  const [passingScore, setPassingScore] = useState(0);
  const [result, setResult] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  async function doCreateSubjectItem(e) {
    e.preventDefault();
    setLoading(true);
    handleClose();
    var result = {};
    var url = `http://localhost:5137/api/v1/classroom/${classID}/subjectItem`;
    const data = {
      subjectId: seletedSubject,
      maxScore: maxScore,
      passingScore: passingScore,
    };
    console.log(data);
    try {
      result = await axios.post(url, data);
      setResult(result.data);
    } catch (e) {
      setResult(e.response.data);
      console.log(e);
    }

    setSeletedSubject("");
    setMaxScore(0);
    setPassingScore(0);

    setShowToast(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return setTimeout(() => {
      setLoading(false);
      setShowToast(false);
      window.location.reload();
    }, 5000);
  }

  return (
    <Layout>
      {isLoading ? (
        <div className="row w-100 h-100 bg-light opacity-25">
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </div>
        </div>
      ) : (
        <Container>
          <br></br>
          <br></br>
          <br></br>
          <Toast
            bg={result.success === true ? "success" : "danger"}
            show={showToast}
            onClose={() => setShowToast(!showToast)}
            className="position-absolute end-0"
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Response</strong>
            </Toast.Header>
            <Toast.Body>{result.message}</Toast.Body>
          </Toast>
          <Row className="content">
            <Tabs
              defaultActiveKey="reports"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="reports" title="Reports">
                <Report />
              </Tab>
              {roleId === "2" && (
                <Tab eventKey="subject-item" title="Subject Item">
                  <Col>
                    <br></br>
                    <div>
                      <h4 className="">{classname}</h4>
                      <span className="sp-normal">{classID}</span>
                    </div>
                    <br></br>
                    <div>
                      <button onClick={handleShow} className="btn btn-primary">
                        <FontAwesomeIcon className="sp-normal" icon={faBars} />
                        <span className="mx-2 sp-normal">New Subject Item</span>
                      </button>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Subject Item</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextEmail"
                        >
                          <Form.Label column sm="3">
                            Subject
                          </Form.Label>
                          <Col sm="9">
                            <Form.Select
                              onChange={(e) =>
                                setSeletedSubject(e.target.value)
                              }
                              type="text"
                              placeholder="-- Choose a subject --"
                            >
                              <option>-- Select Suject --</option>
                              {subjectOptions.map((item) => {
                                return (
                                  <option value={item.subjectId}>
                                    {item.subjectName}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextEmail"
                        >
                          <Form.Label column sm="3">
                            Max Score
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              onChange={(e) => setMaxScore(e.target.value)}
                              value={maxScore}
                              type="number"
                              placeholder="100"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextEmail"
                        >
                          <Form.Label column sm="3">
                            Passing Score
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              onChange={(e) => setPassingScore(e.target.value)}
                              value={passingScore}
                              type="number"
                              placeholder="100"
                            />
                          </Col>
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={doCreateSubjectItem}>
                          Create
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <br></br>
                    <table class="table sp-normal">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Max score</th>
                          <th scope="col">Passing score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjectItems.map((item) => {
                          return (
                            <tr key={item.id}>
                              <th scope="row">
                                {subjectItems.indexOf(item) + 1}
                              </th>
                              <td>{item.subjectId}</td>
                              <td>{item.maxScore}</td>
                              <td>{item.passingScore}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Col>
                </Tab>
              )}
              {roleId === "2" && (
                <Tab eventKey="students" title="Students">
                  <Student />
                </Tab>
              )}
            </Tabs>
          </Row>
        </Container>
      )}
    </Layout>
  );
}
