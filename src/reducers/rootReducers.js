import {combineReducers} from 'redux';
import firstPageReducer from './firstPageReducer';
import loginReducer from './Login/loginReducer';

const rootReducer = combineReducers({
    firstPageReducer,
    loginReducer
});

export default rootReducer;