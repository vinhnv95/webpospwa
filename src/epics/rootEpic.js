import { combineEpics } from 'redux-observable';
import { loginEpic } from './Login/loginEpic';

const rootEpic = combineEpics(
    loginEpic
);

export default rootEpic;