import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Homepage from "../pages/Homepage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [roleId, setRoleId] = useState(null);
  useEffect(() => {
    const localRole = window.sessionStorage.getItem("activeUserRole");
    setRoleId(localRole);
    console.log(localRole);
  }, []);

  return (
    <div>
      <Container className="p-0">
        <br></br>
        {roleId === "1" ? (
          <Link to="/student-homepage">
            <div className="bg-light py-2 btn w-100 text-start">
              <FontAwesomeIcon className="text-primary" icon={faFileLines} />
              <span className="mx-3 text-primary">My Reports</span>
            </div>
          </Link>
        ) : (
          <Link to="/">
            <div className="bg-light py-2 btn w-100 text-start">
              <FontAwesomeIcon className="text-primary" icon={faSchool} />
              <span className="mx-3 text-primary">Classroom</span>
            </div>
          </Link>
        )}
      </Container>
    </div>
  );
}
