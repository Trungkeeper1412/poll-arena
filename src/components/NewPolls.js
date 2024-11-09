import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePoll } from "../actions/polls";
import Layout from "./shared/Layout";
import "../css/newPolls.css";
import { useNavigate } from "react-router-dom";

const NewPolls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.users.authedUser);

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [errorOption1, setErrorOption1] = useState(false);
  const [errorOption2, setErrorOption2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [duplicateError, setDuplicateError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    setErrorOption1(false);
    setErrorOption2(false);
    setDuplicateError(false);
    setSubmitMessage("");

    if (!option1) {
      setErrorOption1(true);
      hasError = true;
    }

    if (!option2) {
      setErrorOption2(true);
      hasError = true;
    }

    // Check if options are the same
    if (option1.trim().toLowerCase() === option2.trim().toLowerCase()) {
      setDuplicateError(true);
      setSubmitMessage("You can't have two options which are the same");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setLoading(true);

    const question = {
      author: authedUser.id,
      optionOneText: option1,
      optionTwoText: option2,
    };

    try {
      await dispatch(savePoll(question));
      setSubmitMessage("Poll created successfully!");
      setOption1("");
      setOption2("");

      // Redirect to homepage after 1 second
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setSubmitMessage("Submission failed, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container className="mt-5">
        <h1 className="text-center">Create Your New Poll Right Now!</h1>
        <Card className="mt-4 new-poll-card">
          <Card.Header className="card-header-custom">
            <h6 className="m-0">
              If you have to choose, will you choose to ...
            </h6>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formOption1">
                <Form.Label>First Option</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first option"
                  value={option1}
                  onChange={(e) => {
                    setOption1(e.target.value);
                    setDuplicateError(false);
                    setSubmitMessage("");
                  }}
                  isInvalid={errorOption1 || duplicateError}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errorOption1 ? "Please fill in this option." : ""}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="or-separator text-center">
                <span className="line" />
                <span className="or-text">OR</span>
                <span className="line" />
              </div>

              <Form.Group controlId="formOption2">
                <Form.Label>Second Option</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter second option"
                  value={option2}
                  onChange={(e) => {
                    setOption2(e.target.value);
                    setDuplicateError(false);
                    setSubmitMessage("");
                  }}
                  isInvalid={errorOption2 || duplicateError}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errorOption2 ? "Please fill in this option." : ""}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="mt-3">
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Creating Poll..." : "Create Poll"}
                </Button>
              </div>
            </Form>

            {submitMessage && (
              <p
                className={`mt-3 ${
                  submitMessage.includes("failed") || duplicateError
                    ? "text-danger"
                    : "text-success"
                } font-weight-bold`}
              >
                {submitMessage}
              </p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default NewPolls;
