import { Col, Container, Row, Form } from "react-bootstrap";
import Layout from "../Layout";
import InnerSidebar from "../components/InnerSidebar";
import { Link } from "react-router-dom";

export default function Report() {
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
            <Row>
              <Col>
                <button className="btn btn-primary">Add new Report</button>
              </Col>
              <Col>
                <Form.Select aria-label="Month" size="md">
                  <option>-- This month --</option>
                  <option value="1">Jan</option>
                  <option value="2">Feb</option>
                  <option value="3">Mar</option>
                  <option value="1">Apr</option>
                  <option value="2">May</option>
                  <option value="3">Jun</option>
                  <option value="1">July</option>
                  <option value="2">Aug</option>
                  <option value="3">Sep</option>
                  <option value="1">Oct</option>
                  <option value="2">Nov</option>
                  <option value="3">Dec</option>
                </Form.Select>
              </Col>
            </Row>

            <br></br>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Report Id</th>
                  <th scope="col">Student</th>
                  <th scope="col">Status</th>
                  <th scope="col">Issued at</th>
                  <th scope="col">Parent Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <Link to="/classroom/reports/detail">R-23032</Link>
                  </td>
                  <td>Otto</td>
                  <td>Recieved</td>
                  <td>2024-5-23</td>
                  <td>Love it</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <Link to="/me">R-23042</Link>
                  </td>
                  <td>Otto</td>
                  <td>Recieved</td>
                  <td>2024-5-23</td>
                  <td>Love it</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
