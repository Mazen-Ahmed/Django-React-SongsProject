import {combineReducers} from 'redux'
import authReducer from './authReducer'
import songReducer from './songReducer'
import PlayerReducer from './playerReducer'
import UserReducer from './userReducers'
const RootReducer=combineReducers({
        'auth':authReducer,
        'song':songReducer,
        'player':PlayerReducer,
        'user':UserReducer
})

export default RootReducer;