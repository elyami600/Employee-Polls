import {  useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { handleAddQuestion } from "../actions/questions";



const NewQuestion = ({ dispatch, id }) => {
    const navigate = useNavigate()
    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')
    

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
        if (optionOne === '' || optionTwo=== '') {
            alert("Please enter both options");
            return
        }
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
            <label htmlFor="optionOne">First Option</label>
            <input
              id="optionOne"
              data-testid="optionOne-input"
              placeholder="Option One..."
              type="text"
              value={optionOne}
              onChange={handleOptionOne}
            />
      
            <label htmlFor="optionTwo">Second Option</label>
            <input
              id="optionTwo"
              data-testid="optionTwo-input"
              placeholder="Option Two..."
              type="text"
              value={optionTwo}
              onChange={handleOptionTwo}
            />
    
            <button
              data-testid="submit-button"
              className="btn"
              type="submit"
              disabled={!optionOne && !optionTwo}
            >
              Submit
            </button>
          </form>
        </div>
      );
      
}
const mapStateToProps = ({authedUser}) => {
    return {
       authedUser,
    }
}
export default connect(mapStateToProps)(NewQuestion);