import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'



// Site
import Site from '../pages/site/Site';
import Home from '../pages/site/Home';
import RecLogin from '../pages/site/RecLogin';
import DocLogin from '../pages/site/DocLogin';
import AdminLogin from '../pages/site/AdminLogin';
//Admin
import Admin from '../pages/Admin/Admin';
import AdminHome from  '../pages/Admin/AdminHome';
import Doctor from '../pages/Admin/Doctor';

// Reception
import PatientReg from '../pages/reception/PatientReg';
import PrintInvoice from '../pages/reception/PrintInvoice';
import Reception from '../pages/reception/Reception';
import Print from '../pages/reception/Print';
import SearchPatient from '../pages/reception/SearchPatient';


//Medicine
import Billing from '../pages/reception/Billing';
import PrintBill from '../pages/reception/PrintBill';
import DailyReports from '../pages/reception/DailyReports';
import Specialization from '../pages/Admin/Specialization';

export default function Router() {

  //const LoggedIn=localStorage.getItem("isRecLoggedIn");

  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Site />} >
          <Route path='' element={<Home />} />
        </Route>

        <Route path='RecLogin'  element={<RecLogin />} />
        <Route path='DocLogin' element={<DocLogin />} />
        <Route path='AdminLogin' element={<AdminLogin />} />

        <Route path='/' element={<Admin />} >
        <Route path='AdminHome' element={<AdminHome />} />
        <Route path='DoctorDetails' element={<Doctor/>}/>
        <Route path='DoctorSpecialization' element={<Specialization/>}/>
        </Route>

        <Route path='/' element={<Reception />} >
          <Route path='Patient' element={<PatientReg />} />
          <Route path='PrintBill' element={<PrintBill />} />
          <Route path='Billing' element={<Billing />} />
          <Route path='DailyReports' element={<DailyReports/>} />        
          <Route path='SearchPatient' element={<SearchPatient />} />
          
        </Route>
  
       {/*}   <Route path='Patient' element={<PatientReg />} />
          <Route path='Billing' element={<Billing />} />
          <Route path='PrintBill' element={<PrintBill />} />
          <Route path='SearchPatient' element={<SearchPatient />} />
          <Route path='DailyReports' element={<DailyReports/>} />
  */}
         <Route path='print' element={<PrintInvoice />} >
        
          <Route path='' element={<Print />} />
         
         

        </Route>

      </Routes>
    </BrowserRouter>
  )
}
