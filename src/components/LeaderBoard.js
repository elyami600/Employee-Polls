import { connect } from "react-redux"




const LeaderBoard = (props) => {
    console.log("LeaderBoard props ", props.questionsIds)
    
    const uniqueArray = [...new Set(props.questionsIds)]; 

   

      
      return (
        <div className="center">
            <table className="dashboard-list">
            <thead>
                <tr>
                <th>Name</th>
                <th>Answer</th>
                <th>Poll</th>
                </tr>
            </thead>
            <tbody>
                {uniqueArray.map(row => (
                <tr key={row}>
                    
                    <td><img src={props.users[props.questions[row].author].avatarURL} alt={`Avar of ${props.users[props.questions[row].author].name}`} className="avatar" /> {props.users[props.questions[row].author].name}  ({props.questions[row].author})</td>
                    <td> {props.questions[row].optionOne.votes.length + props.questions[row].optionTwo.votes.length} </td>
                    <td> {props.users[props.questions[row].author].questions.length} </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      );
}
const mapStateToProps = ({authedUser, users, questions }) => {
    

    return {
        authedUser,
        users,
        questions,
        questionsIds:[... new Set(Object.keys(questions).sort(
            (a, b) => questions[b].timestamp - questions[a].timestamp
          ),)]
       
    }

}

export default connect(mapStateToProps)(LeaderBoard)