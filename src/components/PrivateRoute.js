import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = ({ authedUser, children }) => {
  const location = useLocation();
  return authedUser ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);
