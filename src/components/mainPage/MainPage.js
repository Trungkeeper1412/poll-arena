import React from "react";
import { connect } from "react-redux";
import Layout from "../shared/Layout";
import AuthMainPage from "./AuthMainPage";
import GuestMainPage from "./GuestMainPage";
import { PacmanLoader } from "react-spinners";

const MainPage = ({ authedUser, polls, loading }) => {
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
      {authedUser ? (
        <AuthMainPage polls={polls} />
      ) : (
        <GuestMainPage polls={polls} />
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  authedUser: state.users.authedUser,
  polls: state.polls.polls,
  loading: state.polls.loading || state.users.loading,
});

export default connect(mapStateToProps)(MainPage);
