import { connect } from "react-redux";

const Dashboard = (props) => {
    console.log("Dashboard props ", props)
    return (
      <div>
        <ul>
            {props.questionsIds.map((id) =>(
                <li key={id}>Questions ID : {id}</li>
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