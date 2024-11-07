import {
  GET_POLLS_STATUS,
  SAVE_POLL_STATUS,
  SAVE_ANSWER_STATUS,
} from "../actions/polls";

const initialState = {
  polls: {},
  loading: false,
  saveLoading: false,
  error: null,
};

const pollsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POLLS_STATUS:
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
            polls: action.polls,
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

    case SAVE_POLL_STATUS:
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
            polls: {
              ...state.polls,
              [action.poll.id]: action.poll,
            },
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

    case SAVE_ANSWER_STATUS:
      switch (action.status) {
        case "loading":
          return {
            ...state,
            saveLoading: true,
            error: null,
          };
        case "success":
          return {
            ...state,
            loading: false,
            saveLoading: false,
            polls: {
              ...state.polls,
              [action.qid]: {
                ...state.polls[action.qid],
                [action.answer]: {
                  ...state.polls[action.qid][action.answer],
                  votes: [
                    ...state.polls[action.qid][action.answer].votes,
                    action.authedUser,
                  ],
                },
              },
            },
            error: null,
          };
        case "failure":
          return {
            ...state,
            loading: false,
            saveLoading: false,
            error: action.error,
          };
        default:
          return state;
      }

    default:
      return state;
  }
};

export default pollsReducer;
