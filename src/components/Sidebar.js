import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Homepage from "../pages/Homepage";

export default function Sidebar() {
  return (
    <div>
      <Container>
        <br></br>
        <Link to="/">
          <Row className="bg-light px-3 py-2 btn w-100 text-start">
            Classroom
          </Row>
        </Link>

        <Link to="/student">
          <Row className="bg-light px-3 py-2 btn w-100 text-start">Student</Row>
        </Link>
      </Container>
    </div>
  );
}
