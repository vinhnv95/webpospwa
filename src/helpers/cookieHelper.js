import cookie from 'react-cookies';
import db from "../model/db";

export function renewWebposSession() {
    console.log('renew session');
    let sessionTimeout;
    db.core_config_data.get('timeoutSession').then(result => {
        if (result) {
            sessionTimeout = result.value;
        } else {
            sessionTimeout = 86400;
        }
        let expires = new Date(new Date().getTime() + sessionTimeout * 1000);
        let sessionID = cookie.load('sessionID');
        cookie.save('sessionID', sessionID, {path: '/', expires});
    });
}
