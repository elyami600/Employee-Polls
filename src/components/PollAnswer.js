
import { connect } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/questions";
import { setAuthedUser } from "../actions/authedUser";
import NotFound from './404page'
import { useEffect } from "react";


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
  const navigate = useNavigate();

  const { dispatch, id, users , authedUser, questions } = props;
  
  useEffect(() => {
    if (!questions[id]) {
      dispatch(setAuthedUser(null));
      navigate('/login');
    }
  },[questions[id],dispatch, navigate])

  if (!questions[id]) return <NotFound />;

  const question = questions[id];
  const avatar   = users[question.author].avatarURL
  const name     = users[question.author].name

  const voteOptioneOne = questions[id].optionOne.votes.includes(authedUser)
  const voteOptioneTwo = questions[id].optionTwo.votes.includes(authedUser)
  const hasVoted = voteOptioneOne || voteOptioneTwo;

  const optionOneVotes = questions[id].optionOne.votes.length;
  const optionTwoVotes = questions[id].optionTwo.votes.length;

  const total = optionOneVotes + optionTwoVotes;
  const optionOnePercent = Math.round(100 * (optionOneVotes / total));
  const optionTwoPercent = Math.round(100 * (optionTwoVotes / total));
  
  const  optionOnePercentMax = Math.max( optionOnePercent, optionTwoPercent)
  const  optionTwoPercentMin = Math.min( optionOnePercent, optionTwoPercent)

  


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
             <h1>You Already Voted</h1>
              <div className="progress-bar">
                <div className="progress-bar-completed" style={{ width: `${optionOnePercentMax}%` }}>
                  <span id="progress-bar-label" className="visually-hidden">Votes: {optionOnePercentMax}%</span>
              </div>
            </div>
            <br></br>
            <div className="progress-bar">
              <div className="progress-bar-completed1" style={{ width: `${optionTwoPercentMin}%` }}>
                <span id="progress-bar-label" className="visually-hidden">Votes:  {optionTwoPercentMin}%</span>
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