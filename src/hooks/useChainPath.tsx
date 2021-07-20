import {useLocation} from 'react-router-dom';

export const useChainPath = () => {
  const location = useLocation();
  return location.pathname.split('/').slice(0, 2).join('/');
};
