import { Col, Container, Row, Image, Table } from "react-bootstrap";
import Layout from "../Layout";
import ClsCard from "../components/ClsCard";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
export default function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  async function getUser() {
    try {
      const activeUser = window.sessionStorage.getItem("activeUser");

      if (activeUser === null) {
        return navigate("/login");
      }

      var url = "http://localhost:5137/api/v1/user/me?userId=" + activeUser;
      const result = await axios.get(url);
      const user = result.data;
      setUser(user);

      console.log(user);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  function logout() {
    window.sessionStorage.clear();
    return navigate("/login");
  }

  return (
    <Layout>
      <Container>
        <br></br>
        <br></br>
        <br></br>
        <Row xs={12}>
          <Col xs={6}>
            <Image src="/user-avatar.png" roundedCircle width={200} />
            <br></br>

            <div>
              <h2>{user.username}</h2>
              <span>{user.role}</span>
            </div>

            <br></br>

            <table class="table">
              <tbody>
                <tr>
                  <td>UserID</td>
                  <td>{user.userID}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>{user.phonenumber}</td>
                </tr>
                <tr>
                  <td>Parent Contact</td>
                  <td>{user.parentEmail}</td>
                </tr>
              </tbody>
            </table>
            <br></br>

            <button onClick={logout} className="btn btn-danger">
              <span className="me-3">Logout</span>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
