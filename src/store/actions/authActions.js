
import axios from 'axios'
export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SIGNUP_FAILED='SignupFailed' 



export const SignupFailed = (error) => {
  return {
    type: SIGNUP_FAILED,
    error:error
  };
};



export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (token,email,avatar) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
   avatar,
   email
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
 

  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};


export const authGoogleLogin=(accessToken)=>{
  return dispatch => {
    dispatch(authStart());
    axios
    
    .post("http://127.0.0.1:8000/user/googleLogin/", {
      access_token: accessToken,
    }).then(res=>{
      const token=res.data.key
      const userType = res.data.user_type;
      const username= res.data.username
      const email= res.data.email
      const avatar=res.data.avatar
      localStorage.setItem("token", token);
      localStorage.setItem("user_type", userType);
      localStorage.setItem("email", email);
      localStorage.setItem("username", username);
      localStorage.setItem("avatar", avatar);
      dispatch(authSuccess(token,email,avatar));

    }).catch(err => {
      dispatch(authFail(err.response.data));
    })
  }
}
export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/users/login/", {
        email: email,
        password: password
      },{headers:{accept:'application/json'}})
      .then(res => {
        const token = res.data.key;
        const userType = res.data.user_type;
        const username= res.data.username
        const email= res.data.email
        const avatar=res.data.avatar
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("user_type", userType);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token,email,avatar));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err.response.data));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/users/registeration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      },{headers:{accept:'application/json'}})
      .then(res => {
        const email= res.data.email
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        const username= res.data.username
        const avatar=res.data.avatar
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token,email,avatar));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err.response.data));
      });
  };
};

export const authCheck = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const email= localStorage.getItem('email')
    const avatar=localStorage.getItem('avatar')
    dispatch(authSuccess(token,email,avatar));
  };
};