
import { Fragment, useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import { Routes, Route } from "react-router";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./404page"
import Login from './Login'
import PollAnswer from "./PollAnswer";



const App = (props) => {
  console.log("App props", props)

   useEffect(() => {
      props.dispatch(handleInitialData());
    }, []);
  
  return (
    <div>
      <Fragment>
        <div className="container"></div>
        <Nav/>
        {
        props.loading === true ? null : (
          <Routes>
             <Route path="/"       exact element={<Dashboard/>}/>
             <Route path="/question/:id" element={<PollAnswer/>}/>
             <Route path="/leaderdoard"  element={<LeaderBoard/>}/>
             <Route path="/add"          element={<NewQuestion/>}/>
             <Route path="/login"        element={<Login/>}/>
             <Route path="*"             element={<NotFound/>} />
          </Routes>
        )}
      </Fragment>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
})

export default  connect(mapStateToProps)(App);
