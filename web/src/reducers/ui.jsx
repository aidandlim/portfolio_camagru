const ui = {
    nav: 0,
    // main             0
    // sidebar          1
    // search           2
    // camera           3
    // notification     4
    // mypage           5
    // detail           6
}

const uiReducer = (state = ui, action) => {
    switch (action.type) {
        case 'UI_NAV':
            return Object.assign({}, state, {
                nav: action.payload
            });
        default:
            return state;
    }
}

export default uiReducer;