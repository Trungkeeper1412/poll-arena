import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  MemoryRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "../components/shared/Header";
import NewPolls from "../components/NewPolls";

const mockStore = configureStore([]);

describe("Header Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        authedUser: {
          name: "Sarah Edo",
          avatarURL: "https://i.pravatar.cc/150?u=s1mple1abc29b26704a",
        },
      },
    });

    store.dispatch = jest.fn();
  });

  test("shows authedUser name and logout button when authedUser is authenticated", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Sarah Edo/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("shows login button when no user is authenticated", () => {
    store = mockStore({
      users: {
        authedUser: null,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('navigates to new poll page when "New Poll" link is clicked', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/new-poll" element={<NewPolls />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const newPollLink = screen.getByText(/New Polls/i);
    fireEvent.click(newPollLink);

    expect(
      screen.getByText(/Create Your New Poll Right Now!/i)
    ).toBeInTheDocument();
  });
});
