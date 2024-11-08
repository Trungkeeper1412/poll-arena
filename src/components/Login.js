import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Card } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { BiRename } from "react-icons/bi";
import { loginUser } from "../actions/users.js";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.error);
  const authedUser = useSelector((state) => state.users.authedUser);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(id, password));
  };

  useEffect(() => {
    if (authedUser) {
      navigate("/");
    }
  }, [authedUser, navigate]);

  return (
    <Container
      className="d-flex align-items-center justify-content-center login-container"
      style={{ height: "100vh" }}
    >
      <Card className="login-card">
        <Card.Body>
          <Card.Title className="text-center">Login to PollArena</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Id</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <BiRename />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Enter ID..."
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Login
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
