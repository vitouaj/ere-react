import { Container, Dropdown, Row } from "react-bootstrap";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function InnerSidebar({ classId, name }) {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <Row
          onClick={() =>
            navigate("/classroom/subject-items/" + classId + "?name=" + name)
          }
          className="bg-light px-3 py-2 btn w-100 text-start"
        >
          Subject Item
        </Row>
        <Row
          onClick={() =>
            navigate("/classroom/reports/" + classId + "?name=" + name)
          }
          className="bg-light px-3 py-2 btn w-100 text-start"
        >
          Reports
        </Row>
        <Row
          onClick={() =>
            navigate("/classroom/students/" + classId + "?name=" + name)
          }
          className="bg-light px-3 py-2 btn w-100 text-start"
        >
          Students
        </Row>
      </Container>
    </div>
  );
}
