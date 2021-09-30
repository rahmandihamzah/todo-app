import axios from "axios";

const GET_INITIAL_DATA = "GET_INITIAL_DATA";
const UPDATE_DATA = "UPDATE_DATA";

export const authInitialState = {
  initialData: {},
  data: {},
};

export default function reducers(state = authInitialState, actions) {
  const { payload, type } = actions;
  switch (type) {
    case GET_INITIAL_DATA:
      return {
        ...state,
        initialData: payload,
        data: payload,
      };
    case UPDATE_DATA:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
}

export const getInitialData = () => {
  return async (dispatch) => {
    try {
      const initialData = await axios.get(
        `https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list`
      );

      dispatch({
        type: GET_INITIAL_DATA,
        payload: initialData.data,
      });
    } catch (error) {
      console.log("error >>> ", error);
    }
  };
};

export const updateData = (updatedData) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_DATA,
      payload: updatedData,
    });
  };
};
