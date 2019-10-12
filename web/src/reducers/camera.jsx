const camera = {
    isLoad: true,
    images: [],
    inputs: [],
    preview: '',
    rotate: 0,
    filter: 0,
    stickers: [],
}

const cameraReducer = (state = camera, action) => {
    switch (action.type) {
        case 'CAMERA_ISLOAD':
            return Object.assign({}, state, {
                isLoad: action.payload
            });
        case 'CAMERA_IMAGES':
            return Object.assign({}, state, {
                images: action.payload
            });
        case 'CAMERA_INPUTS':
            return Object.assign({}, state, {
                inputs: action.payload
            });
        case 'CAMERA_PREVIEW':
            return Object.assign({}, state, {
                preview: action.payload
            });
        case 'CAMERA_ROTATE':
            return Object.assign({}, state, {
                rotate: action.payload
            });
        case 'CAMERA_FILTER':
            return Object.assign({}, state, {
                filter: action.payload
            });
        case 'CAMERA_STICKERS':
            return Object.assign({}, state, {
                stickers: action.payload
            });
        default:
            return state;
    }
}

export default cameraReducer;