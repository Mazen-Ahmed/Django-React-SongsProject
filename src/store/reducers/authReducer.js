import * as authActions from "../actions/authActions";

const updateObject=(state,newState)=>{
    return{
        ...state,
        ...newState
    }
}


const initialState = {
  token: null,
  error: null,
  signupErrors:null,
  loading: false,
  
};



const signupFailed = (state, action) => {
  return updateObject(state, {
    signupErrors: action.error,
    loading: false
  });
};


const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
   
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTH_START:return authStart(state, action);
    case authActions.AUTH_SUCCESS:return authSuccess(state, action);
    case authActions.AUTH_FAIL:return authFail(state, action);
    case authActions.AUTH_LOGOUT:return authLogout(state, action);
    case authActions.SIGNUP_FAILED:return signupFailed(state, action);

    default:
      return state;
  }
};

export default authReducer;