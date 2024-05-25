import { Container, Dropdown, Row } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

export default function InnerSidebar() {
  return (
    <div>
      <Container>
        <Link to="/classroom/subject-item">
          <Row className="bg-light px-3 py-2 btn w-100 text-start">
            Subject Item
          </Row>
        </Link>
        <Link to="/classroom/reports">
          <Row className="bg-light px-3 py-2 btn w-100 text-start">Reports</Row>
        </Link>
      </Container>
    </div>
  );
}
