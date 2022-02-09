import React, { createContext, useReducer } from 'react'

import jwtDecode from 'jwt-decode';

const authContext = createContext({
    user: null,
    login: (userData)=>{},
    logout: ()=>{}
})

const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')){
    const userTokenDecoded = jwtDecode(localStorage.getItem('jwtToken'));
    // exp is in seconds(which will be less than Date.now() measured in milliseconds)
    
    if(userTokenDecoded.exp*1000<Date.now()){
        //token expired
        localStorage.removeItem('jwtToken');
    }else{
        // token valid
        initialState.user = {...userTokenDecoded, token: localStorage.getItem('jwtToken')};
    }
}
const authReducer = (state, action={})=>{
    switch(action.type){
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        default:
            return state
    }
}

const AuthContextProvider = (props) => {

    const [ state, dispatch ] = useReducer(authReducer, initialState)

    const login = (userData)=>{
        localStorage.setItem('jwtToken', userData.token);

        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = ()=>{
        localStorage.removeItem('jwtToken')
        dispatch({
            type: 'LOGOUT'
        })
    }
    
    return (
        <authContext.Provider value={{ user: state.user, login, logout }}>
         {props.children}
        </authContext.Provider>
    )
}

export { AuthContextProvider, authContext }
