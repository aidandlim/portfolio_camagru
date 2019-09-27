const auth = {
    token: '',
    isRegister: false,
    isForgot: false,
    isAccount: false,
}

const authReducer = (state = auth, action) => {
    switch (action.type) {
        case 'AUTH_TOKEN':
            return Object.assign({}, state, {
                token: action.payload
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