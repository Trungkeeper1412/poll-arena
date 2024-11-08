import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const AuthenticatedRoute = ({ element, authedUser }) => {
  return authedUser ? element : <Navigate to="/login" />;
};

const mapStateToProps = (state) => ({
  authedUser: state.users.authedUser,
});

export default connect(mapStateToProps)(AuthenticatedRoute);
