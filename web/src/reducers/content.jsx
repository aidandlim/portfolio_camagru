const content = {
    id: -1,
    picture: '',
    content: '',
    location: '',
    together: '',
    
    post_time: '',
    num_likes: 0,
    num_comments: 0,
    user_nickname: '',
    user_islike: false,

    post_likes: [],
    post_comments: [],

    isLikes: true,
}

const contentReducer = (state = content, action) => {
    switch (action.type) {
        case 'CONTENT_ID':
            return Object.assign({}, state, {
                id: action.payload
            });
        case 'CONTENT_PICTURE':
            return Object.assign({}, state, {
                picture: action.payload
            });
        case 'CONTENT_CONTENT':
            return Object.assign({}, state, {
                content: action.payload
            });
        case 'CONTENT_LOCATION':
            return Object.assign({}, state, {
                location: action.payload
            });
        case 'CONTENT_TOGETHER':
            return Object.assign({}, state, {
                together: action.payload
            });
        case 'CONTENT_POST_TIME':
            return Object.assign({}, state, {
                post_time: action.payload
            });
        case 'CONTENT_NUM_LIKES':
            return Object.assign({}, state, {
                num_likes: action.payload
            });
        case 'CONTENT_NUM_COMMENTS':
            return Object.assign({}, state, {
                num_comments: action.payload
            });
        case 'CONTENT_USER_NICKNAME':
            return Object.assign({}, state, {
                user_nickname: action.payload
            });
        case 'CONTENT_USER_ISLIKE':
            return Object.assign({}, state, {
                user_islike: action.payload
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