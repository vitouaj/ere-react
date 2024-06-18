import {
  Col,
  Container,
  Row,
  Modal,
  Button,
  Form,
  Spinner,
  Toast,
} from "react-bootstrap";
import Layout from "../Layout";
import ClsCard from "../components/ClsCard";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardUser, faPlus } from "@fortawesome/free-solid-svg-icons";
export default function Homepage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setLoading] = useState(false);

  const [user, setUser] = useState({});

  const [classroomData, setClassroomData] = useState([]);

  const [classname, setClassname] = useState("");

  const [showToast, setShowToast] = useState(false);

  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    getClassroom();
    getUser();
  }, []);

  async function getClassroom() {
    const teacherId = window.sessionStorage.getItem("activeUser");
    try {
      const result = await axios.get(
        "http://localhost:5137/api/v1/classroom?ownerId=" + teacherId
      );
      setClassroomData(result.data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate();

  async function getUser() {
    try {
      const activeUser = window.sessionStorage.getItem("activeUser");

      if (activeUser === null || activeUser === undefined) {
        return navigate("/login");
      }
      var url = "http://localhost:5137/api/v1/user/me?userId=" + activeUser;

      const result = await axios.get(url);
      console.log(result);
      const user = result.data;
      setUser(user);
      if (user !== null) {
        window.sessionStorage.setItem("user", user.email);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const [createClsRes, setClsRes] = useState("");

  async function doCreateClassroom(e) {
    e.preventDefault();
    handleClose();
    setLoading(true);
    const data = {
      id: "",
      teacherId: window.sessionStorage.getItem("activeUser"),
      name: classname,
      teacherName: "",
    };
    var result = {};
    try {
      console.log(data);
      result = await axios.post("http://localhost:5137/api/v1/classroom", data);
      setClsRes(result.data);
    } catch (e) {
      setClsRes(e.response.data);
      console.log(e);
    }

    setClassname("");
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
        <Container className="position-relative">
          <br></br>
          <br></br>
          <br></br>
          <Toast
            bg={createClsRes.success === true ? "success" : "danger"}
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
            <Toast.Body>{createClsRes.message}</Toast.Body>
          </Toast>
          <span className="sp-heading">Welcome {user.username}!</span>
          <br></br>
          <button
            onClick={handleShow}
            className="border-0 py-1 bg-primary text-white rounded-1"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="ms-2 sp-normal">Classrooom</span>
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
                  <Form.Control
                    required
                    type="text"
                    placeholder="My Class"
                    value={classname}
                    onChange={(e) => setClassname(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={doCreateClassroom}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>

          <br></br>
          <br></br>
          <div className="d-flex justify-content-between flex-wrap w-100">
            {classroomData.map((c) => {
              return (
                <Col xs={6} id="card-custom" className="px-2">
                  <ClsCard
                    title={c.name}
                    teacherId={c.teacherId}
                    classId={c.id}
                    numberOfStudents={c.numberOfStudents}
                    updatedAt={c.updatedAt}
                  />
                </Col>
              );
            })}
          </div>
        </Container>
      )}
    </Layout>
  );
}
