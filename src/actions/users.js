

export const RECEIVE_USERS     = "RECEIVE_USERS";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION"
export const ADD_USER_ANSWER   = "ADD_USER_ANSWER"

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
export function addUserQuestion({ qid , author }) {
  return {
    type: ADD_USER_QUESTION,
    qid,
    author,

  }
}
export function addUserAnswer( authedUser, qid, answer ) {
  return {
      type: ADD_USER_ANSWER,
      authedUser,
      qid,
      answer,
  };
}