import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ClsCard({ title, classId, teacherId }) {
  return (
    <Card className="w-100">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Class ID: {classId}</Card.Text>
        <Card.Text>Teacher ID: {teacherId}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ClsCard;
