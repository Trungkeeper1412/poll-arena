import React from "react"; // Import React
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import PollPreview from "../poll/PollPreview";
import MostActiveUser from "./MostActiveUser";
import Layout from "../shared/Layout";
import { PacmanLoader } from "react-spinners";

const Trending = ({ polls, loading, users }) => {
  const getTotalResponses = (poll) => {
    return (
      (poll.optionOne?.votes.length || 0) + (poll.optionTwo?.votes.length || 0)
    );
  };

  const topPolls = Object.values(polls)
    .map((poll) => ({
      ...poll,
      totalResponses: getTotalResponses(poll),
    }))
    .sort((a, b) => b.totalResponses - a.totalResponses)
    .slice(0, 3);

  // Calculate activity score (polls created + poll responses)
  const activeUsers = Object.values(users)
    .map((user) => ({
      ...user,
      activityScore:
        Object.values(user.answers).length +
        Object.values(user.questions).length,
    }))
    .sort((a, b) => b.activityScore - a.activityScore)
    .slice(0, 3);

  const verticalSeparatorStyle = {
    border: "none",
    borderLeft: "2px solid #6c757d",
    height: "100%",
    margin: "0",
  };

  if (loading) {
    return (
      <div className="loader-container">
        <PacmanLoader loading size={50} speedMultiplier={1} />
        <p className="loading-text">Wait until Pacman finishes eating...</p>
      </div>
    );
  }

  return (
    <Layout>
      <Container className="mt-5">
        <Row>
          <Col md={7} className="mb-5 d-flex flex-column align-items-center">
            <h1 className="text-center">Trending Polls</h1>
            {topPolls.map((poll) => (
              <PollPreview key={poll.id} poll={poll} />
            ))}
          </Col>
          <Col md={1} className="d-none d-md-block">
            <div style={verticalSeparatorStyle} />
          </Col>

          <Col md={4} className="mb-5 d-flex flex-column align-items-center">
            <h1 className="text-center">Most Active Users</h1>
            {activeUsers.map((user, index) => (
              <MostActiveUser key={user.id} user={user} index={index} />
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  polls: state.polls.polls,
  users: state.users.users,
  loading: state.polls.loading || state.users.loading,
});

export default connect(mapStateToProps)(Trending);
