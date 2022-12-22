import { environment } from "src/environments/environment";
export const base_url = environment.base_url;
export const api_url = base_url + "api"
export const admin_url = api_url + "/admin"
export const gateway_url = base_url + "gateway";
export const auth_dev_url = "https://id-dev.eztek.net"
export const license_url = gateway_url + "/Licensing"
export const URL_CDN_UPLOAD = environment.BASE_URL_UPLOAD + '/gateway/Media/Upload';
