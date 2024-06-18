import { Modal, Tab, Col, Row, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SubjectItemTab({ classroom }) {
  const [classData, setClassData] = useState({});
  const [show, setShow] = useState(false);
  const [seletedSubject, setSeletedSubject] = useState("");
  const [maxScore, setMaxScore] = useState(0);
  const [passingScore, setPassingScore] = useState(0);
  const [result, setResult] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    const pathname = window.location.pathname;
    var paths = pathname.split("/");
    const localRole = window.sessionStorage.getItem("activeUserRole");

    getSubjectOptions();
  }, []);

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
  async function doCreateSubjectItem(e) {
    e.preventDefault();
    setLoading(true);
    handleClose();
    var result = {};
    var url = `http://localhost:5137/api/v1/classroom/${classroom.classroomId}/subjectItem`;
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
    <Col>
      <div>
        <button
          onClick={handleShow}
          className="border-0 py-1 bg-primary text-white rounded-1"
        >
          <FontAwesomeIcon className="sp-normal" icon={faBars} />
          <span className="ms-2 sp-normal">Subject Item</span>
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subject Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              Subject
            </Form.Label>
            <Col sm="9">
              <Form.Select
                onChange={(e) => setSeletedSubject(e.target.value)}
                type="text"
                placeholder="-- Choose a subject --"
              >
                <option>-- Select Suject --</option>
                {subjectOptions.map((item) => {
                  return (
                    <option value={item.subjectId}>{item.subjectName}</option>
                  );
                })}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
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
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
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
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classroom.subjectItems !== undefined &&
            classroom.subjectItems.map((item) => {
              return (
                <tr key={item.id}>
                  <th scope="row">
                    {classroom.subjectItems.indexOf(item) + 1}
                  </th>
                  <td>{item.name}</td>
                  <td>{item.maxScore}</td>
                  <td>{item.passingScore}</td>
                  <td>
                    <FontAwesomeIcon
                      className="text-primary me-3"
                      icon={faPenToSquare}
                    />
                    <FontAwesomeIcon
                      className="text-danger"
                      icon={faTrashCan}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Col>
  );
}
