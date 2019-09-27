const content = {
    id: -1,
    isLikes: true,
}

const contentReducer = (state = content, action) => {
    switch (action.type) {
        case 'CONTENT_ID':
            return Object.assign({}, state, {
                id: action.payload
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