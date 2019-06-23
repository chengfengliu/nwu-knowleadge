import * as types from './actionType.js'

const initialState = {
  userNickName: '',
  hasLoggedIn: false
}

const reducer = function(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN:
      return Object.assign({}, state, {userNickName: action.userNickName, hasLoggedIn: true})
    case types.LOGOUT:
      return Object.assign({}, state, {userNickName: '', hasLoggedIn: false})
    default:
      return state
  }
}

export default reducer