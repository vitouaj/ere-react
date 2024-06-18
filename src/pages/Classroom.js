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
import {
  faBars,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../Layout";
import InnerSidebar from "../components/InnerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Student from "./Student";
import Report from "./Report";
import SubjectItemTab from "../components/SubjectItemTab";

export default function Classroom() {
  const [show, setShow] = useState(false);
  const [roleId, setRoleId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [subjectItems, setSubjectItems] = useState([]);
  const [classData, setClassData] = useState({});

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
    const localRole = window.sessionStorage.getItem("activeUserRole");
    setRoleId(localRole);

    setClassID(paths.at(-1));
    getClassroomById(paths.at(-1));
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

  async function getClassroomById(id) {
    try {
      var result = await axios.get(
        "http://localhost:5137/api/v1/classroom/" + id
      );
      setClassData(result.data.payload);
      console.log(result.data.payload);
    } catch (e) {
      console.log(e);
    }
  }

  const [result, setResult] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
            <div>
              <h4 className="">{classData.name}</h4>
              <span className="sp-normal">{classData.classroomId}</span>
            </div>
            <br></br>
            <Tabs
              defaultActiveKey="reports"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="reports" title="Reports">
                <Report classroom={classData} />
              </Tab>
              {roleId === "2" && (
                <Tab eventKey="subject-item" title="Subject Item">
                  <SubjectItemTab classroom={classData} />
                </Tab>
              )}
              {roleId === "2" && (
                <Tab eventKey="students" title="Students">
                  <Student classroom={classData} />
                </Tab>
              )}
            </Tabs>
          </Row>
        </Container>
      )}
    </Layout>
  );
}
