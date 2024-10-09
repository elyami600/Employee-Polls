import { saveQuestion , saveQuestionAnswer } from "../utils/api";
import {addUserAnswer,addUserQuestion } from "./users";


export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const ADD_QUESTION      = "ADD_QUESTION"
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER"


export function receiveQuestions(questions) {
    return {
      type: RECEIVE_QUESTIONS,
      questions,
    };
  }
// add question
export function addQuestion({ id, authedUser, answer }) {
  return {
    type: ADD_QUESTION,
    id,
    authedUser,
    answer
  }

}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const question = { optionOne, optionTwo, authedUser }
    dispatch(addQuestion(question));
  
    return saveQuestion(question).catch((e) => {
      console.warn("Error in handleAddQuestion" ,e);
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(question))
      alert('There was an error saving the guestion. Try againg')
    })

  }

}
// -------------------save the answe fun -------------------------//
export function addQuestionAnswer(authedUser, qid, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid, 
      answer
  }
}


export function handleAddQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    // dispatch(showLoading());
    
    return saveQuestionAnswer({ authedUser, qid, answer })
    .then(() => {
      dispatch(addQuestionAnswer(authedUser, qid, answer))
      dispatch(addUserAnswer(authedUser, qid, answer))
    })
      //.then(() => dispatch(hideLoading()));
  }

}