import React from 'react'
import PatientReg from './pages/reception/PatientReg';
import Billing from './pages/reception/Billing';
import Router from './router/Router';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div>
      
      <Router/>
      <ToastContainer
      theme="colored"
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      closeOnClick={true}      
      />
    </div>
  )
}
