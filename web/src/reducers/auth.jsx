const auth = {
    id: '',
    email: '',
    nickname: '',
    isRegister: true,
    isForgot: false,
    isAccount: false,
}

const authReducer = (state = auth, action) => {
    switch (action.type) {
        case 'AUTH_ID':
            return Object.assign({}, state, {
                id: action.payload
            });
        case 'AUTH_EMAIL':
            return Object.assign({}, state, {
                email: action.payload
            });
        case 'AUTH_NICKNAME':
            return Object.assign({}, state, {
                nickname: action.payload
            });
        case 'AUTH_ISREGISTER':
            return Object.assign({}, state, {
                isRegister: !state.isRegister
            });
        case 'AUTH_ISFORGOT':
            return Object.assign({}, state, {
                isForgot: !state.isForgot
            });
        case 'AUTH_ISACCOUNT':
            return Object.assign({}, state, {
                isAccount: !state.isAccount
            });
        default:
            return state;
    }
}

export default authReducer;