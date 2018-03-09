import * as choosePosLocationActionTypes from '../../constants/choosePosLocationActionTypes';
import * as ChoosePosLocationActions from '../../actions/ChoosePosLocation/ChoosePosLocationActions';
import * as CoreConfig from '../../model/CoreConfig/CoreConfig';
import { combineEpics } from 'redux-observable';
import * as PosApi from '../../api/Pos/PosApi';

const getEnableSessionConfigEpic = action$ => 
    action$.ofType(choosePosLocationActionTypes.GET_ENABLE_SESSION_CONFIG)
        .switchMap(() => 
            CoreConfig.getEnableSessionConfig()
                .then(result => ChoosePosLocationActions.getEnableSessionConfigSuccess(result.value))
        );

const getCurrentPosIdEpic = action$ => 
    action$.ofType(choosePosLocationActionTypes.GET_CURRENT_POS_ID)
        .switchMap(() => 
            CoreConfig.getCurrentPosId()
                .then(result => ChoosePosLocationActions.getCurrentPosIdSuccess(result.value))
        );

const getStaffIdEpic = action$ => 
    action$.ofType(choosePosLocationActionTypes.GET_STAFF_ID)
        .switchMap(() => 
            CoreConfig.getStaffId()
                .then(result => ChoosePosLocationActions.getStaffIdSuccess(result.value))
        );

const getLocationListEpic = action$ => 
    action$.ofType(choosePosLocationActionTypes.GET_LOCATION_LIST)
        .switchMap(() => 
            CoreConfig.getLocationList()
                .then(result => ChoosePosLocationActions.getLocationListSuccess(result.value))
        );

const getPosListEpic = action$ => 
    action$.ofType(choosePosLocationActionTypes.GET_POS_LIST)
        .switchMap(action => 
            PosApi.getPosList(action.locationId)
                .then(response => ChoosePosLocationActions.getPosListSuccess(response.data))
    );

const selectLocationEpic = action$ =>
    action$.ofType(choosePosLocationActionTypes.SELECT_LOCATION)
        .map(action => ChoosePosLocationActions.getPosList(action.locationId));

const enterToPos = (action$, store) =>
    action$.ofType(choosePosLocationActionTypes.ENTER_TO_POS)
        .switchMap(() => {
            let state = store.getState().choosePosLocationReducer;
            return PosApi.posAssign(state.locationId, state.posId)
                .then(() => ChoosePosLocationActions.enterToPosSuccess())
                .catch(error => ChoosePosLocationActions.enterToPosFail(error))
        });



const choosePosLocationEpic = combineEpics(
    getEnableSessionConfigEpic,
    getCurrentPosIdEpic,
    getStaffIdEpic,
    getLocationListEpic,
    getPosListEpic,
    selectLocationEpic,
    enterToPos
);
export default choosePosLocationEpic;
    
    