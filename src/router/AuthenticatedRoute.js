import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const AuthenticatedRoute = ({ element, authedUser }) => {
  const location = useLocation();

  // If the user is not authenticated, redirect to login and store the current pathname
  return authedUser ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const mapStateToProps = (state) => ({
  authedUser: state.users.authedUser,
});

export default connect(mapStateToProps)(AuthenticatedRoute);
