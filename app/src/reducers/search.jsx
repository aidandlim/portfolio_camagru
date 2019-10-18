const search = {
    user: {},
    keyword: '',
    users: [],
    posts: [],
    type: 0,
}

const searchReducer = (state = search, action) => {
    switch (action.type) {
        case 'SEARCH_USER':
            return Object.assign({}, state, {
                user: action.payload
            });
        case 'SEARCH_KEYWORD':
            return Object.assign({}, state, {
                keyword: action.payload
            });
        case 'SEARCH_USERS':
            return Object.assign({}, state, {
                users: action.payload
            });
        case 'SEARCH_POSTS':
            return Object.assign({}, state, {
                posts: action.payload
            });
        case 'SEARCH_TYPE':
            return Object.assign({}, state, {
                type: action.payload
            });
        default:
            return state;
    }
}

export default searchReducer;