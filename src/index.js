import jwtParcelerProvider from './jwt.parceler';
import jwtAuthenticationProvider from './jwt.authentication';
import jwtInterceptorProvider from './jwt.interceptor';

const angularjsJwtModule = angular
  .module('angularjs-jwt', [])
  .provider('jwtParceler', jwtParcelerProvider)
  .provider('jwtAuthentication', jwtAuthenticationProvider)
  .provider('jwtInterceptor', jwtInterceptorProvider);

export default angularjsJwtModule;
