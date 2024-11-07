import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../_DATA";

export const GET_POLLS_STATUS = "GET_POLLS_STATUS";
export const SAVE_POLL_STATUS = "SAVE_POLL_STATUS";
export const SAVE_ANSWER_STATUS = "SAVE_ANSWER_STATUS";

export const getPollsStatus = (status, polls = null, error = null) => ({
  type: GET_POLLS_STATUS,
  status,
  polls,
  error,
});

export const savePollStatus = (status, poll = null, error = null) => ({
  type: SAVE_POLL_STATUS,
  status,
  poll,
  error,
});

export const saveAnswerStatus = (
  status,
  authedUser,
  qid,
  answer,
  error = null
) => ({
  type: SAVE_ANSWER_STATUS,
  status,
  authedUser,
  qid,
  answer,
  error,
});

export const getPolls = () => {
  return (dispatch) => {
    dispatch(getPollsStatus("loading"));
    return _getQuestions()
      .then((questions) => {
        dispatch(getPollsStatus("success", questions, null));
      })
      .catch((error) => {
        dispatch(getPollsStatus("failure", null, error));
      });
  };
};

export const savePoll = (poll) => {
  return async (dispatch) => {
    dispatch(savePollStatus("loading"));
    try {
      const savedPoll = await _saveQuestion(poll);
      dispatch(savePollStatus("success", savedPoll, null));
    } catch (error) {
      dispatch(savePollStatus("failure", null, error));
    }
  };
};

export const savePollAnswer = ({ authedUser, qid, answer }) => {
  return async (dispatch) => {
    dispatch(saveAnswerStatus("loading"));
    try {
      await _saveQuestionAnswer({ authedUser, qid, answer });
      dispatch(saveAnswerStatus("success", authedUser, qid, answer, null));
    } catch (error) {
      dispatch(saveAnswerStatus("failure", null, null, null, error));
    }
  };
};
