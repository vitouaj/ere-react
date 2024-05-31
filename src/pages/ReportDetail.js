import { Col, Container, Row, Form, Image, Spinner } from "react-bootstrap";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";
import { Link, Route } from "react-router-dom";
import InnerSidebar from "../components/InnerSidebar";
import Signature from "./signature-icon.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ReportDetail.css";
import axios from "axios";

export default function ReportDetail() {
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
  const [seletedMonth, setSelectedMonth] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [reportRecord, setReportRecord] = useState({});
  const [parentCmt, setParentCmt] = useState("");

  const gradeList = ["A", "B", "C", "D", "E", "F"];

  const handleInputChange = (index, event, maxScore) => {
    const { name, value } = event.target;
    const newSubjectItems = [...subjectItemOptions];
    newSubjectItems[index][name] = value;
    var gradeObj = calculateGrade((value / maxScore) * 100);
    newSubjectItems[index]["grade"] = gradeObj["grade"];

    setSubjectItemOptions(newSubjectItems);
  };
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

  async function getReportRecord(reportId) {
    var url = `http://localhost:5137/api/v1/classroom/report/${reportId}`;
    try {
      var res = await axios.get(url);
      console.log(res.data.payload);
      setResult(res.data.payload);
      mapToState(res.data.payload);
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

  async function mapToState(record) {
    setSelectedStudent(record.studentId);
    setAbsence(record.absence);
    setAverage(record.average);
    setClassID(record.classroomId);
    setIssuedAt(record.issuedAt);
    setSelectedMonth(record.month);
    setClassname(record.name);
    setTotalGrade(record.overallGrade);
    setPermission(record.permission);
    setTeacherCmt(record.teacherCmt);
    setTotalScore(record.totalScore);
    setStudentName(record.studentFirstname + " " + record.studentLastname);
    setSubjectItemOptions(record.reportItems);
  }

  useEffect(() => {
    setLoading(true);
    const pathname = window.location.pathname;
    var paths = pathname.split("/");
    var recordId = paths.at(-1);
    getMonths();
    getReportRecord(recordId);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="vh-100">
      {isLoading ? (
        <div className="row w-100 h-100 bg-light opacity-25">
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </div>
        </div>
      ) : (
        <div className="ctn">
          <br></br>
          <Row>
            <Col>
              <div>
                <h2>{classname}</h2>
                <small>{classID}</small>
              </div>
              <br></br>
              <Container>
                <Row>
                  <Col xs={6} className="p-0 mb-3">
                    <Form.Select
                      aria-label="Month"
                      as={Row}
                      className="w-75"
                      value={seletedMonth}
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
                      <label>Student Name</label>
                      <Form.Control
                        aria-label="Month"
                        size="md"
                        type="text"
                        value={studentName}
                        disabled
                      ></Form.Control>
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
                        value={selectedStudent}
                      >
                        <option>{selectedStudent}</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <br></br>
              </Container>
              <br></br>

              <table className="table table-striped w-100">
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
                  {subjectItemOptions !== undefined &&
                    subjectItemOptions.map((si, index) => {
                      return (
                        <tr key={si.subjectId}>
                          <td>{subjectItemOptions.indexOf(si) + 1}</td>
                          <td>{si.subject}</td>
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
                            {gradeList[si.grade - 1]}
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
                <div>
                  <span className="sp">Total Score</span>
                </div>
                <div>
                  <Form.Control
                    disabled
                    value={totalScore}
                    className="fw-bold text-center"
                    size="sm"
                    type="number"
                  />
                </div>
              </Row>
            </Col>
            <Col>
              <Row>
                <div>
                  <span className="sp">Total Grade</span>
                </div>
                <div>
                  <Form.Control
                    disabled
                    value={gradeList[totalGrade - 1]}
                    className=" text-center fw-bold"
                    size="sm"
                    type="text"
                  />
                </div>
              </Row>
            </Col>
            <Col>
              <Row>
                <div>
                  <span classname="sp">Ranking</span>
                </div>
                <div>
                  <Form.Control
                    disabled
                    value={totalScore}
                    className="text-danger text-center fw-bold"
                    size="sm"
                    type="number"
                  />
                </div>
              </Row>
            </Col>
          </Row>
          <br></br>
          <Row className="w-100">
            <Col>
              <Row>
                <div>
                  <span className="sp">Average</span>
                </div>
                <div>
                  <Form.Control
                    disabled
                    value={average}
                    className=" text-center fw-bold"
                    size="sm"
                    type="number"
                  />
                </div>
              </Row>
            </Col>
            <Col>
              <Row>
                <div>
                  <span className="sp">Absences</span>
                </div>
                <div>
                  <Form.Control
                    onChange={(e) => setAbsence(e.target.value)}
                    value={absence}
                    className=" text-center fw-bold"
                    size="sm"
                    type="number"
                  />
                </div>
              </Row>
            </Col>
            <Col>
              <Row>
                <div>
                  <span className="sp">Permissions</span>
                </div>
                <div>
                  <Form.Control
                    onChange={(e) => setPermission(e.target.value)}
                    value={permission}
                    className=" text-center fw-bold"
                    size="sm"
                    type="number"
                  />
                </div>
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
          <br></br>
          <Row className="w-100">
            <Col>
              <Row>
                <Col xs={4}>
                  <span>Parent Comment</span>
                </Col>
                <Col>
                  <Form.Group
                    type="text"
                    value={parentCmt}
                    onChange={(e) => setParentCmt(e.target.value)}
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
        </div>
      )}
    </div>
  );
}
