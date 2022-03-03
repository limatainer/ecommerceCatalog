import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

export const getTokenData = (): TokenData | undefined => {
  try {
    return jwtDecode(getAuthData().access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
};

export const isAuthenticated = (): boolean => {
  let tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

//saber se tem alguma role para fazer na ui a restricao de conteudo caso nao tenha a role necessaria
export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true
  }
  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    /*Eu poderia testar isso de forma bem 'provincial' com um for each
    for (var i=0; i< role.length; i++){if(tokenData.authorities.includes(roles[i])){return true}}
    */
    return roles.some(role => tokenData.authorities.includes(role));
  }
  return false
}