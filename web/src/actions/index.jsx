/****************************************************/

export const ui_nav = (value) => {
    return {
        type: 'UI_NAV',
        payload: value
    };
};

/***************************************************/

export const auth_id = (value) => {
    return {
        type: 'AUTH_ID',
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

export const account_isprivate = () => {
    return {
        type: 'ACCOUNT_ISPRIVATE'
    };
};

export const account_isnotificate = () => {
    return {
        type: 'ACCOUNT_ISNOTIFICATE'
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

export const camera_preview = (value) => {
    return {
        type: 'CAMERA_PREVIEW',
        payload: value
    };
};

export const camera_filter = (value) => {
    return {
        type: 'CAMERA_FILTER',
        payload: value
    };
};

/***************************************************/

export const content_id = (value) => {
    return {
        type: 'CONTENT_ID',
        payload: value
    };
};

export const content_islikes = (value) => {
    return {
        type: 'CONTENT_ISLIKES',
        payload: value
    };
};