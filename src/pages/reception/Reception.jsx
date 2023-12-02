import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  const recLogin=localStorage.getItem('RecLogin')
  if(recLogin){
    return true
  } else {
    return false
  }
}

export default function Reception() {
  const auth=useAuth();
  return (
    <div>
      {auth?<Outlet/>: <Navigate to="/RecLogin"/>}
    </div>
  )
}
