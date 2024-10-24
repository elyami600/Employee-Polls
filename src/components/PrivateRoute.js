// PrivateRoute.js
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ authedUser }) => {
  return authedUser ? <Outlet /> : <Navigate to="/login" />;
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);
