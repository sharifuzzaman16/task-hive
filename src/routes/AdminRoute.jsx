import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import Loading from '../pages/Shared/Loading/Loading';
import useUser from '../hooks/useUser';

const AdminRoute = ({ children }) => {
  const { user: firebaseUser, loading } = useContext(AuthContext);
  const [user] = useUser();
  const isAdmin = user.role === 'admin';

  if (loading) {
    return <Loading />;
  }

  if (firebaseUser && isAdmin) {
    return children;
  }

  return <Navigate to="/unauthorized" />;
};

export default AdminRoute;
