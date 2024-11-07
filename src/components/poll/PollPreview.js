import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../css/pollPreview.css";
import { useNavigate } from "react-router-dom";

const PollPreview = ({ poll }) => {
  const users = useSelector((state) => state.users.users);
  const usersArray = Object.values(users);
  const navigate = useNavigate();

  const author = usersArray.find((user) => user.id === poll.author);
  const totalResponse =
    (poll.optionOne?.votes.length || 0) + (poll.optionTwo?.votes.length || 0);

  const handleViewPoll = () => {
    navigate(`/poll/${poll.id}`);
  };

  return (
    <Card className="poll-card mb-3 shadow-sm">
      <Card.Body className="d-flex flex-row justify-content-start">
        <div className="card-user">
          <div className="d-flex flex-column align-items-center">
            {author.avatarURL ? (
              <img
                src={author.avatarURL}
                alt={author.name}
                className="avatar"
              />
            ) : (
              <FaUserCircle className="avatar" />
            )}
            <div className="mt-2">
              <strong>
                Created by: {author ? author.name : "Unknown User"}
              </strong>
            </div>
            <div className="mt-1">
              <span className="timestamp">
                {new Date(poll.timestamp).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="text-right">
            <span>Responses: {totalResponse}</span>
            <Card.Title className="font-weight-bold mt-3">
              {poll.optionOne.text}
            </Card.Title>
            <p className="text-muted">Or...</p>
            <Button variant="primary" size="sm" onClick={handleViewPoll}>
              View Poll
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PollPreview;
