import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from './config';

const PrivateRoute = ({ isAuth, children }) => {
  if (isAuth) {
    return <>{children}</>;
  }

  toast.error('You need to login to view this page', TOAST_CONFIG);
  return <Navigate to="/login" />;
};

export default PrivateRoute;
