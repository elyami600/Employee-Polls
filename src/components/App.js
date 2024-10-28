import { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from 'react-redux';
import { Routes, Route } from "react-router";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./404page";
import Login from './Login';
import PollAnswer from "./PollAnswer";
import PrivateRoute from "./PrivateRoute";



const App = ({ dispatch, authedUser, loading }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <div>
      {authedUser && <Nav />}
      <div className="container">
        <Routes>
          {/* Protected routes wrapped inside PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/question/:id" element={<PollAnswer />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/add" element={<NewQuestion />} />
          </Route>

          {/* Login route accessible without authentication */}
          <Route path="/login" element={<Login />} />

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
