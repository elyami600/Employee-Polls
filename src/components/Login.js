import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import {Navigate, useNavigate } from "react-router";




const LogingPage = ({  dispatch , users , loggedIn}) => {
    console.log("Longing page ", users)
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleUsername= (e) => {
        e.preventDefault()
        const username = e.target.value;
       setUsername(username)
    }

    const handlePassword = (e) => {
        e.preventDefault()
        const password = e.target.value;
        setPassword(password)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userExit = users.find((user) => 
            (user.id.includes(username) && 
            user.password.includes(password)))  

        if(userExit) {
            dispatch(setAuthedUser(username)); 
            setSuccess(true)
            setError(false)
            navigate("/");
            return;
        } 
        setSuccess(false);
        setError(true);
        setUsername("")
        setPassword("")

    }

    return(
        <div className="container">
            {error &&
                <h1 data-testid="error-header">Error: Please ensure all fields are filled out.</h1>
            }
            <h1 className="center">Long In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>username:</label>
                    <input
                        data-testid="email-input"
                        type="text"
                        placeholder="username..."
                        value={username}
                        onChange={handleUsername}
                    />
                </div>
                <div>
                    <label>password:</label>
                    <input
                        data-testid="email-input"
                        type="password"
                        placeholder="password..."
                        value={password}
                        onChange={handlePassword}
                    />
                </div>
                <button className="btn" type="submit" disabled={username === "" && password === ""}>Submit</button>
                {/* <input
                    data-testid="submit-button"
                    type="submit"
                    value="Submit"
                /> */}
            </form>
            
        </div>
    )
}
const mapStateToProps = ({ users , authedUser}) => {
    return { 
       users : Object.values(users),
       loggedIn: !!authedUser,
     }
}
export default connect(mapStateToProps)(LogingPage);
