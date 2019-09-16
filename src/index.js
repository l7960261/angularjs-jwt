import jwtInterceptor from './jwt.interceptor';
import authService from './auth.service';

const angularjsJwtModule = angular
  .module('angularjs-jwt', [])
  .factory('jwtInterceptor', jwtInterceptor)
  .factory('authService', authService);

export default angularjsJwtModule;
