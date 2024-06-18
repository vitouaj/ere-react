import {
  Col,
  Container,
  Row,
  Form,
  Modal,
  Button,
  Image,
  Toast,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import InnerSidebar from "../components/InnerSidebar";
import { Link, json } from "react-router-dom";
import Signature from "./signature-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Report({ classroom }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [reportList, setReportList] = useState([]);
  const [subjectItemOptions, setSubjectItemOptions] = useState([]);
  const [issuedAt, setIssuedAt] = useState("");
  const [studentOptions, setStudentOptions] = useState("");
  const [teacherCmt, setTeacherCmt] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [result, setResult] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [classID, setClassID] = useState("");
  const [classname, setClassname] = useState("");
  const [error, setError] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [issuedDate, setIssuedDate] = useState(null);
  const [filteredMonth, setFilteredMonth] = useState(0);
  const [monthsFromBackend, setMonthFromBackend] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalGrade, setTotalGrade] = useState({});
  const [average, setAverage] = useState(null);
  const [absence, setAbsence] = useState(0);
  const [permission, setPermission] = useState(0);

  const gradeList = ["A", "B", "C", "D", "E", "F"];

  useEffect(() => {
    const totalScore = subjectItemOptions.reduce(
      (sum, subject) => sum + Number(subject.score),
      0
    );
    const totalMaxScore = subjectItemOptions.reduce(
      (sum, subject) => sum + Number(subject.maxScore),
      0
    );
    var gradePercentage = totalScore / totalMaxScore;
    var temp = calculateGrade(gradePercentage * 100);
    setTotalGrade(temp);

    const newAverage =
      subjectItemOptions.length === 0
        ? null
        : totalScore / subjectItemOptions.length;

    if (newAverage === null) {
      setAverage(0);
    } else {
      setAverage(newAverage.toFixed(2));
    }
    setTotalScore(totalScore);
  }, [subjectItemOptions]);

  const [seletedMonth, setSelectedMonth] = useState(0);

  function calculateGrade(percentage) {
    let grade = "";
    let index = 0;
    if (percentage < 50) {
      grade = "F";
      index = 6;
    } else if (percentage >= 50 && percentage < 60) {
      grade = "E";
      index = 5;
    } else if (percentage >= 60 && percentage < 70) {
      grade = "D";
      index = 4;
    } else if (percentage >= 70 && percentage < 80) {
      grade = "C";
      index = 3;
    } else if (percentage >= 80 && percentage < 90) {
      grade = "B";
      index = 2;
    } else if (percentage >= 90 && percentage <= 100) {
      grade = "A";
      index = 1;
    } else {
      grade = "";
      index = 0;
      // for percentages above 100 or invalid inputs
    }
    return {
      grade: grade,
      index: index,
    };
  }

  useEffect(() => {
    const pathname = window.location.pathname;
    var paths = pathname.split("/");
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    setClassname(name);
    setClassID(paths.at(-1));
    // get students function
    getReportList(paths.at(-1));
    getMonths();
    getStudents(paths.at(-1));
    getSubjectItems(paths.at(-1));
  }, []);

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

  async function getSubjectItems(classId) {
    var url = `http://localhost:5137/api/v1/classroom/${classId}/subjectItem`;
    try {
      var result = await axios.get(url);
      var listOfSi = result.data.payload;
      listOfSi.forEach((si) => {
        si["score"] = null;
        si["grade"] = "";
      });
      console.log(listOfSi);
      setSubjectItemOptions(listOfSi);
    } catch (e) {
      console.log(e);
    }
  }

  async function getMonths() {
    var url = `http://localhost:5137/api/v1/classroom/months`;
    try {
      var result = await axios.get(url);
      setMonthFromBackend(result.data.payload);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  async function getReportList(id, month) {
    var url =
      month === null || month === undefined
        ? `http://localhost:5137/api/v1/classroom/${id}/reports`
        : `http://localhost:5137/api/v1/classroom/${id}/reports?month=${month}`;
    try {
      var result = await axios.get(url);
      setReportList(result.data.payload);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  const handleInputChange = (index, event, maxScore) => {
    const { name, value } = event.target;
    const newSubjectItems = [...subjectItemOptions];
    newSubjectItems[index][name] = value;
    var gradeObj = calculateGrade((value / maxScore) * 100);
    newSubjectItems[index]["grade"] = gradeObj["grade"];

    setSubjectItemOptions(newSubjectItems);
  };

  async function doCreateReport(e) {
    e.preventDefault();
    setLoading(true);
    handleClose();
    var result = {};

    const teacherId = window.sessionStorage.getItem("activeUser");
    var url = `http://localhost:5137/api/v1/classroom/${teacherId}/report`;
    const data = {
      average: average,
      classroomId: classID,
      studentId: selectedStudent,
      month: seletedMonth,
      issuedBy: window.sessionStorage.getItem("activeUser"),
      totalScore: totalScore,
      overallGrade: totalGrade["index"],
      absence: absence,
      permission: permission,
      teacherCmt: teacherCmt,
      reportItems: subjectItemOptions.map((item) => {
        return {
          subjectItemId: item.subjectItemId,
          score: item.score,
          gradeId: gradeList.indexOf(item.grade) + 1,
        };
      }),
    };

    console.log(data);
    try {
      result = await axios.post(url, data);
      console.log(result);
      setResult(result.data);
    } catch (e) {
      setResult(e.response.data);
      console.log(e);
    }

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

  function handleFilterChange(e) {
    const { value } = e.target;
    getReportList(classID, value);
  }

  return (
    <Container className="h-75">
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
            <Toast.Body>{result.message}</Toast.Body>
          </Toast>
          <Row>
            <Col>
              <Row>
                <Col>
                  <button
                    onClick={handleShow}
                    className="border-0 py-1 bg-primary text-white rounded-1"
                  >
                    <FontAwesomeIcon className="sp-normal" icon={faFileLines} />
                    <span className="ms-2 sp-normal">New Report</span>
                  </button>
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Month"
                    size="sm"
                    onChange={handleFilterChange}
                  >
                    <option>-- This month --</option>
                    {monthsFromBackend.map((m) => {
                      return (
                        <option value={m.id} key={m.id}>
                          {m.value}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Row>

              <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <h4 className="">Create Report</h4>
                </Modal.Header>
                <Modal.Body>
                  <Container className="h-75 overflow-auto">
                    <Row>
                      <Col>
                        <div>
                          <h4 className="">{classname}</h4>
                          <span className="sp-normal">{classID}</span>
                        </div>
                        <br></br>
                        <Container>
                          <Row>
                            <Col xs={6} className="p-0 mb-3">
                              <Form.Select
                                aria-label="Month"
                                as={Row}
                                className="w-75"
                                onChange={(e) =>
                                  setSelectedMonth(parseInt(e.target.value))
                                }
                              >
                                <option>-- This month --</option>
                                {monthsFromBackend.map((m) => {
                                  return (
                                    <option value={parseInt(m.id)} key={m.id}>
                                      {m.value}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                            </Col>
                            <Col xs={6} className="d-flex justify-content-end">
                              <Link>Send to parent</Link>
                            </Col>
                            <Col xs={6}>
                              <Form.Group
                                as={Row}
                                className="w-75"
                                controlId="formPlaintextEmail"
                              >
                                <Form.Label>Student Name</Form.Label>
                                <Form.Select
                                  onChange={(e) =>
                                    setSelectedStudent(e.target.value)
                                  }
                                  aria-label="Month"
                                  size="md"
                                >
                                  <option>-- Select a student --</option>
                                  {studentList.map((s) => {
                                    return (
                                      <option value={s.studentId}>
                                        {s.name}
                                      </option>
                                    );
                                  })}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col className="d-flex justify-content-end">
                              <Form.Group
                                as={Row}
                                className="w-50"
                                controlId="formPlaintextEmail"
                              >
                                <Form.Label>Student ID</Form.Label>
                                <Form.Select
                                  aria-label="Student ID"
                                  size="md"
                                  aria-readonly
                                  disabled
                                >
                                  <option>{selectedStudent}</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>

                          <br></br>
                        </Container>
                        <br></br>

                        <table className="table table-sm w-100">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Subject</th>
                              <th className="text-center" scope="col">
                                Score
                              </th>
                              <th className="text-center" scope="col">
                                Grade
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {subjectItemOptions.map((si, index) => {
                              return (
                                <tr key={si.subjectId}>
                                  <td>{subjectItemOptions.indexOf(si) + 1}</td>
                                  <td>{si.subjectId}</td>
                                  <td className="d-flex justify-content-center">
                                    <Form.Control
                                      name="score"
                                      className="w-25 text-center fw-bold"
                                      size="sm"
                                      type="number"
                                      value={si.score}
                                      onChange={(e) =>
                                        handleInputChange(index, e, si.maxScore)
                                      }
                                    />
                                  </td>
                                  <td className="fw-bold text-center">
                                    {si.grade}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </Col>
                    </Row>
                    <br></br>
                    <Row className="w-100">
                      <Col>
                        <Row>
                          <Col>
                            <span>Total Score</span>
                          </Col>
                          <Col>
                            <Form.Control
                              value={totalScore}
                              className=" text-center fw-bold"
                              size="sm"
                              type="number"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <span>Total Grade</span>
                          </Col>
                          <Col>
                            <Form.Control
                              value={totalGrade["grade"]}
                              className=" text-center fw-bold"
                              size="sm"
                              type="text"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <span>Ranking</span>
                          </Col>
                          <Col>
                            <Form.Control
                              value={totalScore}
                              className="text-danger text-center fw-bold"
                              size="sm"
                              type="number"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <br></br>
                    <Row className="w-100">
                      <Col>
                        <Row>
                          <Col>
                            <span>Average</span>
                          </Col>
                          <Col>
                            <Form.Control
                              value={average}
                              className=" text-center fw-bold"
                              size="sm"
                              type="number"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <span>Absences</span>
                          </Col>
                          <Col>
                            <Form.Control
                              onChange={(e) => setAbsence(e.target.value)}
                              value={absence}
                              className=" text-center fw-bold"
                              size="sm"
                              type="number"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <span>Permissions</span>
                          </Col>
                          <Col>
                            <Form.Control
                              onChange={(e) => setPermission(e.target.value)}
                              value={permission}
                              className=" text-center fw-bold"
                              size="sm"
                              type="number"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row className="w-100">
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
                              <Form.Control
                                onChange={(e) => setTeacherCmt(e.target.value)}
                                value={teacherCmt}
                                as="textarea"
                                rows={3}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <br></br>
                    <Row className="w-100">
                      <Col>
                        <Form.Label>Issued at</Form.Label>
                        <Form.Control
                          value={issuedAt}
                          onChange={(e) => setIssuedAt(e.target.value)}
                          className="fw-bold"
                          size="sm"
                          type="text"
                        />
                      </Col>
                      <Col>
                        <Form.Label>Issued Date</Form.Label>
                        <Form.Control
                          value={issuedDate}
                          onChange={(e) => setIssuedDate(e.target.value)}
                          className=" fw-bold"
                          size="sm"
                          type="date"
                        />
                      </Col>
                    </Row>
                    <br></br>
                    <Row className="w-100">
                      <Col>
                        <Row>
                          <Col xs={4}>
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
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={doCreateReport}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

              <br></br>
              <table class="table sp-normal">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Report Id</th>
                    <th scope="col">Student</th>
                    <th scope="col">Month</th>
                    <th scope="col">Issued at</th>
                    <th scope="col">Parent Comment</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reportList.map((report) => {
                    return (
                      <tr>
                        <th scope="row">{reportList.indexOf(report) + 1}</th>
                        <td>
                          <Link
                            to={`/report/${report.reportId}`}
                            target="_blank"
                          >
                            {report.reportId}
                          </Link>
                        </td>
                        <td>
                          {report.studentFirstname +
                            " " +
                            report.studentLastname}
                        </td>
                        <td>{report.month}</td>
                        <td>{report.issuedAt.slice(0, 10)}</td>
                        <td>{report.parentCmt}</td>
                        <td>
                          <FontAwesomeIcon
                            className="text-primary mx-3"
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
          </Row>
        </Container>
      )}
    </Container>
  );
}
