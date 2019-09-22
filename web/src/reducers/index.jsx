import { combineReducers } from 'redux';

import uiReducer from './ui';
import authReducer from './auth';
import accountReducer from './account';

const rootReducers = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    account: accountReducer
})

export default rootReducers;
