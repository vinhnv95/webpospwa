import * as loginPageActionTypes from '../../constants/loginPageActionTypes';
import { login } from '../../api/Staff/StaffApi';
import { loginSuccess, loginFail } from '../../actions/Login/LoginPageActions';

export const loginEpic = action$ => 
    action$.ofType(loginPageActionTypes.SUBMIT_LOGIN)
        .mergeMap(action => 
            login(action.staff)
                .then(response => loginSuccess(response))
                .catch(error => loginFail(error))
        );

