import { 
    GET_ENABLE_SESSION_CONFIG, 
    GET_ENABLE_SESSION_CONFIG_SUCCESS, 
    GET_CURRENT_POS_ID,
    GET_CURRENT_POS_ID_SUCCESS,
    GET_STAFF_ID,
    GET_STAFF_ID_SUCCESS,
    GET_LOCATION_LIST,
    GET_LOCATION_LIST_SUCCESS,
    GET_POS_LIST,
    GET_POS_LIST_SUCCESS,
    SELECT_LOCATION,
    SELECT_POS,
    ENTER_TO_POS,
    ENTER_TO_POS_SUCCESS,
    ENTER_TO_POS_FAIL
} from '../../constants/choosePosLocationActionTypes';
// import * as SynchronizationHelper from '../../helpers/SynchronizationHelper';

const initialState = {
    enableSession: '',
    staffId: '',
    locationList: [],
    posList: [],
    locationId: '',
    posId: '',
    currentPosId: null,
    loading: false
};

export default function choosePosLocationReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ENABLE_SESSION_CONFIG:
            return Object.assign({}, state, {
                loading: true
            });
        case GET_ENABLE_SESSION_CONFIG_SUCCESS:
            return Object.assign({}, state, {
                enableSession: action.value,
                loading: false
            });

        case GET_CURRENT_POS_ID:
            return Object.assign({}, state, {
                loading: true
            });
        case GET_CURRENT_POS_ID_SUCCESS:
            return Object.assign({}, state, {
                currentPosId: action.value,
                loading: false
            });

        case GET_STAFF_ID:
            return Object.assign({}, state, {
                loading: true
            });
        case GET_STAFF_ID_SUCCESS:
            return Object.assign({}, state, {
                staffId: action.value,
                loading: false
            });

        case GET_LOCATION_LIST:
            return Object.assign({}, state, {
                loading: true
            });
        case GET_LOCATION_LIST_SUCCESS:
            return Object.assign({}, state, {
                locationList: action.value,
                loading: false
            });

        case GET_POS_LIST:
            return Object.assign({}, state, {
                loading: true
            });
        case GET_POS_LIST_SUCCESS:
            return Object.assign({}, state, {
                posList: action.payload.items,
                loading: false
            });

        case SELECT_LOCATION:
            return Object.assign({}, state, {
                locationId: action.locationId
            });
        
        case SELECT_POS:
            return Object.assign({}, state, {
                posId: action.posId
            });

        case ENTER_TO_POS:
            return Object.assign({}, state, {
                loading: true
            });
        case ENTER_TO_POS_SUCCESS:
            // SynchronizationHelper.loadConfiguration();
            return Object.assign({}, state, {
                currentPosId: state.posId,
                loading: false
            });
        case ENTER_TO_POS_FAIL:
            alert('Assign POS Failed');
            return Object.assign({}, state, {
                loading: false
            });
            
        default:
            return state;
    }
}