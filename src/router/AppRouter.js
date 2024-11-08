import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import MainPage from "../components/mainPage/MainPage";
import NewPolls from "../components/NewPolls";
import Trending from "../components/trending/Trending";
import PollDetail from "../components/poll/PollDetail";
import AuthenticatedRoute from "./AuthenticatedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AuthenticatedRoute element={<MainPage />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/add"
          element={<AuthenticatedRoute element={<NewPolls />} />}
        />
        <Route
          path="/leaderboard"
          element={<AuthenticatedRoute element={<Trending />} />}
        />
        <Route
          path="/poll/:poll_id"
          element={<AuthenticatedRoute element={<PollDetail />} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
