import { combineReducers } from 'redux';

import uiReducer from './ui';
import authReducer from './auth';

const rootReducers = combineReducers({
    ui: uiReducer,
    auth: authReducer
})

export default rootReducers;
