const account = {
    isPrivate: false,
    isNotificate: false,
}

const accountReducer = (state = account, action) => {
    switch (action.type) {
        case 'ACCOUNT_ISPRIVATE':
            return Object.assign({}, state, {
                isPrivate: !state.isPrivate
            });
        case 'ACCOUNT_ISNOTIFICATE':
            return Object.assign({}, state, {
                isNotificate: !state.isNotificate
            });
        default:
            return state;
    }
}

export default accountReducer;