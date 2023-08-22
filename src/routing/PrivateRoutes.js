import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (getTokenFromLocalStorage?.data.token === undefined) {
      navigate('/', { replace: true });
    }
  }, [getTokenFromLocalStorage, navigate]);

  return getTokenFromLocalStorage?.data.token !== undefined ? children : null;
};
