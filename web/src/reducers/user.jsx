const user = {
    id: -1,
    email: '',
    nickname: '',
    bio: '',
    bioTemp: '',
    isPrivate: false,
    isNotificate: false,
    picture: null,
}

const userReducer = (state = user, action) => {
    switch (action.type) {
        case 'USER_ID':
            return Object.assign({}, state, {
                id: action.payload
            });
        case 'USER_EMAIL':
            return Object.assign({}, state, {
                email: action.payload
            });
        case 'USER_NICKNAME':
            return Object.assign({}, state, {
                nickname: action.payload
            });
        case 'USER_BIO':
            return Object.assign({}, state, {
                bio: action.payload
            });
        case 'USER_BIOTEMP':
            return Object.assign({}, state, {
                bioTemp: action.payload
            });
        case 'USER_ISPRIVATE':
            return Object.assign({}, state, {
                isPrivate: action.payload
            });
        case 'USER_ISNOTIFICATE':
            return Object.assign({}, state, {
                isNotificate: action.payload
            });
        case 'USER_PICTURE':
            return Object.assign({}, state, {
                picture: action.payload
            });
        default:
            return state;
    }
}

export default userReducer;