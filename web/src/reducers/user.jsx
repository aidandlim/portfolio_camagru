const user = {
    user: {},
    bioTemp: '',
}

const userReducer = (state = user, action) => {
    switch (action.type) {
        case 'USER_USER':
            return Object.assign({}, state, {
                user: action.payload
            });
        case 'USER_BIOTEMP':
            return Object.assign({}, state, {
                bioTemp: action.payload
            });
        default:
            return state;
    }
}

export default userReducer;