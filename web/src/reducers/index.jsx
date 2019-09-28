import { combineReducers } from 'redux';

import uiReducer from './ui';
import authReducer from './auth';
import userReducer from './user';
import cameraReducer from './camera';
import contentReducer from './content';


const rootReducers = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    user: userReducer,
    camera: cameraReducer,
    content: contentReducer,
})

export default rootReducers;
