const content = {
    post: {},
    isLikes: true,
}

const contentReducer = (state = content, action) => {
    switch (action.type) {
        case 'CONTENT_POST':
            return Object.assign({}, state, {
                post: action.payload
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