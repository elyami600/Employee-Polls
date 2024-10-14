import { connect } from "react-redux";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
};

export default connect()(NotFound);