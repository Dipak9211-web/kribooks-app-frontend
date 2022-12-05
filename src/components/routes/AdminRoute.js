import React, {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {useAuth} from '../../context/Auth'
import Loading from './Loading';
import axios from 'axios';

function AdminRoute() {
    const [auth] = useAuth();
    const [ok, setOk] = useState(false)

    useEffect(()=>{
      const adminCheck = async ()=>{
        const {data} = await axios.get(`/auth-check`);
        if(data.ok){
         setOk(true)
        }else{
         setOk(false)
        }
      }
      adminCheck();
      },[auth?.token])
           

  return ok? <Outlet/>:<Loading path="/"/>
}

export default AdminRoute