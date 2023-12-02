import React, { useEffect, useState } from "react";
import Service from '../../services/Service';
import { useForm } from "react-hook-form";
import { ReactComponent as HeaderLogo } from "../../images/header-logo.svg";
import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { ToWords } from 'to-words';
import { toast } from "react-toastify";

export default function DailyReports(){

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
      } = useForm();
      
    const navigate = useNavigate();
    var totalPrice = 0;
    var GrandTotal=0;
    var tempid=  0;
    var tmppatientId= 0;
    var PatientName='';
    
  //  var PreviouspId =0;

    const [MedicineData, setMedicineData] =useState();
    const [Tdate,setTdate] = useState("");
    const [Fdate,setFdate] = useState("");
    const [SDate, setSDate] = useState("");
    const [EDate,setEDate] = useState("");
    const toWords = new ToWords();

    useEffect(() => {
        loadAllMedicinesData();
    }, [])

    const loadAllMedicinesData = () => {
        var date= new Date().toISOString().split("T")[0];

        setSDate(date);
        setEDate(date);
        Service.getReportMedicineDetails(date,date).then(res => {
            totalPrice=0;
            setMedicineData(res.data);
        })
        .catch((error) => {
            console.log(error);
          });
    }

    const onStartDateChange = (e) => {
        setSDate(e.target.value);
        setTdate(e.target.value);
        
      }

    const onEndDateChange = (e) => {
      setEDate(e.target.value);
      setFdate(e.target.value);
    }

    const SearchRecord = () => {
        Service.getReportMedicineDetails(SDate,EDate).then(res => {
            totalPrice=0;
            if(res.data == '')
            {
                toast.error("Records Absent Between 2 Dates.");
                setMedicineData(res.data);
            }
            else
                setMedicineData(res.data);
        })
        .catch((error) => {
            console.log(error);
          });
    }

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

        return(
            <div>
                <div className="card patient-reg-card mx-5 my-5" style={{height:'200%'}}>
                    <div className="card-header patient-reg-card-header col-8" 
                        style={{display: "flex",justifyContent: "center",alignItems: "center", marginLeft : "17%"}}>
                            <h5> Reports </h5>
                    </div>
                   
                    <div className="row justify-content-end mt-2" >
                        <div className="col-10">
                            <table style={{ width: "80%", paddingLeft:"10px",paddingRight:"10px" }}>
                                    <tr>
                                        <td style={{ width: "25%" ,textAlign: "center" }}><b>From Date:</b></td>
                                        <td style={{ width: "25%" ,textAlign: "right" }}>
                                            <input
                                                className="form-control form-control-sm ps-3 rounded-3 "
                                                type="date"
                                                placeholder="From Date "
                                                defaultValue={ new Date().toISOString().split("T")[0] }
                                                max={ Fdate }
                                                aria-label="default input example"
                                                {...register("FromDate", {
                                                    required: "Please Enter From Date.",
                                                    onChange: e => onStartDateChange(e)
                                                })}
                                            />
                                            {errors.FromDate && (
                                                <span className="text-danger">
                                                    {errors.FromDate.message}
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ width: "20%" ,textAlign: "center" }}>  <b>To Date:</b></td>
                                        <td style={{ width: "25%" ,textAlign: "right" }}>
                                            <input
                                                className="form-control form-control-sm ps-3 rounded-3 "
                                                type="date"
                                                placeholder="To Date "
                                                defaultValue={ new Date().toISOString().split("T")[0] }
                                                min={ Tdate }
                                                aria-label="default input example"
                                                {...register("ToDate", {
                                                    required: "Please Enter To Date.",
                                                    onChange: e => onEndDateChange(e)
                                                })}
                                            />
                                            {errors.ToDate && (
                                                <span className="text-danger">
                                                    {errors.ToDate.message}
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ width: "10%" ,textAlign: "right" }}>
                                             <button type="button" className="btn btn-primary  btn_print " style={{paddingLeft:'10px',paddingRight:'10px',marginLeft:'50px'}} onClick={ SearchRecord }>
                                                Search
                                            </button>
                                        </td>
                                    </tr>
                            </table>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-8" id="print-invoice" style={{align : "center"}}>
                        <div className="col-8" 
                            style={{display: "flex",justifyContent: "center",alignItems: "center", marginLeft : "10%"}}>
                                <h5>Daily Reports </h5>
                        </div>  
                        <div className=" card receipt rounded-0 ">
                           <table style={{ width: "100%" }}>
                                <tr>
                                    <td style={{ textAlign: "left",width:"25%" ,paddingLeft:"30px"}}>
                                    <HeaderLogo style={{ width: "70%"}}/> 
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
                           <hr/>
                            <table className="table table-bordered table-striped " style={{ width: "100%" }}>
                                <thead class="table-dark">
                                    <tr>
                                        <th scope="col" style={{ width: "10%" ,textAlign: "left" }}>Sr. No.</th>
                                        <th scope="col" style={{ width: "15%" ,textAlign: "left" }}>Patient ID</th>
                                        <th scope="col" style={{ width: "25%" ,textAlign: "left" }}>Patient Name</th>
                                        <th scope="col" style={{ width: "10%" ,textAlign: "left" }}>Treatment</th>
                                        <th scope="col" style={{ width: "15%" ,textAlign: "left" }}> Date</th>
                                        <th scope="col" style={{ width: "13%" ,textAlign: "right" }}>Amount</th>
                                        <th scope="col" style={{ width: "13%" ,textAlign: "right" }}>Sub Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        MedicineData && MedicineData.map((item, i) => (
                                    
                                            tmppatientId = item.pId,
                                            GrandTotal += item.total,
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td> {item.pId} </td>
                                                <td className="capital Bold">{ item.patientName } </td>
                                                <td className="capital">{item.tid}</td>
                                                <td >{item.mbillingDate.split('T')[0] }</td>                                                                                                                
                                                <td style={{ textAlign: "right" }}>{item.total }</td>
                                                <td style={{ textAlign: "right" }}>{item.subtotal}</td>
                                            </tr>   
                                        
                                        ))
                                    }
                                </tbody>
                            </table>
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
                            <div className='row '>
                            <table style={{ width: "98%" }}>
                                <tr>
                                <td style={{ textAlign: "left" }}>
                                 <label style={{ marginLeft: "20px" }}>
                                    <b>Amount in Word (In Rupees):</b>{ toWords.convert(GrandTotal)} Only</label>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    <label className='ms-3 text-right' style={{ marginLeft: "20px" }}>
                                        <b>Grand Total : </b> {GrandTotal}</label>
                                </td>
                                </tr>
                            </table>
                            </div>
                        </div>

                        </div>
                        

                        <div className="col-2"> </div>
                        <div class="row justify-content-center mt-4 mb-5">
                            <div class="col-2">
                                <button type="button" className="btn btn-primary  btn_print " style={{paddingLeft:'30px',paddingRight:'30px',marginLeft:'120px'}} onClick={printInvoice}>
                                    Print
                                </button>
                            </div>
                            <div class="col-3">
                            <button
                                type="button"
                                className="btn btn-primary  btn_print "
                                style={{paddingLeft:'20px',paddingRight:'20px',marginLeft:'30px'}}
                                onClick={() => navigate('/Patient')} >
                                Cancel
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
        );
    
}

//export default DailyReports;