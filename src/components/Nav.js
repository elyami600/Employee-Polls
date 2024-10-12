import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/leaderdoard">Leaderdboard</Link>
                </li>
                <li>
                <Link to="/add">New Question</Link>
                </li>
                <li>
                <Link to="/login">Loging</Link>
                </li>
            </ul>

        </nav>
    )
}
export default Nav;