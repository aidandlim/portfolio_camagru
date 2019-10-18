/****************************************************/

export const ui_nav = (value) => {
    return {
        type: 'UI_NAV',
        payload: value
    };
};

/***************************************************/

export const auth_token = (value) => {
    return {
        type: 'AUTH_TOKEN',
        payload: value
    };
};

export const auth_isregister = () => {
    return {
        type: 'AUTH_ISREGISTER'
    };
};

export const auth_isforgot = () => {
    return {
        type: 'AUTH_ISFORGOT'
    };
};

export const auth_isaccount = () => {
    return {
        type: 'AUTH_ISACCOUNT'
    };
};

/***************************************************/

export const user_user = (value) => {
    return {
        type: 'USER_USER',
        payload: value
    };
};

export const user_biotemp = (value) => {
    return {
        type: 'USER_BIOTEMP',
        payload: value
    };
};

/***************************************************/

export const camera_isload = (value) => {
    return {
        type: 'CAMERA_ISLOAD',
        payload: value
    };
};

export const camera_images = (value) => {
    return {
        type: 'CAMERA_IMAGES',
        payload: value
    };
};

export const camera_inputs = (value) => {
    return {
        type: 'CAMERA_INPUTS',
        payload: value
    };
};

export const camera_preview = (value) => {
    return {
        type: 'CAMERA_PREVIEW',
        payload: value
    };
};

export const camera_rotate = (value) => {
    return {
        type: 'CAMERA_ROTATE',
        payload: value
    };
};

export const camera_filter = (value) => {
    return {
        type: 'CAMERA_FILTER',
        payload: value
    };
};

export const camera_stickers = (value) => {
    return {
        type: 'CAMERA_STICKERS',
        payload: value
    };
};

/***************************************************/

export const content_post = (value) => {
    return {
        type: 'CONTENT_POST',
        payload: value
    };
};

export const content_islikes = (value) => {
    return {
        type: 'CONTENT_ISLIKES',
        payload: value
    };
};

/***************************************************/

export const post_posts = (value) => {
    return {
        type: 'POST_POSTS',
        payload: value
    };
};

export const post_isdone = (value) => {
    return {
        type: 'POST_ISDONE',
        payload: value
    };
};

/***************************************************/

export const notification_content = (value) => {
    return {
        type: 'NOTIFICATION_CONTENT',
        payload: value
    };
};

/***************************************************/

export const search_user = (value) => {
    return {
        type: 'SEARCH_USER',
        payload: value
    };
};

export const search_keyword = (value) => {
    return {
        type: 'SEARCH_KEYWORD',
        payload: value
    };
};

export const search_users = (value) => {
    return {
        type: 'SEARCH_USERS',
        payload: value
    };
};

export const search_posts = (value) => {
    return {
        type: 'SEARCH_POSTS',
        payload: value
    };
};

export const search_type = (value) => {
    return {
        type: 'SEARCH_TYPE',
        payload: value
    };
};

/***************************************************/