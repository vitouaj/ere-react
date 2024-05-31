import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Homepage from "../pages/Homepage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  return (
    <div>
      <Container className="p-0">
        <br></br>
        <Link to="/">
          <div className="bg-light py-2 btn w-100 text-start">
            <FontAwesomeIcon icon={faSchool} />
            <span className="mx-3">Classroom</span>
          </div>
        </Link>
      </Container>
    </div>
  );
}
