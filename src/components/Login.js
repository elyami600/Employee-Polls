import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = ({ dispatch, users, loggedIn }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Redirect if logged in
    if (loggedIn) {
        const params = new URLSearchParams(window.location.search);
        const redirectURL = params.get('redirectTo');
        return <Navigate to={redirectURL || "/"} />;
    }

    // Single handler for both inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") setUsername(value);
        else if (name === "password") setPassword(value);
    };
   // handler the submit  for both inputs
   // ckeck if the user exits
    const handleSubmit = (e) => {
        e.preventDefault();
        const userExists = users.find(
            (user) => user.id === username && user.password === password
        );

        if (userExists) {
            dispatch(setAuthedUser(username));
            navigate("/");
        } else {
            setError(true);
            setUsername("");
            setPassword("");
        }
    };

    return (
        <div className="container">
            {error && (
                <h1 data-testid="error-header">
                    Error: Invalid username or password.
                </h1>
            )}
            <h1 className="center">Log In</h1>
            <form className="center" onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input 
                        data-testid="username-input"
                        type="text"
                        placeholder="username..."
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                    />
                </div>
                <br/>
                <div>
                    <label>Password:</label>
                    <input 
                        data-testid="password-input"
                        type="password"
                        placeholder="password..."
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    data-testid="submit-button"
                    className="btn"
                    type="submit"
                    disabled={!username || !password}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = ({ users, authedUser }) => ({
    users: Object.values(users),
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(LoginPage);
