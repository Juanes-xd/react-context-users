import React,{useReducer,useState} from 'react'
import UserReducer from './UserReducer'
import UserContext from './UserContext'
import { axios } from "axios";
import { GET_USERS } from '../types';

const UserState = (props) => {

    const initialState = {
        user: [],
        selectedUser: null
    }
    
    const [state, dispatch] = useReducer(UserReducer, initialState)

    const getUsers = async () => {
       const res =  await axios.get('https://reqres.in/api/users');
       console.log(res.data.data);
       dispatch({
        type: 'GET_USERS',
        payload: res.data.data
       })
    }
    
    const getProfile = async (id) => {
        const res =  await axios.get('https://reqres.in/api/users/'+id);
       console.log(res);
       dispatch({
        type: 'GET_PROFILE',
        payload: res.data.data
       })
    }

    return(
        <UserContext.Provider value={{
        user: state.user,
        selectedUser: state.selectedUser,
        getUsers,
        getProfile
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
