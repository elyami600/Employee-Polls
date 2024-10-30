import { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from "react-router";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./404page";
import Login from './Login';
import PollAnswer from "./PollAnswer";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const authedUser = useSelector((state) => state.authedUser);
  //const loading = authedUser === null;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <div>
      {authedUser && <Nav />}
      <div className="container">
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/question/:id" element={<PrivateRoute><PollAnswer /></PrivateRoute>} />
          <Route path="/leaderboard" element={<PrivateRoute><LeaderBoard /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><NewQuestion /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

// const mapStateToProps = ({ authedUser }) => ({
//   authedUser,
//   loading: authedUser === null,
// });

// export default connect(mapStateToProps)(App);
