const post = {
    posts: []
}

const postReducer = (state = post, action) => {
    switch (action.type) {
        case 'POST_POSTS':
            return Object.assign({}, state, {
                posts: action.payload
            });
        default:
            return state;
    }
}

export default postReducer;