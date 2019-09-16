import jwtInterceptor from './jwt.interceptor';

const angularjsJwtModule = angular
  .module('angularjs-jwt', [])
  .factory('jwtInterceptor', jwtInterceptor);

export default angularjsJwtModule;
