
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "../constants/auth";

const initialState = {
  userToken: null,
  user: null
};

const authReducer = (state = initialState, action: {
  type: string,
  payload: any
}) => {
  switch (action.type) {
    // Login actions start...
    case LOGIN_SUCCESS: {
      return {
        ...state,
        userToken: action.payload?.token,
        user: action?.payload?.user
      };
    }
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export { authReducer };
