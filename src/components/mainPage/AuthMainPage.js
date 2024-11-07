import React from "react";
import { Container, Nav, Tab, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import PollPreview from "../poll/PollPreview";

const AuthMainPage = ({ polls }) => {
  const authedUser = useSelector((state) => state.users.authedUser);
  const pollsArray = Array.isArray(polls) ? polls : Object.values(polls);

  const unansweredPolls = pollsArray
    .filter(
      (poll) =>
        !poll.optionOne.votes.includes(authedUser.id) &&
        !poll.optionTwo.votes.includes(authedUser.id)
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  const answeredPolls = pollsArray
    .filter(
      (poll) =>
        poll.optionOne.votes.includes(authedUser.id) ||
        poll.optionTwo.votes.includes(authedUser.id)
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Container>
      <h1>Welcome to PollArena</h1>
      <Tab.Container defaultActiveKey="unanswered">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="unanswered">Unanswered Polls</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="answered">Answered Polls</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="unanswered">
            {unansweredPolls.length > 0 ? (
              <Row className="g-10">
                {unansweredPolls.map((poll) => (
                  <Col key={poll.id} md={6} xs={12}>
                    <PollPreview poll={poll} />
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No unanswered polls available.</p>
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="answered">
            {answeredPolls.length > 0 ? (
              <Row className="g-10">
                {answeredPolls.map((poll) => (
                  <Col key={poll.id} md={6} xs={12}>
                    <PollPreview poll={poll} />
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No answered polls available.</p>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default AuthMainPage;
