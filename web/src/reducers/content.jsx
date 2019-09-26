const content = {
    id: -1,
}

const contentReducer = (state = content, action) => {
    switch (action.type) {
        case 'CONTENT_ID':
            return Object.assign({}, state, {
                id: action.payload
            });
        default:
            return state;
    }
}

export default contentReducer;