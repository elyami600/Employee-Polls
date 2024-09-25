import { connect } from "react-redux"
import { formatDate, formatQuestion } from "../utils/helper"


const Questions = (props) => {
    console.log("Questions props ", props)
    const {id, name, avatar, timestamp } = props.question

    const toParent = (e, id) => {
        e.preventDefault();
        
    }
    return (
        <div className="question">
            <img src={avatar} alt={`${name}`} className="avatar" />
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