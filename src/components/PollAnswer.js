
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
  //const navigate = useNavigate()
  
  console.log("Poll answer ", props)
//const { name, avatar, optionOneText , optionTwoText } = props
  const { dispatch, id, users, questions } = props;
  const question = questions[id];
  const avatar   = users[question.author].avatarURL
  const name     = users[question.author].name

  const handleOptioneOne = (e) => {
    e.preventDefault()
    dispatch(handleAddQuestionAnswer(id, "optionOne"));
     console.log("hanldeOptionOne", id, "optionOne",)
   
  }

  const handleOptioneTwo = (e) => {
    e.preventDefault()
    dispatch(handleAddQuestionAnswer(id, "optionTwo"))
  }

  // const handleBackHome = (e) => {
  //   e.preventDefault();
  //   navigate("/");
  // };

  return (
    <div className="center">
      <h1> Poll by {name} </h1>
      <img src={avatar} alt={`Avar of ${name}`} className="avatar" />
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
</div>
  )
}

const mapStateToProps = ({ authedUser, users, questions,}, props) => {
  const { id }= props.router.params;
 
  // const name  = users[questions[id].author].name
  // const avatar = users[questions[id].author].avatarURL
  // const optionOneText = questions[id].optionOne.text
  // const optionTwoText = questions[id].optionTwo.text

  return {
    id,
    users,
    questions,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(PollAnswer))