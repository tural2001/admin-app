import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const OpenRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (getTokenFromLocalStorage?.data.token !== undefined) {
      navigate('/admin', { replace: true });
    }
  }, [getTokenFromLocalStorage, navigate]);

  return children;
};
