import React, { useContext } from 'react'
import { Navigate, Outlet  } from 'react-router-dom'

import { authContext } from '../context/AuthContextProvider'
const AuthRoute = () => {

    const { user } = useContext(authContext);
    
    return user? <Navigate  to='/'/>: <Outlet />

}

export default AuthRoute
