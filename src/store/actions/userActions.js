import axios from 'axios'
import { getPlaylistsSuccess, getPlaylistsFailed } from './songActions'
export const GET_SINGLE_USER_START='getSingleUserStart'
export const GET_SINGLE_USER_SUCCESS='getSingleUserSuccess'
export const GET_SINGLE_USER_FAILED='getSingleUserFailed'
export const GET_USER_PLAYLISTS_START='getUserPlaylistsStart'
export const GET_USER_PLAYLISTS_SUCCESS='getUserPlaylistsSuccess'
export const GET_USER_PLAYLISTS_FAILED='getUserPlaylistsFailed'
export const GET_USER_UPLOADS_START='getUserUploadsStart'
export const GET_USER_UPLOADS_SUCCESS='getUserUploadsSuccess'
export const GET_USER_UPLOADS_FAILED='getUserUploadsFailed'
export const GET_USER_PROFILE_START='getUserProfileStart'
export const GET_USER_PROFILE_SUCCESS='getUserProfileSuccess'
export const GET_USER_PROFILE_FAILED='getUserProfileFailed'
export const UPDATE_USER_PROFILE_START='updateUserProfileStart'
export const UPDATE_USER_PROFILE_SUCCESS='updateUserProfileSuccess'
export const UPDATE_USER_PROFILE_FAILED='updateUserProfileFailed'
export const UPDATE_USER_IMAGE_START='updateUserImageStart'
export const UPDATE_USER_IMAGE_SUCCESS='updateUserImageSuccess'
export const UPDATE_USER_IMAGE_FAILED='updateUserImageFailed'
export const getSingleUserStart=()=>{
    return{
        type:GET_SINGLE_USER_START
    }
}
export const getSingleUserSuccess=(user)=>{
    return{
        type:GET_SINGLE_USER_SUCCESS,
        user
    }
}
export const getSingleUserFailed=(error)=>{
    return{
        type:GET_SINGLE_USER_FAILED,
        error
    }
}



export const getUserPlaylistsStart=()=>{
    return{
        type:GET_USER_PLAYLISTS_START
    }
}
export const getUserPlaylistsSuccess=(playlists)=>{
    return{
        type:GET_USER_PLAYLISTS_SUCCESS,
        playlists
    }
}
export const getUserPlaylistsFailed=(error)=>{
    return{
        type:GET_USER_PLAYLISTS_FAILED,
        error
    }
}





export const getUserProfileStart=()=>{
    return{
        type:GET_USER_PROFILE_START
    }
}
export const getUserProfileSuccess=(user)=>{
    return{
        type:GET_USER_PROFILE_SUCCESS,
        user
    }
}
export const getUserProfileFailed=(error)=>{
    return{
        type:GET_USER_PROFILE_FAILED,
        error
    }
}




export const updateUserProfileStart=()=>{
    return{
        type:UPDATE_USER_PROFILE_START
    }
}
export const updateUserProfileSuccess=(message)=>{
    return{
        type:UPDATE_USER_PROFILE_SUCCESS,
        message
    }
}
export const updateUserProfileFailed=(error)=>{
    return{
        type:UPDATE_USER_PROFILE_FAILED,
        error
    }
}


export const updateUserImageStart=()=>{
    return{
        type:UPDATE_USER_IMAGE_START
    }
}
export const updateUserImageSuccess=(message)=>{
    return{
        type:UPDATE_USER_IMAGE_SUCCESS,
        message
    }
}
export const updateUserImageFailed=(error)=>{
    return{
        type:UPDATE_USER_IMAGE_FAILED,
        error
    }
}



export const getUserUploadsStart=()=>{
    return{
        type:GET_USER_UPLOADS_START
    }
}
export const getUserUploadsSuccess=(uploads)=>{
    return{
        type:GET_USER_UPLOADS_SUCCESS,
        uploads
    }
}
export const getUserUploadsFailed=(error)=>{
    return{
        type:GET_USER_UPLOADS_FAILED,
        error
    }
}


export const getUser=(id)=>{
    return dispatch=>{
        dispatch(getSingleUserStart())
        axios.get(`http://127.0.0.1:8000/user/single/${id}/`,{headers:{accept: "application/json; charset=UTF-8"}})
        .then(res=>{
            dispatch(getSingleUserSuccess(res.data))
        }).catch(err=>{
            dispatch(getSingleUserFailed(err))
        })
    }
}

export const getUserPlaylists=(id)=>{
    return dispatch=>{
        dispatch(getUserPlaylistsStart())
        axios.get('http://127.0.0.1:8000/user/userplaylists/',{headers:{'id':id}})
        .then(res=>{
            dispatch(getUserPlaylistsSuccess(res.data))
        }).catch(err=>{
            dispatch(getUserPlaylistsFailed(err))
        })
    }
}



export const getUserUploads=(id)=>{
    return dispatch=>{
        dispatch(getUserUploadsStart())
        axios.get('http://127.0.0.1:8000/user/useruploads/')
        .then(res=>{

            dispatch(getUserUploadsSuccess(res.data))
        }).catch(err=>{
            dispatch(getUserUploadsFailed(err))
        })
    }
}





export const getUserProfile=(token)=>{
    return dispatch=>{
        dispatch(getUserProfileStart())
        axios.get('http://127.0.0.1:8000/user/profile/',{headers:{'Authorization':`Token ${token}`,accept:'application/json', 'Content-Type': 'application/json',}})
        .then(res=>{
            dispatch(getUserProfileSuccess(res.data[0]))

        }).catch(err=>{
            dispatch(getUserProfileFailed(err))
        })
    }
}




export const updateUserPassword=(password1,password2,oldPassword,token)=>{
    return dispatch=>{
        dispatch(updateUserProfileStart())
        axios.post('http://127.0.0.1:8000/users/password/change/',{'new_password1':password1,'new_password2':password2,'old_password':oldPassword},{headers:{'Authorization':`Token ${token}`}})
        .then(res=>{
            const message='updated successfully'
            dispatch(updateUserProfileSuccess(message))
        }).catch(err=>{ 
            dispatch(updateUserProfileFailed(err.response.data))
        })
    }
}





export const updateUserImage=(data)=>{
    return dispatch=>{
        dispatch(updateUserProfileStart())
        axios.post('http://127.0.0.1:8000/user/editprofile/',data)
        .then(res=>{
            const message='updated successfully'
            dispatch(updateUserProfileSuccess(message))
        }).catch(err=>{ 
            dispatch(updateUserProfileFailed(err.response.data))
        })
    }
}

