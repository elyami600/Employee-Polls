import { useSelector } from "react-redux";
import Question from "./Question";
import NotFound from './404page'
import { useState } from "react";

const Dashboard = () => {
  //console.log("Dashboard props ", questionsIds)
  const authedUser = useSelector((state) => state.authedUser)
  const questions  = useSelector((state) => state.questions);
  const questionsIds = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  const [showNewQuestions, setShowNewQuestions] = useState(true);

  if (!questions) return <NotFound />;

  // check if the id has answer the question
  // return new array question ID that authedUser hasnt voted ye
  const answeredQuestions = questionsIds.filter((id) => {
    const { optionOne, optionTwo } = questions[id];
    return optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser);
  });
  const unansweredQuestions = questionsIds.filter((id) => !answeredQuestions.includes(id));
  return (
    <div className="card-grid">
      <button className="toggle-btn" onClick={() => setShowNewQuestions(!showNewQuestions)}>
        {showNewQuestions ? "Show Done Questions" : "Show New Questions"}
      </button>
  
      {showNewQuestions ? (
        <section className="question-section">
          <h3 className="center"><strong>Unanswered Polls</strong></h3>
          <ul className="dashboard-list">
            {unansweredQuestions.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="question-section">
          <h3 className="center"><strong>Answered Polls</strong></h3>
          <ul className="dashboard-list">
            {answeredQuestions.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
  export default Dashboard;
  

// const mapStateToProps = ({ questions, authedUser}) => ({

//     questionsIds: Object.keys(questions).sort(
//       (a, b) => questions[b].timestamp - questions[a].timestamp
//     ),
//     questions,
//     authedUser,
  
// });
// export default connect(mapStateToProps)(Dashboard);