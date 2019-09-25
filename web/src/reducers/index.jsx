import { combineReducers } from 'redux';

import uiReducer from './ui';
import authReducer from './auth';
import accountReducer from './account';
import cameraReducer from './camera';

const rootReducers = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    account: accountReducer,
    camera: cameraReducer,
})

export default rootReducers;
