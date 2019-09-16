function saveToken(key, value) {
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

export { saveToken, getToken };
