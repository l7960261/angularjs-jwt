import jwtInterceptor from './jwt.interceptor';
import authService from './auth.service';
import options from './jwt.options';

const angularjsJwtModule = angular
  .module('angularjs-jwt', [])
  .value('jwtOptions', options)
  .factory('jwtInterceptor', jwtInterceptor)
  .factory('authService', authService);

export default angularjsJwtModule;
