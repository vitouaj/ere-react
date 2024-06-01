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
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
export default function StudentHomePage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setLoading] = useState(false);

  const [user, setUser] = useState({});
  const [reportList, setReportList] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getUser();
    getReportList();
  }, []);

  const navigate = useNavigate();

  async function getUser() {
    try {
      const activeUser = window.sessionStorage.getItem("activeUser");
      const userRole = window.sessionStorage.getItem("activeUserRole");

      if (
        activeUser === null ||
        activeUser === undefined ||
        userRole === undefined
      ) {
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

  async function getReportList() {
    const activeUser = window.sessionStorage.getItem("activeUser");
    var url = `http://localhost:5137/api/v1/classroom/reports/${activeUser}`;
    try {
      var result = await axios.get(url);
      setReportList(result.data.payload);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
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
          <br></br>

          <table class="table sp-normal">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Report Id</th>
                <th scope="col">Class</th>
                <th scope="col">Month</th>
                <th scope="col">Issued at</th>
                <th scope="col">Parent Comment</th>
              </tr>
            </thead>
            <tbody>
              {reportList.map((report) => {
                return (
                  <tr>
                    <th scope="row">{reportList.indexOf(report) + 1}</th>
                    <td>
                      <Link to={`/report/${report.reportId}`} target="_blank">
                        {report.reportId}
                      </Link>
                    </td>
                    <td>{report.name}</td>
                    <td>{report.month}</td>
                    <td>{report.issuedAt.slice(0, 10)}</td>
                    <td>{report.parentCmt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
      )}
    </Layout>
  );
}
