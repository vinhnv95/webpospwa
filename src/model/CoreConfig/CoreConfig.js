import db from "../db";

export function getEnableSessionConfig() {
    return db.core_config_data.get('webpos/general/enable_session');
}

export function getCurrentPosId() {
    return db.core_config_data.get('posId');
}

export function getStaffId() {
    return db.core_config_data.get('staffId');
}

export function getLocationList() {
    return db.core_config_data.get('allLocationIds');
}

export function getStaffName() {
    return db.core_config_data.get('staffName');
}

export function getLocationName() {
    return db.core_config_data.get('location_name');
}