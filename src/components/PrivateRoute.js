import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ loading }) => {
    const isAuthenticated = loading

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
const mapStateToProps = ({ authedUser }) => ({
    loading: authedUser === null,
  })
  
export default connect(mapStateToProps)(PrivateRoute);