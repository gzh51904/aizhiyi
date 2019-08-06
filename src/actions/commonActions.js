export const LOGIN_APP = 'LOGIN_APP'

export function loginAction(token){
    return {
        type:LOGIN_APP,
        payload:token
    }
}

export default {
    loginAction
}