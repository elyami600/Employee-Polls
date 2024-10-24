import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = ({questions, questionsIds, authedUser }) => {

  // check if the id has answer the question
  // return new array questionID that authedUser hasnt voter yet
  const hasAnwerQuestion = questionsIds.filter((id) => {
    const { optionOne, optionTwo } = questions[id];
    return optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser);
  });
  const notAnswersQuestion = questionsIds.filter((id) => !hasAnwerQuestion.includes(id));
  
  console.log("Dashboard props ", questionsIds)
    return (
      <div className="card-grid">
        <h3 className="center">New Questions</h3>
        <ul className="dashboard-list">
            {notAnswersQuestion.map((id) =>(
                <li key={id}>
                  <Question id={id}/>
                </li>
            ))}
        </ul>
      </div>
    )
}

const mapStateToProps = ({ questions, authedUser}) => ({

    questionsIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    questions,
    authedUser,
  
  
  });
export default connect(mapStateToProps)(Dashboard);