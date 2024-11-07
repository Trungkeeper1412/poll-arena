import {
  GET_USERS_STATUS,
  LOGIN_USER_STATUS,
  LOGOUT_USER,
} from "../actions/users";

import { SAVE_ANSWER_STATUS, SAVE_POLL_STATUS } from "../actions/polls";

const initialState = {
  authedUser: null,
  users: {},
  loading: false,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_STATUS:
      switch (action.status) {
        case "loading":
          return {
            ...state,
            loading: true,
            error: null,
          };
        case "success":
          return {
            ...state,
            loading: false,
            users: action.users,
            error: null,
          };
        case "failure":
          return {
            ...state,
            loading: false,
            error: action.error,
          };
        default:
          return state;
      }
    case LOGIN_USER_STATUS:
      switch (action.status) {
        case "loading":
          return {
            ...state,
            loading: true,
            error: null,
          };
        case "success":
          return {
            ...state,
            loading: false,
            authedUser: action.user,
            error: null,
          };
        case "failure":
          return {
            ...state,
            loading: false,
            error: action.error,
          };
        default:
          return state;
      }
    case LOGOUT_USER:
      return {
        ...state,
        authedUser: null,
      };
    // Update the user who created the new poll
    case SAVE_POLL_STATUS:
      switch (action.status) {
        case "loading":
          return {
            ...state,
            loading: true,
            error: null,
          };
        case "success":
          const updatedUsers = { ...state.users };
          updatedUsers[action.poll.author] = {
            ...updatedUsers[action.poll.author],
            questions: [
              ...updatedUsers[action.poll.author].questions,
              action.poll.id,
            ],
          };

          // Also update the authedUser state
          const updatedAuthedUser = {
            ...state.authedUser,
            questions: [...state.authedUser.questions, action.poll.id],
          };

          return {
            ...state,
            users: updatedUsers,
            authedUser: updatedAuthedUser,
            loading: false,
            error: null,
          };
        case "failure":
          return {
            ...state,
            loading: false,
            error: action.error,
          };
        default:
          return state;
      }
    // Update the user who voted at the dispatched poll
    case SAVE_ANSWER_STATUS:
      switch (action.status) {
        case "success":
          const updatedUsers = {
            ...state.users,
            [action.authedUser]: {
              ...state.users[action.authedUser],
              answers: {
                ...state.users[action.authedUser].answers,
                [action.qid]: action.answer,
              },
            },
          };

          const updatedAuthedUser = updatedUsers[action.authedUser];

          return {
            ...state,
            users: updatedUsers,
            authedUser: updatedAuthedUser,
          };
        case "failure":
          return {
            ...state,
            error: action.error,
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default usersReducer;
