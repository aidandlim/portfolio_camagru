import { combineReducers } from 'redux';

import uiReducer from './ui';
import authReducer from './auth';
import accountReducer from './account';
import cameraReducer from './camera';
import contentReducer from './content';
import userReducer from './user';

const rootReducers = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    account: accountReducer,
    camera: cameraReducer,
    content: contentReducer,
    user: userReducer,
})

export default rootReducers;
