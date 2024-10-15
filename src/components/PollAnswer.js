
import { connect } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/questions";


const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
    };
  
    return ComponentWithRouterProp;
  };


const PollAnswer = (props) => {
  console.log("Poll answer ", props)

  const { dispatch, id, users,authedUser, questions } = props;
  const question = questions[id];
  const avatar   = users[question.author].avatarURL
  const name     = users[question.author].name

  const voteOptioneOne = questions[id].optionOne.votes.includes(authedUser)
  const voteOptioneTwo = questions[id].optionTwo.votes.includes(authedUser)
  const hasVoted = voteOptioneOne || voteOptioneTwo;
  
  // const percentage = (value / total) * 100;
  // const value = Math.floor(Math.random() * 100);


  const handleOptioneOne = (e) => {
    e.preventDefault()
    dispatch(handleAddQuestionAnswer(id, "optionOne"));
  }

  const handleOptioneTwo = (e) => {
    e.preventDefault()
    dispatch(handleAddQuestionAnswer(id, "optionTwo"))
  }

  return (
    <div className="center">
      <h1> Poll by {name} </h1>
      <img src={avatar} alt={`Avar of ${name}`} className="avatar" />
      <div>
        {!hasVoted ? (
          <div>
            <h1>Would You Rather </h1>
          <div>
            <h3>{question.optionOne.text} </h3>
            <button onClick={handleOptioneOne}>Click</button>   
          </div>
          <div>
            <h3>{question.optionTwo.text} </h3>
            <button onClick={handleOptioneTwo}>Click</button>   
          </div>

          </div> 
        ) : (
          <div>
           <div className="progress-bar">
              <div className="progress-bar-completed" style={{ width: `${(4 / 8) * 100}%` }}>
              </div>
          </div>
          </div>

          
        )}
        
      </div>
</div>
  )
}

const mapStateToProps = ({ authedUser, users, questions,}, props) => {
  const { id }= props.router.params;
 
  return {
    id,
    users,
    questions,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(PollAnswer))