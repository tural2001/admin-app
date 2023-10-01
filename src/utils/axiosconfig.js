const getTokenFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const config = {
  getHeaders: (selectedLanguage) => ({
    'Accept-Language': selectedLanguage,
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null
        ? getTokenFromLocalStorage?.data?.token
        : ''
    }`,
    Accept: 'application/json',
  }),
};
