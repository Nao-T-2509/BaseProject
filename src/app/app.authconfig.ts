import { AuthConfig } from 'angular-oauth2-oidc';
import { auth_dev_url } from './core/const/url';

export const authCodeFlowConfig: AuthConfig = {

    issuer: `${auth_dev_url}`,
    requireHttps: false,
    loginUrl: `${auth_dev_url}/connect/authorize`,
    logoutUrl: `${auth_dev_url}/connect/endsession`,

    redirectUri: `${window.location.origin}/signin-oidc`,
    postLogoutRedirectUri: `${window.location.origin}/signout-callback-oidc`,
    responseType: 'code',
    clientId: 'Eztek_Identity_Dev',
    dummyClientSecret: 'Eztek_Identity_Dev',
    scope: 'roles profile openid email',

    disablePKCE: false,
    useSilentRefresh: true,
    // silentRefreshTimeout: 100000,
};
