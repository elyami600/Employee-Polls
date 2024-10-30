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
      <button className="togle-btn" onClick={() => setShowNewQuestions(!showNewQuestions)}>
        {showNewQuestions ? "Show Done Questions" : "Show New Questions"}
      </button>

      {showNewQuestions ? (
        <>
          <h3 className="center"><strong>Unanswered polls</strong></h3>
          <br/>
          <br/>
          <ul className="dashboard-list">
            {unansweredQuestions.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>

          <h3 className="center"><strong> Answered polls</strong></h3>
          <br/>
          <br/>
          <ul className="dashboard-list">
            {answeredQuestions.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard

// const mapStateToProps = ({ questions, authedUser}) => ({

//     questionsIds: Object.keys(questions).sort(
//       (a, b) => questions[b].timestamp - questions[a].timestamp
//     ),
//     questions,
//     authedUser,
  
// });
// export default connect(mapStateToProps)(Dashboard);