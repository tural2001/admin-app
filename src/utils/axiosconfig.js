const getTokenFromLoacalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLoacalStorage.token}`,
    Accept: 'application/json',
  },
};
