
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/questions";
import { setAuthedUser } from "../actions/authedUser";
import NotFound from './404page'
import { useEffect } from "react";


// const withRouter = (Component) => {
//   //   const ComponentWithRouterProp = (props) => {
//   //     let location = useLocation();
//   //     let navigate = useNavigate();
//   //     let params = useParams();
//   //     return <Component {...props} router={{ location, navigate, params }} />;
//   //   };
  
//   //   return ComponentWithRouterProp;
//   // };


const PollAnswer = (props) => {
  console.log("Poll answer ", props)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const params = useParams();
  const id = params.id

  const authedUser = useSelector((state) => state.authedUser)
  const users      = useSelector((state) => state.users)
  const questions  = useSelector((state) => state.questions)

  const question = questions[id];
  const author =  users[question.author];

  
  
  useEffect(() => {
    if (!question) {
      dispatch(setAuthedUser(null));
      navigate('/login');
    }
  }, [question, dispatch, navigate]);

  if (!question) return <NotFound />;

  
  const voteOptioneOne = question.optionOne.votes.includes(authedUser)
  const voteOptioneTwo = question.optionTwo.votes.includes(authedUser)
  const hasVoted = voteOptioneOne || voteOptioneTwo;

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;

  const  totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePercent = Math.round((optionOneVotes / totalVotes) * 100) || 0;
  const optionTwoPercent = Math.round((optionTwoVotes / totalVotes) * 100) || 0;


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
      <h1> Poll by {author.name} </h1>
      <img src={author.avatarURL} alt={`Avar of ${author.name}`} className="avatar" />
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
             <h1>You Voted</h1>
              <div className="progress-bar">
                <label>{question.optionOne.text}</label>
                <div className="progress-bar-completed" style={{ width: `${optionOnePercent}%` }}>
                  <label id="progress-bar-label" className="visually-hidden"> Votes: ({optionOneVotes}) {optionOnePercent}%</label>
              </div>
            </div>
            <br></br>
            <div className="progress-bar">
            <label>{question.optionTwo.text}</label>
              <div className="progress-bar-completed" style={{ width: `${optionTwoPercent}%` }}>
                <label id="progress-bar-label" className="visually-hidden">Votes:  ({optionTwoVotes}) {optionTwoPercent}%</label>
              </div>
            </div>
           
          </div>

          
        )}
        
      </div>
</div>
  )
}
export default PollAnswer

// const mapStateToProps = ({ authedUser, users, questions,}, props) => {
//   const { id }= props.router.params;
 
//   return {
//     id,
//     users,
//     questions,
//     authedUser
//   }
// }

// export default withRouter(connect(mapStateToProps)(PollAnswer))