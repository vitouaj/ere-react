import { Col, Container, Row, Image, Table } from "react-bootstrap";
import Layout from "../Layout";
import ClsCard from "../components/ClsCard";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <Layout>
      <Container>
        <br></br>
        <Row xs={12}>
          <Col xs={6}>
            <Image src="/user-avatar.png" roundedCircle width={200} />
            <br></br>

            <div>
              <h2>Kanika Chamroun</h2>
              <span>12 A</span>
            </div>

            <br></br>

            <table class="table">
              <tbody>
                <tr>
                  <td>Email</td>
                  <td>nika@ere-sys.com</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>089 300 302</td>
                </tr>
                <tr>
                  <td>Parent Contact</td>
                  <td>sivmey@gmail.com</td>
                </tr>
              </tbody>
            </table>
            <br></br>

            <Link to="/login">
              <button className="btn btn-danger">Logout</button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
