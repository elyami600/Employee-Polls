import {  useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { handleAddQuestion } from "../actions/questions";



const NewQuestion = ({ dispatch, id }) => {

    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')
    const navigate = useNavigate()

    const handleOptionOne = (e) => {
        e.preventDefault()
        const optionOne = e.target.value;
        setOptionOne(optionOne)
    }

    const handleOptionTwo = (e) => {
        e.preventDefault()
        const optionTwo = e.target.value;
        setOptionTwo(optionTwo) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleAddQuestion(optionOne ,optionTwo))

        setOptionOne("");
        setOptionTwo("");

        if(!id) {
            navigate("/")
         }
    }

    return (
        <div>
            <h3 className="center">Would You Rather</h3>
            <h4 className="center">Create Your Own Poll</h4>
            <form className="new-question" onSubmit={handleSubmit}>
                <label>First Option</label>
                <br />
                <input
                    data-testid="optionOne-input"
                    placeholder="Option One..."
                    type="text"
                    value={optionOne}
                    onChange={handleOptionOne}
                />
                <br />
                <label>Second Option</label>
                <br />
                <input
                    data-testid="optionTwo-input"
                    placeholder="Option Two..."
                    type="text"
                    value={optionTwo}
                    onChange={handleOptionTwo}
                />
                <button className="btn" type="submit" disabled={optionOne === "" && optionTwo === ""}>Submit</button>
            </form>
        </div>
    )
}
const mapStateToProps = ({authedUser}) => {
    return {
       authedUser,

    }
}
export default connect(mapStateToProps)(NewQuestion);