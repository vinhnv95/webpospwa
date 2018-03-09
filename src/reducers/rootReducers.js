import {combineReducers} from 'redux';
import firstPageReducer from './firstPageReducer';
import loginReducer from './Login/loginReducer';
import choosePosLocationReducer from './ChoosePosLocation/choosePosLocationReducer';
import MenuReducer from './Menu/MenuReducer';

const rootReducer = combineReducers({
    firstPageReducer,
    loginReducer,
    choosePosLocationReducer,
    MenuReducer
});

export default rootReducer;