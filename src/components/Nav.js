import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";


const Nav = ({ dispatch, authedUser, curentUser }) => {
   // console.log("Props  nav currrentUser ", curentUser.avatarURL)

    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        dispatch(setAuthedUser(null));
        navigate('/login');
    }

    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link data-testid='home' to="/">Home</Link>
                </li>
                <li>
                    <Link data-testid='leaderdoard' to="/leaderboard">Leaderdboard</Link>
                </li>
                <li>
                    <Link data-testid='newQuestion' to="/add">New Question</Link>
                </li>
                {curentUser == true && <li>
                    <Link data-testid='loging'      to="/login">Loging</Link>
                </li>}
                <div className="nav-avatar">
                    <li data-testid='authedUser'>
                    <img src={`${curentUser.avatarURL}`} alt={`Avar of ${curentUser.name}`} className="avatar" />
                    <strong>{curentUser.name}</strong>
                    </li>
                </div>
               
                <li>
                    <Link data-testid='logout' onClick={logout}>Logout</Link>
                </li>
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