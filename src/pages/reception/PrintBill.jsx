import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../../services/Service";
import { ToWords } from 'to-words';

import { ReactComponent as HeaderLogo } from "../../images/header-logo.svg";
//const logos ='./assets/img/logo.png';


const getPid=()=>{
  const pid=JSON.parse(localStorage.getItem("PatientIDForMedicine"));
  return pid
}


export default function PrintBill() {
  var totalPrice = 0;
 
  const navigate = useNavigate();
  const PId=getPid();
  console.log(PId);
  const [printData, setPrintData] = useState();
  const [medicineData, setMedicineData] = useState();

 
  useEffect(() => {
    Service.getPatientById(PId).then((res) => {
      setPrintData(res.data);
      console.log(res.data);
    });
  }, [PId]);

 
  useEffect(() => {
    loadAllMedicinesData();
  }, []);

  const loadAllMedicinesData = () => {
   

    Service.GetMedicine(PId).then(res => {
      console.log(res.data);
      setMedicineData(res.data);
  });
  };

  
  const printInvoice = () => {
    const prtContent = document.getElementById("print-invoice");
    prtContent.style.padding = "20px";
    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close(); 
}
const toWords = new ToWords();
let words = toWords.convert(totalPrice);
  
  return (
    <div>
      <div className="card patient-reg-card mx-5 my-5" style={{height:'200%'}}>
      <div className="row justify-content-end mt-5" >
        <div className="col-6" id="print-invoice">
          <div className=" card receipt rounded-0 ">
            <table style={{ width: "100%" }}>
            <tr>
                  <td style={{ textAlign: "left",width:"25%" }}>
                  <HeaderLogo style={{ width: "80%"}}/> 
                  </td>
                  <td style={{ textAlign: "center",fontSize:"25px",width:"75%" }}>
                    <b>
                      <label className="mx-3">
                    
                        Sai Seva Multispeciality Hospital
                      </label>
                    </b>
                  </td>
                </tr>
            </table>
            <table style={{ width: "100%" }}>
                <tr>
                <td style={{ textAlign: "left",width:"75%" }}>
                  <label className="Hospitalname mx-3"><b>Address: </b> Airport Road, Opposite to Appa Cha Dhaba, Korhale, Shirdi - 423107.</label>
                  
                  </td>
                  <td style={{ textAlign: "right",width:"25%" }}>
                  <label className="mx-3"><b>Reg. No.</b>1234</label>
                  </td>
                </tr>
            </table>
            
            <hr></hr>
            <table style={{ width: "100%" }}>
              <tr>
                <td style={{ textAlign: "left" }}>
                <label className="mx-3 capital"><b>Patient Name:</b> {printData && printData.patientName} </label>
                </td>
              
                <td style={{ textAlign: "right" }}>
                <label className="Hospitalname mx-3"><b>Date:</b> { new Date().toLocaleDateString('en-GB') } </label>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                <label className="mx-3 pr-3 capital"><b>Address:</b> {printData && printData.address}</label>
                </td>
                <td style={{ textAlign: "right" }}>
                <label className="Hospitalname mx-3"><b>Patient ID:</b> {printData && printData.pId}</label>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                <label className="mx-3"><b>Contact: </b>{printData && printData.contactNo}</label>
                </td>
                <td>
                &nbsp;
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>
                <label style={{ textAlign: "center" }}><b>Bill No:</b>1020</label>
                </td>
              </tr>
            </table>
            <hr></hr>
              <div>
                <table class="table borderless" style={{ width: "100%" }}>
                  <thead class="table-light ">
                    <tr>
                      <th scope="col" style={{ width: "20%" ,textAlign: "left" }}>ID</th>
                      <th scope="col" style={{ width: "20%" ,textAlign: "left"}}>Treatment </th>
                      <th scope="col" style={{ width: "20%" ,textAlign: "right" }}>Quantity</th>
                      <th scope="col" style={{ width: "20%" ,textAlign: "right" }}>Cost Per Unit</th>
                      <th scope="col" style={{ width: "20%" ,textAlign: "right" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicineData &&
                      medicineData.map((item, i) => (
                        totalPrice +=item.quantity*item.costPerUnit,
                        <tr key={i}>
                          <td style={{ width: "20%",textAlign: "left" }}>{i + 1}</td>
                          {/* <td>{item.mId}</td> */}
                          <td style={{ width: "20%" ,textAlign: "left"}}>{item.tid}</td>
                          <td style={{ width: "20%" ,textAlign: "right"}}>{item.quantity}</td>
                          <td style={{ width: "20%" ,textAlign: "right"}}>{item.costPerUnit}</td>
                          <td style={{ width: "20%" ,textAlign: "right"}}>{item.quantity*item.costPerUnit}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <hr />
              <table style={{ width: "100%" }}>
                
                <tr>
                  <td style={{ textAlign: "left" }}>
                  
                    <label style={{ marginLeft: "20px" }}><b>Amount in Word (In Ruppes):</b>{ toWords.convert(totalPrice)} Only</label>
                  </td>
                  <td style={{ textAlign: "right" }}>
                  <label className='ms-3 text-center' style={{ marginLeft: "20px" }}><b>Grand Total:</b>{totalPrice}</label>
                  </td>
                </tr>
              </table>
            </div>

        </div>
        

        <div className="col-3">

        </div>
        <div class="row justify-content-center mt-4 mb-5">
            <div class="col-3">
              <button type="button" className="btn btn-primary  btn_print " style={{paddingLeft:'60px',paddingRight:'60px',marginLeft:'150px'}} onClick={printInvoice}>
                Print
              </button>
            </div>
            <div class="col-3">
              <button type="button" className="btn btn-primary  btn_print "style={{paddingLeft:'50px',paddingRight:'50px'}} onClick={() => navigate('/billing')}>
                Cancel
              </button>
            </div>
          </div>
      </div>
      </div>
    </div>
  );


}
