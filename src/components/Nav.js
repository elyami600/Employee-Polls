import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";


const Nav = ({ dispatch, authedUser, curentUser }) => {
    //console.log("Props  nav currrentUser ", curentUser.name)

    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        if(curentUser != null)
            dispatch(setAuthedUser(null));
            navigate('/login');

        
        
     
      };

    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link data-testid='home' to="/">Home</Link>
                </li>
                <li>
                    <Link data-testid='leaderdoard' to="/leaderdoard">Leaderdboard</Link>
                </li>
                <li>
                    <Link data-testid='newQuestion' to="/add">New Question</Link>
                </li>
                <li>
                    <Link data-testid='loging'      to="/login">Loging</Link>
                </li>
                <li data-testid='authedUser'> User: {authedUser} </li>

                {<li>
                    <Link data-testid='logout' onClick={logout}>Logout</Link>
                </li>}
            </ul>

        </nav>
    )
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
      curentUser : users[authedUser],
      authedUser,
    };
  };
export default connect(mapStateToProps)(Nav);