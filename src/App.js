import React, { useEffect } from "react";
import "./index.css";
import { connect } from "react-redux";
import AppRouter from "./router/AppRouter";
import { getPolls } from "./actions/polls";
import { getUsers } from "./actions/users";

const App = ({ getPolls, getUsers }) => {
  useEffect(() => {
    getPolls();
    getUsers();
  }, [getPolls, getUsers]);

  return <AppRouter />;
};

const mapDispatchToProps = {
  getPolls,
  getUsers,
};

export default connect(null, mapDispatchToProps)(App);
