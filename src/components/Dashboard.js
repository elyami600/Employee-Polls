import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = (props) => {
    console.log("Dashboard props ", props)
    return (
      <div className="card-grid">
        <h3 className="center">New Questions</h3>
        <ul className="dashboard-list">
            {props.questionsIds.map((id) =>(
                <li key={id}>
                  <Question id={id}/>
                </li>
            ))}
        </ul>
      </div>
    )
}

const mapStateToProps = ({ questions }) => ({
    questionsIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  });
export default connect(mapStateToProps)(Dashboard);