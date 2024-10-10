import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addUserAnswer, addUserQuestion } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const ADD_QUESTION      = "ADD_QUESTION"
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER"

export function receiveQuestions(questions) {
    return {
      type: RECEIVE_QUESTIONS,
      questions,
    };
  }

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }

}
export function handleAddQuestion(optionOne,optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    };
  
  
   // dispatch(showLoading());
    return saveQuestion(question)
      .then((question) => {
          dispatch(addQuestion(question));
          dispatch(addUserQuestion({
              qid: question.id,
              author: question.author,
          }));
      })
      //.then(() => dispatch(hideLoading()));;
  };
}
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