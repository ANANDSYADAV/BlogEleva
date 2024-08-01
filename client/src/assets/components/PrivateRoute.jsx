import { useSelector } from 'react-redux';
// using Outlet for allowing access to the children routes
// Navigate is a component used to redirect
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);

    return currentUser ? <Outlet /> : <Navigate to='/signup' />
}

export default PrivateRoute
