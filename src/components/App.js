
import { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";





const App = (props) => {
  console.log("App props", props)

   useEffect(() => {
      props.dispatch(handleInitialData());
    }, [])


  return (
   <div>{props.loading === true ? null : <Dashboard />}</div>
  );
}
const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});
export default connect(mapStateToProps)(App);
