const search = {
    user: {},
    users: []
}

const searchReducer = (state = search, action) => {
    switch (action.type) {
        case 'SEARCH_USER':
            return Object.assign({}, state, {
                user: action.payload
            });
        case 'SEARCH_USERS':
            return Object.assign({}, state, {
                users: action.payload
            });
        default:
            return state;
    }
}

export default searchReducer;