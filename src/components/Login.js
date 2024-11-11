import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Navigate, useNavigate, useLocation } from "react-router-dom";




const LoginPage = ({ dispatch, users, loggedIn }) => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [error, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    
    

    // Redirect if logged in
    if (loggedIn) {
        const params = new URLSearchParams(window.location.search);
        const redirectURL = params.get('redirectTo');
        return <Navigate to={redirectURL || "/"} />;
    }
    // if (loggedIn) {
    //     const lastVisitedURL = localStorage.getItem('lastVisitedURL');
    //     return <Navigate to={lastVisitedURL || "/"} />;
    // }


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
             navigate(state?.path || "/");
            // const redirectTo = state?.path || localStorage.getItem('lastVisitedURL') || "/";
            // navigate(redirectTo);
            //localStorage.removeItem('lastVisitedURL');
        } else {
            setError(true);
            setUsername("");
            setPassword("");
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      
      const handleUserSelect = (user) => {
        setUsername(user.id);
        setPassword(user.password);
        setIsOpen(false); 
        setError(false); 
    };
    

    return (
        <div className="container">
            {error && (
                <h1 className="center" data-testid="error-header">
                    Error: Invalid username or password.
                </h1>
            )}
            
            <h1 className="center">Log In</h1>
            <button className="existUser-btn" onClick={toggleDropdown}><strong>Exist User</strong></button>
           
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
                <br/>
                <br/>
                {isOpen && (
                <ul className="center">
                    {users.map((user) => (
                        <li key={user.id} onClick={() => handleUserSelect(user)}>
                            {user.name}
                        </li>
                    ))}
                </ul>
            )}  <br/>
               <br/>
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
