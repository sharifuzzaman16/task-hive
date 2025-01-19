import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import Loading from '../pages/Shared/Loading/Loading';
import useUser from '../hooks/useUser';

const BuyerRoute = ({ children }) => {
  const { user: firebaseUser, loading } = useContext(AuthContext);
  const [user] = useUser();
  const isWorker = user.role === 'worker';

  if (loading) {
    return <Loading />;
  }

  if (firebaseUser && isWorker) {
    return children;
  }

};

export default BuyerRoute;
