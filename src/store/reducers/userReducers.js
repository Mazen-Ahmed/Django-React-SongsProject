import * as userActions from "../actions/userActions";

const updateObject=(state,newState)=>{
    return{
        ...state,
        ...newState
    }
}


const initialState = {
  user:{},
  success:null,
  loading:false,
  error:null,
  playlists:[],
  uploads:[],
  profile:{},


};

export const getsingleUserStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        error:null
    })
}

export const getsingleUserSuccess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:null,
        user:action.user
    })
}


export const getsingleUserFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:null,
        error:action.error
    })
}


export const getUserPlaylistsStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        error:null
    })
}

export const getUserPlaylistsSuccess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:null,
        playlists:action.playlists,
    })
}


export const getUserPlaylistsFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:null,
        error:action.error
    })
}





export const getUserProfileStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        error:null,
        success:null
    })
}

export const getUserProfileSuccess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:null,
        profile:action.user,
        success:null

    })
}


export const getUserProfileFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:null,
        error:action.error,
        success:null

    })
}




export const updateUserProfileStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        error:null
    })
}

export const updateUserProfileSuccess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:null,
        success:action.message,
    })
}


export const updateUserProfileFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:null,
        error:action.error
    })
}







export const getUserUploadsStart=(state,action)=>{
    return updateObject(state,{
        loading:true,
        error:null
    })
}

export const getUserUploadsSuccess=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:null,
        uploads:action.uploads,
    })
}


export const getUserUploadsFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:null,
        error:action.error
    })
}



const UserReducer=(state=initialState,action)=>{
    switch (action.type) {
        case userActions.GET_SINGLE_USER_START: return getsingleUserStart(state,action);
        case userActions.GET_SINGLE_USER_SUCCESS: return getsingleUserSuccess(state,action);
        case userActions.GET_SINGLE_USER_FAILED: return getsingleUserFailed(state,action);
        case userActions.GET_USER_PLAYLISTS_START: return getUserPlaylistsStart(state,action);
        case userActions.GET_USER_PLAYLISTS_SUCCESS: return getUserPlaylistsSuccess(state,action);
        case userActions.GET_USER_PLAYLISTS_FAILED: return getUserPlaylistsFailed(state,action);
        case userActions.GET_USER_PROFILE_START: return getUserProfileStart(state,action);
        case userActions.GET_USER_PROFILE_SUCCESS: return getUserProfileSuccess(state,action);
        case userActions.GET_USER_PROFILE_FAILED: return getUserProfileFailed(state,action);
        case userActions.UPDATE_USER_PROFILE_START: return updateUserProfileStart(state,action);
        case userActions.UPDATE_USER_PROFILE_SUCCESS: return updateUserProfileSuccess(state,action);
        case userActions.UPDATE_USER_PROFILE_FAILED: return updateUserProfileFailed(state,action);
        case userActions.GET_USER_UPLOADS_START: return getUserUploadsStart(state,action);
        case userActions.GET_USER_UPLOADS_SUCCESS: return getUserUploadsSuccess(state,action);
        case userActions.GET_USER_UPLOADS_FAILED: return getUserUploadsFailed(state,action);
        default:
            return state;
    }
}

export default UserReducer;