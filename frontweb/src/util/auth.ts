import { Role } from 'types/role';
import { getTokenData } from './token';

export const isAuthenticated = (): boolean => {
  let tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

/*saber se O USUARIO ATUAL QUE ESTA LOGADO POSSUI ALGUM ROLE QUE ESTA NESTA LISTA roles e se 
tem alguma role para fazer na ui a restricao de conteudo caso nao tenha a role necessaria*/
export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true
  }
  const tokenData = getTokenData(); //pega os perfis dos usuarios logados la do localStorage
  /*se eu quiser testar esta funcao de pegar os token é melhor mocar ela ou seja, fazer uma implementação hardcoded
  para simular o comportamento de uma outra função sem depender do comportamento desta */

  if (tokenData !== undefined) {
    /*Eu poderia testar isso de forma bem 'provincial' com um for each
    for (var i=0; i< role.length; i++){if(tokenData.authorities.includes(roles[i])){return true}}
    */
    return roles.some(role => tokenData.authorities.includes(role));
  }
  return false
}