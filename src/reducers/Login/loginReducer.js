import cookie from 'react-cookies';
import { LOGIN_SUCCESS, SUBMIT_LOGIN, LOGIN_FAIL } from '../../constants/loginPageActionTypes';

const initialState = {
    sessionID: cookie.load('sessionID'),
    loading: false
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_LOGIN:
            return Object.assign({}, state, {
                loading: true
              });
        case LOGIN_SUCCESS:
            let expires = new Date();
            expires.setDate(expires.getDate() + 1);
            cookie.remove('isInstalled');
            cookie.save('sessionID', action.response.data, {path: '/'});
            return Object.assign({}, state, {
                sessionID: action.response.data,
                loading: false
              });
        case LOGIN_FAIL:
              console.log(action.error);
              alert('Your login information is wrong!');
              return Object.assign({}, state, {
                  loading: false
                });
        default:
            return state;
    }
}