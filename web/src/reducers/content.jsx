const content = {
    post: {},
    post_likes: [],
    post_comments: [],

    isLikes: true,
}

const contentReducer = (state = content, action) => {
    switch (action.type) {
        case 'CONTENT_POST':
            return Object.assign({}, state, {
                post: action.payload
            });
        case 'CONTENT_POST_LIKES':
            return Object.assign({}, state, {
                post_likes: action.payload
            });
        case 'CONTENT_POST_COMMENTS':
            return Object.assign({}, state, {
                post_comments: action.payload
            });
        case 'CONTENT_ISLIKES':
            return Object.assign({}, state, {
                isLikes: action.payload
            });
        default:
            return state;
    }
}

export default contentReducer;