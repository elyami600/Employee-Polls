import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const Nav = ({ dispatch, currentUser, authedUser }) => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(setAuthedUser(null));
        navigate('/login');
    };

    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link data-testid="home" to="/">Home</Link>
                </li>
                <li>
                    <Link data-testid="leaderboard" to="/leaderboard">Leaderboard</Link>
                </li>
                <li>
                    <Link data-testid="newQuestion" to="/add">New Question</Link>
                </li>
                {!authedUser && (
                    <li>
                        <Link data-testid="login" to="/login">Login</Link>
                    </li>
                )}
                
                {currentUser && (
                    <div>
                        <li className="nav-avatar" data-testid="authedUser">
                            <img 
                                src={currentUser.avatarURL} 
                                alt={`Avatar of ${currentUser.name}`} 
                                className="avatar" 
                            />
                            <strong>{currentUser.name}</strong>
                        </li>
                        <li>
                            <button data-testid="logout" onClick={handleLogout} className="logout-btn">Logout</button>
                        </li>
                    </div>
                )}
            </ul>
        </nav>
    );
};

const mapStateToProps = ({ authedUser, users }) => ({
    currentUser: users[authedUser],
    authedUser,
});

export default connect(mapStateToProps)(Nav);
