import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { faPersonCircleCheck } from "@fortawesome/free-solid-svg-icons";

function ClsCard({ title, classId, teacherId }) {
  return (
    // <Card className="w-100">
    //   <Card.Body>
    //     <Card.Title>{title}</Card.Title>
    //     <Card.Text>Class ID: {classId}</Card.Text>
    //     <Card.Text>Teacher ID: {teacherId}</Card.Text>
    //   </Card.Body>
    // </Card>

    <div class="card text-dark bg-light mb-3 w-100">
      <div class="card-header">
        <FontAwesomeIcon className="text-primary" icon={faSchool} />
        <span className="ms-2 sp">{classId}</span>
      </div>
      <div class="card-body">
        <span class="card-title sp-heading-no-bold">{title}</span>

        <div>
          <FontAwesomeIcon
            className="text-primary mt-2"
            icon={faPersonCircleCheck}
          />
          <span class="card-text ms-2 sp">{teacherId}</span>
        </div>
      </div>
    </div>
  );
}

export default ClsCard;
