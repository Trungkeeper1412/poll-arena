import React from "react";
import { Card } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import "../../css/mostActiveUser.css";

const MostActiveUser = ({ user, index }) => {
  return (
    <div className="mt-2">
      <Card className="text-center shadow-sm position-relative mb-3">
        <div className="ribbon">{`#${index + 1}`}</div>
        <Card.Body>
          {user.avatarURL ? (
            <img
              src={user.avatarURL}
              alt={user.name}
              className="rounded-circle mb-3"
              width="100"
              height="100"
            />
          ) : (
            <FaUserCircle size={100} className="mb-3" />
          )}
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>
            Poll Responses: {Object.values(user.answers).length}
            <br />
            Polls Created: {Object.values(user.questions).length}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MostActiveUser;
