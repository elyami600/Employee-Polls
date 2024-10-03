import {  useState } from "react";
import { connect } from "react-redux";

const NewQuestion = ({ dispatch , id }) => {
    console.log("NewQuestion", NewQuestion)

    const [optionOne, setOptionOne] = useState("")
    const [optionTwo, setOptionTwo] = useState("")

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

        setOptionOne("");
        setOptionTwo("");
    }

    return (
        <div>
            <h3 className="center">Would You Rather</h3>
            <h6 className="center">Create Your Own Poll</h6>
            <form className="new-question" onSubmit={handleSubmit}>
                <label>First Option</label>
                <br />
                <input
                    data-testid="optionOne-input"
                    placeholder="Option One"
                    type="text"
                    value={optionOne}
                    onChange={handleOptionOne}
                />
                <label>Second Option</label>
                <input
                    data-testid="optionTwo-input"
                    placeholder="Option Two"
                    type="text"
                    value={optionTwo}
                    onChange={handleOptionTwo}
                />
                <button className="btn" type="submit" disabled={optionOne === "" || optionTwo === ""}>Submit</button>
            </form>
        </div>
    )
}
export default connect()(NewQuestion);