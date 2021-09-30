import { combineReducers } from "redux";

import todoReducers from "./auth/todoRdx";

// initial state
export { authInitialState } from "./auth/todoRdx";

// action
export { getInitialData, updateData } from "./auth/todoRdx";

const rootReducer = combineReducers({
  todoReducers,
});

export default rootReducer;
