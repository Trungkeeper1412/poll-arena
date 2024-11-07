import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { savePollAnswer } from "../../actions/polls";
import { Button, Container, Card, Row, Col, Spinner } from "react-bootstrap";
import Layout from "../shared/Layout";
import PollDetailOption from "./PollDetailOption";
import PollDetailAuthor from "./PollDetailAuthor";
import "../../css/pollDetail.css";

const PollDetail = ({ authedUser, users, polls, loading, saveLoading }) => {
  const { poll_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const poll = polls[poll_id];
  const author = poll ? users[poll.author] : null;

  //Check current authedUser vote if exists
  const userVote =
    poll &&
    authedUser &&
    (poll.optionOne.votes.includes(authedUser.id)
      ? "optionOne"
      : poll.optionTwo.votes.includes(authedUser.id)
      ? "optionTwo"
      : null);

  const hasVoted = Boolean(userVote);

  const totalVotes = poll
    ? (poll.optionOne.votes.length || 0) + (poll.optionTwo.votes.length || 0)
    : 0;

  const handleVote = async (answer) => {
    if (!answer || !authedUser) {
      !authedUser && navigate("/login");
      return;
    }

    try {
      await dispatch(
        savePollAnswer({ authedUser: authedUser.id, qid: poll.id, answer })
      );
    } catch (error) {
      alert(error);
    }
  };

  //404 check is here
  if (!polls[poll_id]) {
    if (loading) {
      return (
        <Layout>
          <div className="text-center mt-5">
            <Spinner animation="border" role="status" />
            <p>Loading poll data...</p>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <Container className="text-center mt-5">
          <h1 className="display-1">404</h1>
          <h2>Poll Not Found</h2>
          <p>Sorry, the poll you're looking for doesn't exist.</p>
          <Button
            variant="primary"
            onClick={() => navigate("/")}
            className="mt-3"
          >
            Return to Home
          </Button>
        </Container>
      </Layout>
    );
  }

  if (saveLoading) {
    return (
      <Layout>
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" />
          <p>Saving your vote...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Card className="poll-detail-card mb-3 shadow-sm">
        <Card.Body>
          <PollDetailAuthor author={author} timestamp={poll.timestamp} />

          <Row className="mt-4">
            <Col className="red-response">
              <PollDetailOption
                option={poll.optionOne}
                votes={poll.optionOne.votes}
                totalVotes={totalVotes}
                isUserVote={userVote === "optionOne"}
                onVote={() => handleVote("optionOne")}
                disabled={hasVoted}
                saveLoading={saveLoading}
                buttonVariants={"danger"}
              />
            </Col>
            <Col className="blue-response">
              <PollDetailOption
                option={poll.optionTwo}
                votes={poll.optionTwo.votes}
                totalVotes={totalVotes}
                isUserVote={userVote === "optionTwo"}
                onVote={() => handleVote("optionTwo")}
                disabled={hasVoted}
                saveLoading={saveLoading}
                buttonVariants={"primary"}
              />
            </Col>
          </Row>

          <div className="text-muted mt-3">Total Responses: {totalVotes}</div>
        </Card.Body>
      </Card>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  authedUser: state.users.authedUser,
  users: state.users.users,
  polls: state.polls.polls,
  loading: state.polls.loading || state.users.loading,
  saveLoading: state.polls.saveLoading,
});

export default connect(mapStateToProps)(PollDetail);
