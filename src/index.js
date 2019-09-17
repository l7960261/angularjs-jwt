import jwtAuthenticationProvider from './jwt.authentication';
import jwtInterceptorProvider from './jwt.interceptor';

const angularjsJwtModule = angular
  .module('angularjs-jwt', [])
  .provider('jwtAuthentication', jwtAuthenticationProvider)
  .provider('jwtInterceptor', jwtInterceptorProvider);

export default angularjsJwtModule;
