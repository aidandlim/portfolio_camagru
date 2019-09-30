const ui = {
    nav: 0,
    // main             0
    // sidebar          1
    // search           2
    // camera           3
    // notification     4
    isLoad: false,
}

const uiReducer = (state = ui, action) => {
    switch (action.type) {
        case 'UI_NAV':
            return Object.assign({}, state, {
                nav: action.payload
            });
        case 'UI_ISLOAD':
            return Object.assign({}, state, {
                isLoad: !state.isLoad
            });
        default:
            return state;
    }
}

export default uiReducer;