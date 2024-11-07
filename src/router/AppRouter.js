import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import MainPage from "../components/mainPage/MainPage";
import NewPolls from "../components/NewPolls";
import Trending from "../components/trending/Trending";
import PollDetail from "../components/poll/PollDetail";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-poll" element={<NewPolls />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/poll/:poll_id" element={<PollDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
