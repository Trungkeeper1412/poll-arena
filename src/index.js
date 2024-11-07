import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import logger from "./middleware/logger";
import usersReducer from "./reducers/users";
import pollsReducer from "./reducers/polls";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: {
    users: usersReducer,
    polls: pollsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
