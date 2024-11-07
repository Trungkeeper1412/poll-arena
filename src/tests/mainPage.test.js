import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MainPage from "../components/mainPage/MainPage.js";

const mockStore = configureStore([]);

describe("MainPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: { authedUser: null, loading: false },
      polls: { polls: [], loading: false },
    });
  });

  it("renders loading state correctly", () => {
    store = mockStore({
      users: { authedUser: null, loading: false },
      polls: { polls: [], loading: true },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <MainPage />
        </Router>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders AuthMainPage when user is authenticated", () => {
    store = mockStore({
      users: { authedUser: "sarahedo", loading: false },
      polls: { polls: [], loading: false },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <MainPage />
        </Router>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders GuestMainPage when user is not authenticated", () => {
    store = mockStore({
      users: { authedUser: null, loading: false },
      polls: { polls: [], loading: false },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <MainPage />
        </Router>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
