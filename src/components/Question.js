import { connect } from "react-redux"
import { formatDate, formatQuestion } from "../utils/helper"
import { useNavigate } from "react-router"
import NotFound from "./404page"


const Questions = (props) => {
    const navigate = useNavigate();
    
    if(props.questions === null) {
        return <NotFound/>
    }
    console.log("Questions props ", props)
    const {id, name, avatar, timestamp } = props.question

    const toParent = (e, id) => {
        e.preventDefault();
        navigate(`/question/${id}`);
        
    }
    return (
        <div className="question">
            <img src={avatar} alt={`Avar of ${name}`} className="avatar" />
            <div className="question-info">
                <div>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                </div>
                <button className="show-bnt" onClick={ (e) => toParent(e,id) }>show</button>

            </div>

        </div>
    )
}




const mapStateToProps = ({authedUser, users, questions }, {id}) => {
    const question = questions[id];

    return{
        authedUser,
        question: question 
        ? formatQuestion(question, users[question.author], authedUser) 
        : null
    }

}

export default connect(mapStateToProps)(Questions);