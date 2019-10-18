const post = {
    posts: [],
    isDone: false,
}

const postReducer = (state = post, action) => {
    switch (action.type) {
        case 'POST_POSTS':
            return Object.assign({}, state, {
                posts: action.payload
            });
        case 'POST_ISDONE':
            return Object.assign({}, state, {
                isDone: action.payload
            });
        default:
            return state;
    }
}

export default postReducer;