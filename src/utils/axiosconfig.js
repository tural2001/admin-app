const getTokenFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const config = {
  headers: {
    'Accept-Language': 'az',
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null
        ? getTokenFromLocalStorage.data.token
        : ''
    }`,
    Accept: 'application/json',
  },
};
