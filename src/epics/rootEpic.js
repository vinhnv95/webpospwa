import { combineEpics } from 'redux-observable';
import { loginEpic } from './Login/loginEpic';
import choosePosLocationEpic from './ChoosePosLocation/choosePosLocationEpic'

const rootEpic = combineEpics(
    loginEpic,
    choosePosLocationEpic
);

export default rootEpic;