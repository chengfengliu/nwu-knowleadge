import * as types from './actionType.js'
export function login(userNickName) {
  return {
    type: types.LOGIN,
    userNickName
  }
}
export function logout() {
  return {
    type: types.LOGOUT
  }
}