import jwtInterceptor from './jwt.interceptor';
import jwtAuthentication from './jwt.authentication';
import jwtOptions from './jwt.options';

const angularjsJwtModule = angular
  .module('angularjs-jwt', [])
  .value('jwtOptions', jwtOptions)
  .factory('jwtInterceptor', jwtInterceptor)
  .factory('jwtAuthentication', jwtAuthentication);

export default angularjsJwtModule;
