import {
  Col,
  Container,
  Row,
  Modal,
  Button,
  Form,
  Toast,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";
import { Route } from "react-router-dom";
import { useState } from "react";
import InnerSidebar from "../components/InnerSidebar";
import axios from "axios";
import { useEffect } from "react";

export default function Student() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [studentIDs, setStudentIDs] = useState("");

  const [result, setResult] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [classID, setClassID] = useState("");
  const [classname, setClassname] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname;
    var paths = pathname.split("/");
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    setClassname(name);

    setClassID(paths.at(-1));

    // get students function
    getStudents(paths.at(-1));
  }, []);

  async function doEnrollStudents(e) {
    e.preventDefault();
    setLoading(true);
    handleClose();
    var res = {};
    var url = `http://localhost:5137/api/v1/classroom/${classID}/enroll`;
    const raw = studentIDs.split(",");
    const data = raw.map((word) => word.trim());

    console.log(data);
    try {
      res = await axios.post(url, data);
      console.log(res);
      setResult(res.data);
      setError(
        `${res.data.success} Success. ${res.data.failed} Failed. Invalid IDs: ${res.data.invalidIds}`
      );
    } catch (e) {
      setError(e.response.data);
      console.log(e);
    }

    console.log(error);

    setStudentIDs([]);

    setShowToast(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return setTimeout(() => {
      setLoading(false);
      window.location.reload();
    }, 5000);
  }

  const [studentList, setStudentList] = useState([]);

  async function getStudents(id) {
    var url = `http://localhost:5137/api/v1/classroom/${id}/enroll`;
    try {
      var result = await axios.get(url);
      setStudentList(result.data.payload);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="row w-100 h-100 bg-light opacity-25">
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </div>
        </div>
      ) : (
        <Container>
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
            <Toast.Body>{error}</Toast.Body>
          </Toast>
          <Row>
            {/* <Col xs={3}>
              <br></br>
              <InnerSidebar classId={classID} name={classname} />
            </Col> */}
            <Col>
              <br></br>
              <div>
                <h4 className="">{classname}</h4>
                <span className="sp-normal">{classID}</span>
              </div>
              <br></br>
              <div>
                <button onClick={handleShow} className="btn btn-primary">
                  <FontAwesomeIcon className="sp-normal" icon={faPeopleGroup} />
                  <span className="mx-2 sp-normal"> Enroll Students</span>
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
                      <Form.Control
                        value={studentIDs}
                        onChange={(e) => setStudentIDs(e.target.value)}
                        type="text"
                        placeholder=""
                      />
                    </Col>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={doEnrollStudents}>
                    Create
                  </Button>
                </Modal.Footer>
              </Modal>

              <br></br>
              <table class="table sp-normal">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Id</th>
                    <th scope="col">Student Name</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((s) => {
                    return (
                      <tr>
                        <th scope="row">{studentList.indexOf(s) + 1}</th>
                        <td>{s.studentId}</td>
                        <td>{s.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
