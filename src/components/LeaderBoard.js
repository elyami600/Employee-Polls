import { connect } from "react-redux"

const LeaderBoard = ({ users }) => {
    console.log("LeaderBoard props ", users)
    
      return (
        <div id="customers">
            <h3 className="center">Leaderboard</h3>
            <table  className="table_center">
            <thead>
                <tr>
                <th>Name</th>
                <th>Answer</th>
                <th>Poll</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                <tr key={user.id}> 
                    <td><img src={user.avatarURL}  alt={`Avar of ${user.name}`}className="avatar" /> {user.name}</td>
                     <td>{Object.values(user.answers).length}</td>
                     <td>{user.questions.length}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      );
}
const mapStateToProps = ({ users }) => {

    return {
        users: Object.values(users).sort((a,b) => 
            Object.values(b.answers).length - Object.values(a.answers).length),

    }
}

export default connect(mapStateToProps)(LeaderBoard)