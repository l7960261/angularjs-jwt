import jwtAuthenticationProvider from './jwt.authentication';
import jwtInterceptor from './jwt.interceptor';

const angularjsJwtModule = angular
  .module('angularjs-jwt', [])
  .provider('jwtAuthentication', jwtAuthenticationProvider)
  .factory('jwtInterceptor', jwtInterceptor);

export default angularjsJwtModule;
