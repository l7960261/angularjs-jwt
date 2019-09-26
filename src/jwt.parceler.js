import { assign } from 'lodash';
import IllegalJwtToken from './models/illegal-jwt-token';
import JwtToken from './models/jwt-token';

export default function jwtParcelerProvider() {
  let parcelerOptions = {
    storeKeyAccessToken: '_jwt_access_token',
    storeKeyRefreshToken: '_jwt_refresh_token'
  };

  this.changeOptions = (options) => {
    parcelerOptions = assign(parcelerOptions, options);
  };

  this.$get = [function jwtParcelerFactory() {
    function setToken(key, value) {
      if (window.localStorage) {
        localStorage.setItem(key, value);
      } else {
        const date = new Date();
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        document.cookie = `${key}=${value}; expires=${date.toUTCString()}; path=/`;
      }
    }

    function getToken(key) {
      if (window.localStorage) {
        return localStorage.getItem(key);
      }

      const name = `${key}=`;
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i += 1) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(name) === 0) return cookie.substring(name.length, cookie.length);
      }

      return '';
    }

    function setAccessToken(value) {
      setToken(parcelerOptions.storeKeyAccessToken, value);
    }

    function getAccessToken() {
      const raw = getToken(parcelerOptions.storeKeyAccessToken);
      let token;
      try {
        token = new JwtToken(raw);
      } catch (error) {
        if (!(error instanceof IllegalJwtToken)) {
          throw error;
        }
      }

      return token;
    }

    function setRefreshToken(value) {
      setToken(parcelerOptions.storeKeyRefreshToken, value);
    }

    function getRefreshToken() {
      return getToken(parcelerOptions.storeKeyRefreshToken);
    }

    return {
      get config() {
        return parcelerOptions;
      },
      setToken,
      setAccessToken,
      getAccessToken,
      setRefreshToken,
      getRefreshToken,
    };
  }];
}
