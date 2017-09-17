export const APP_DOMAIN = 'localhost';
export const APP_PORT = '3000';
export const APP_URL = 'http://' + APP_DOMAIN + ':' + APP_PORT;

export const API_GATEWAY_DOMAIN = 'localhost';
export const API_GATEWAY_PORT = '3002';
export const API_GATEWAY_URL = 'http://' + API_GATEWAY_DOMAIN + ':' + API_GATEWAY_PORT;
export const API_GATEWAY_ROOT_ENDPOINT = API_GATEWAY_URL + '/graphql';

export const AUTH0_DOMAIN = 'bsapaka.auth0.com';
export const AUTH0_CLIENT_ID = '4FXSDQeNobJ2XHR16pkKjLzfuoAGSyb5';
export const AUTH0_CALLBACK_URL = APP_URL + '/callback';
export const AUTH0_RESUME_SERVICE_AUD_ID = 'builder_service';
