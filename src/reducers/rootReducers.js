import {combineReducers} from 'redux';
import firstPageReducer from './firstPageReducer';
import loginReducer from './Login/loginReducer';
import choosePosLocationReducer from './ChoosePosLocation/choosePosLocationReducer';

const rootReducer = combineReducers({
    firstPageReducer,
    loginReducer,
    choosePosLocationReducer
});

export default rootReducer;