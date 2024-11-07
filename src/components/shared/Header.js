import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { logoutUser } from "../../actions/users";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.users.authedUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        PollArena
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/new-poll">
            New Polls
          </Nav.Link>
          <Nav.Link as={Link} to="/trending">
            Trendings
          </Nav.Link>
          {authedUser ? (
            <Nav.Item className="d-flex align-items-center">
              {authedUser.avatarURL ? (
                <img
                  src={authedUser.avatarURL}
                  alt={authedUser.name}
                  className="rounded-circle mr-2"
                  width="30"
                  height="30"
                />
              ) : (
                <FaUserCircle size={30} className="mr-2" />
              )}
              <span className="mr-3">{authedUser.name}</span>
              <Button variant="outline-danger ml-2" onClick={handleLogout}>
                Logout
              </Button>
            </Nav.Item>
          ) : (
            <Nav.Link as={Link} to="/login">
              <Button variant="primary">Login</Button>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
