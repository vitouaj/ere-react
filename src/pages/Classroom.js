import { Col, Container, Row } from "react-bootstrap";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";
import { Route } from "react-router-dom";
import InnerSidebar from "../components/InnerSidebar";

export default function Classroom() {
  return (
    <Layout>
      <Container>
        <br></br>

        <Row>
          <Col xs={3}>
            <br></br>
            <InnerSidebar />
          </Col>
          <Col>
            <br></br>

            <div>
              <h2>12 A</h2>
              <span>class of joy</span>
            </div>
            <br></br>
            <div>
              <button className="btn btn-primary">Add Subject Item</button>
            </div>
            <br></br>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Max score</th>
                  <th scope="col">Passing score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>History</td>
                  <td>75</td>
                  <td>35.5</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Chemistry</td>
                  <td>75</td>
                  <td>35.5</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Math</td>
                  <td>125</td>
                  <td>62.5</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
