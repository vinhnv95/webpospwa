import * as MenuActions from '../../actions/Menu/MenuActions';
import * as menuActionTypes from '../../constants/menuActionTypes';
import * as CoreConfig from '../../model/CoreConfig/CoreConfig';
import { combineEpics } from 'redux-observable';
import * as StaffApi from '../../api/Staff/StaffApi';

function getStaffNameEpic(action$) {
    return action$.ofType(menuActionTypes.GET_STAFF_NAME)
        .switchMap(() => 
            CoreConfig.getStaffName()
                .then(result => MenuActions.getStaffNameSuccess(result.value))
        );
}

function getLocationNameEpic(action$) {
    return action$.ofType(menuActionTypes.GET_LOCATION_NAME)
        .switchMap(() => 
            CoreConfig.getLocationName()
                .then(result => MenuActions.getLocationNameSuccess(result.value))
        );
}

function logoutEpic(action$) {
    return action$.ofType(menuActionTypes.LOGOUT)
        .switchMap(() => 
            StaffApi.logout()
                .then(() => MenuActions.logoutSuccess())
                .catch(error => MenuActions.logoutFail(error))
        );
}

const MenuEpic = combineEpics(
    getStaffNameEpic,
    getLocationNameEpic,
    logoutEpic
);

export default MenuEpic;