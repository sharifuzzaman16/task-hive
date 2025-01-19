import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import Loading from '../pages/Shared/Loading/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
