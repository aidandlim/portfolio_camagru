import { combineReducers } from 'redux';

import uiReducer from './ui';
import authReducer from './auth';
import userReducer from './user';
import postReducer from './post';
import contentReducer from './content';
import searchReducer from './search';
import cameraReducer from './camera';
import notificationReducer from './notification';


const rootReducers = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    content: contentReducer,
    search: searchReducer,
    camera: cameraReducer,
    notification: notificationReducer,
})

export default rootReducers;
