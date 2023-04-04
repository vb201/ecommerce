import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from './config';
import { useAtom } from 'jotai';
import { redirectedFromAtom } from './atoms/atom';

const PrivateRoute = ({ isAuth, navigatedFrom, children }) => {
  const [, setRedirectedFrom] = useAtom(redirectedFromAtom);
  if (isAuth) {
    return <>{children}</>;
  }

  toast.error('You need to login to view this page', TOAST_CONFIG);
  setRedirectedFrom(navigatedFrom);
  return <Navigate to="/login" />;
};

export default PrivateRoute;
