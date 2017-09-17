import { accessTokenKey } from 'src/state/auth/constants';

export const getAccessToken = () => localStorage.getItem(accessTokenKey);

export const clearAccessToken = () => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem('expires_at');
};
