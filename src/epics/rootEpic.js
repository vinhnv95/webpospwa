import { combineEpics } from 'redux-observable';
import { loginEpic } from './Login/loginEpic';
import choosePosLocationEpic from './ChoosePosLocation/choosePosLocationEpic'
import MenuEpic from './Menu/MenuEpic';

const rootEpic = combineEpics(
    loginEpic,
    choosePosLocationEpic,
    MenuEpic
);

export default rootEpic;