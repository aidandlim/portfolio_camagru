const camera = {
    images: [],
    preview: '',
    isLoad: true,
}

const cameraReducer = (state = camera, action) => {
    switch (action.type) {
        case 'CAMERA_IMAGES':
            return Object.assign({}, state, {
                images: action.payload
            });
        case 'CAMERA_PREVIEW':
            return Object.assign({}, state, {
                preview: action.payload
            });
        case 'CAMERA_ISLOAD':
            return Object.assign({}, state, {
                isLoad: action.payload
            });
        default:
            return state;
    }
}

export default cameraReducer;