export const ui_nav = (value) => {
    return {
        type: 'UI_NAV',
        payload: value
    };
};

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