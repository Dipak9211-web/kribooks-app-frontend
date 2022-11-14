import React, {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {useAuth} from '../../context/Auth'
import Loading from './Loading';
import axios from 'axios';

function PrivateRoute() {
    const [auth] = useAuth();
    const [ok, setOk] = useState(false)

    useEffect(()=>{
      const authCheck = async ()=>{
        const {data} = await axios.get(`/auth-check`);
        if(data.ok){
         setOk(true)
        }else{
         setOk(false)
        }
      }
      authCheck();
      },[auth?.token])
           

   //  useEffect(()=>{
   //       if(auth?.token){
   //          setOk(true)
   //       }else{
   //          setOk(false)
   //       }
   //  },[auth?.token])
  return ok? <Outlet/>:<Loading/>
}

export default PrivateRoute