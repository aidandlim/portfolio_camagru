const notification = {
    content: []
}

const notificationReducer = (state = notification, action) => {
    switch (action.type) {
        case 'NOTIFICATION_CONTENT':
            return Object.assign({}, state, {
                content: action.payload
            });
        default:
            return state;
    }
}

export default notificationReducer;