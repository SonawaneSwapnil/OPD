import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Service from '../../services/Service';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Footer1 from './Footer1';
import "./PatientReg.css";
import { toast } from 'react-toastify';

export default function Billing() {
    var totalPrice = 0;
    const navigate = useNavigate();
    // get method

    const [MedicineData, setMedicineData] = useState();
    const [TreatmentData, setTreatmentData] = useState();

    //console.log("TreatmentData", TreatmentData);
    useEffect(() => {
        // loadAllMedicinesData();
        loadAllTreatmentData();
    }, [])

    const loadAllMedicinesData = () => {
        Service.getAllMedicines().then(res => {
            setMedicineData(res.data);
        })
    }
    const loadAllTreatmentData = () => {
        Service.getTreatment().then(res => {
            setTreatmentData(res.data);
        })
    }
    // validations
    const { register, handleSubmit, formState: { errors } } = useForm();
    const saveData = (data) => {
        console.log(data);
        const paylod = { ...data, pId: patientId, costPerUnit: Treatment_Data.treatmentCost }
        Service.saveMedicines(paylod).then(res => {
            console.log(res.data);

            if (res.data.mId == 0) {
                // alert("Data is already exist in the system...");
                toast.error('Data is already exist in the system...');
            }
            else {
                Service.GetMedicine(patientId).then(res => {
                    console.log(res.data);
                    setMedicineData(res.data);
                })
            }
            loadAllTreatmentData();
            setTreatment_Data({ tId: 1, treatmentName: '', treatmentCost: '', Quantity: '' });

        })
    };
    const [patientId, setPatientId] = useState();
    const [TreatmentCost, setTreatmentCost] = useState();
    const [patientName, setPatientName] = useState();
    const [address, setAddress] = useState();
    const [contactNo, setContactNo] = useState();
    const [birthDate, setBirthDate] = useState();
    const [doctorName, setDoctorName] = useState();

    const [GrandTotal, setGrandTotal] = useState();
    const [Treatment_Data, setTreatment_Data] = useState({ tId: 1, treatmentName: '', treatmentCost: '', Quantity: '' });

    const [PatientData, setPatientData] = useState();
    const [Total_Cost, setTotal_Cost] = useState();

    const onQuantityChange = (QId) => {
        const TCost = Treatment_Data.treatmentCost
        const Total = TCost * QId;
        setTotal_Cost(Total);
    }
    const onPatientIdChange = (pId) => {
        setPatientId(pId);
        console.log(pId);
        
            pId?.length <= 4 ?

            Service.getPatientById(pId).then((res) => {
                res.data == '' && pId?.length == 4 ? 
                alert("Patient not exists")
                 :
                    setPatientData(res.data);
                    console.log(res.data);
            })
            : alert("Patient not exists");
            
            Service.GetMedicine(pId).then(res => {
                console.log(res.data);
                setMedicineData(res.data);
            })
        }
        const [disabled, setDisabled] = useState(true);
        const setSelectedOption = (tId) => {
            console.log(tId);
            const Treatment_Datas = TreatmentData?.find(c => c.treatmentName == tId) || {};
            setTreatment_Data(Treatment_Datas);
            //  setDisabled(!disabled);
        }
        // delete racord
        const ondelete = (item) => {
            Service.deleteMedicineRecord(item.mId).then(res => {
                toast.success('Record deleted successfully...');
                loadAllMedicinesData();
            })

        }

        const logout = () => {
            localStorage.removeItem("RecLogin");
            localStorage.removeItem("DocLogin");
            localStorage.removeItem("isRecLoggedIn");
            localStorage.removeItem("isDocLoggedIn");
            navigate("/");
        };


        // print
        const onPrintData = () => {
            if (patientId == undefined) {
                toast.warning('Please enter patient ID before print bill.');
            }
            else {
                if (totalPrice == 0) {
                    toast.warning('Please enter treatment record before print bill.');
                }
                else {
                    const Bill = { pId: patientId, GrandTotal: totalPrice }
                    Service.saveTreatmentBillingdetails(Bill).then(res => {
                        console.log(res.data);
                        if (res.data == '') {
                            Service.getTreatmentBillingdetails(patientId).then(temp => {

                                temp.data[0] = { ...temp.data[0], grandTotal: totalPrice };
                                Service.updateTreatmentBillingdetails(temp.data[0].bId, temp.data[0]).then(res => {
                                    console.log(res.data);
                                    localStorage.setItem('PatientIDForMedicine', patientId);
                                    navigate('/printbill');
                                })
                            })


                        }
                        else {
                            localStorage.setItem('PatientIDForMedicine', patientId);
                            navigate('/printbill');
                        }
                    })
                }
            }
        }

        return (
            <div>
                <div className="main-container">
                    <header className="header">
                        <img
                            className="header-logo"
                            src="/assets/img/logo.jpg"
                            alt="logo"
                        />
                        <div>
                            <button
                                type="button"
                                className="btn  backgroundcolor ms-2 me-2 text-white rounded-2"
                                onClick={() => navigate("/SearchPatient")}>
                                Search Patient
                            </button>
                            <button type="button" className="btn  backgroundcolor ms-2 me-2 text-white rounded-2"
                                onClick={() => navigate('/patient')}>
                                Patient Registration</button>
                            <button type="button" className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
                                onClick={() => navigate('/billing')}>
                                Generate Patient Bill</button>
                            <button type="button" className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
                                onClick={() => navigate("/DailyReports")} >
                                Daily Reports </button>
                            <Link to="/"
                                className=" btn-logout text-decoration-none"
                                onClick={logout}
                            >
                                Logout
                            </Link>
                        </div>
                    </header>
                    <div className="section">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card patient-reg-card ">
                                    <div className="card-header patient-reg-card-header">
                                        <h5 className="text-center">Bill Generate Form</h5>
                                    </div>
                                    <div className="row gx-2 gy-2 mt-2 mb-2 ms-5">
                                        <div className="row">
                                            <div className="col-4">
                                                <input className="form-control  form-control-sm ps-3 rounded-3 mt-3" type="text " placeholder="Enter Patient ID" onChange={(e) => onPatientIdChange(e.target.value)}
                                                />
                                            </div>
                                            <div className='col-6'>
                                                <label className="Patient-label mt-3 capital"> Patient Name-{PatientData && PatientData.patientName}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="logincolor mt-4 mb-1 ms-5 gx-2 gy-2">Treatment Details:</h5>
                                    <div className="row gy-2 gx-1 mt-2 mb-2 ms-5">
                                        <div className="col-4">
                                            <label className="Medicine-label mb-2 ms-2"> Treatment</label>
                                            <select
                                                className="form-select form-select-sm rounded-3"
                                                aria-label="Default select example"
                                                {...register("TId", {
                                                    required: "Select one option.",
                                                })}
                                                onChange={(e) => setSelectedOption(e.target.value)}
                                            >
                                                {<option value="">Select Treatment</option>}
                                                {(TreatmentData)?.map((option) => (
                                                    <option key={option} value={option.tId}>
                                                        {option.treatmentName}
                                                    </option>

                                                ))}
                                            </select>
                                            {errors.medicineName && (
                                                <span className="text-danger">
                                                    {errors.medicineName.message}
                                                </span>
                                            )}

                                        </div>
                                        <div className="col-2">
                                            <label className="Cost-label mb-2 ms-2">Cost</label>
                                            <input className="form-control  form-control-sm ps-3 rounded-2 ms-2" type="text " placeholder="Enter Cost" value={Treatment_Data.treatmentCost}
                                                {...register("costPerUnit", {
                                                    required: 'Please Enter Cost', pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: "Enter valid Cost",

                                                    },
                                                })} />

                                        </div>
                                        <div className="col-3">
                                            <label className="Quantity-label mb-2 ms-2">Quantity</label>
                                            <input className="form-control  form-control-sm ps-3 rounded-3 ms-2" type="text " placeholder="Enter Quantity" value={Treatment_Data.Quantity} // onChange={(e) => onQuantityChange(e.target.value)}
                                                {...register("quantity", {
                                                    required: 'Please Enter Quantity', pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: "Enter valid Quantity",
                                                    },
                                                })}
                                            />
                                            {errors.quantity && <span className='text-danger'> {errors.quantity.message}</span>}

                                        </div>
                                        {/* <div className="col-2">
                                        <label className="Total-label mb-2 ms-2">Total</label>
                                        <input className="form-control  form-control-sm ps-3 rounded-3 ms-3" type="text " Value={Total_Cost} placeholder="Enter Total"></input> 
                                    </div> */}
                                        <div className="col-2">
                                            <label className="registration-label mb-2 ms-2"> </label>
                                            <form onSubmit={handleSubmit(saveData)} >
                                                <div className="col-4 d-grid gap-2">
                                                    <button
                                                        className="btn btn-primary btn-registration-form ms-4"
                                                        type="submit">
                                                        Add
                                                    </button>


                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="row mt-2 mb-5 ms-3 gx-2 gy-2">

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card patient-reg-card">
                                    <div className="card-header patient-reg-card-header">

                                        <div className="row">
                                            <div className="col-6 capital">
                                                <h6>Patient Name-{PatientData && PatientData.patientName}</h6>

                                            </div>
                                            <div className="col-6">
                                                <label style={{ float: "right" }}>
                                                    <h6>Doctor's Name-{PatientData && PatientData.doctorName}</h6>
                                                </label>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="row" style={{ paddingLeft: "10px", paddingRight: "10px" }} >
                                        <div className="col-6 ">
                                            <label className='capital' style={{ marginLeft: "45px" }}>
                                                <h6>Patient Address-{PatientData && PatientData.address}</h6>
                                            </label>

                                        </div>
                                        <div className="col-6" style={{ paddingRight: "60px" }} >
                                            <label style={{ float: "right" }} >
                                                <h6>Contact No-{PatientData && PatientData.contactNo}</h6>

                                            </label>

                                        </div>

                                    </div>

                                    <div className="card-body ">
                                        <div className="row ms-3" style={{ width: "100%" }}>

                                            <table className="table borderless">
                                                <thead className="table-light ">
                                                    <tr>
                                                        <th scope="col"> Id</th>
                                                        <th scope="col">Treatment</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Cost Per Unit</th>
                                                        <th scope="col">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {MedicineData && MedicineData.map((item, i) => (
                                                        totalPrice += item.quantity * item.costPerUnit,
                                                        <tr key={i}>


                                                            <td>{i + 1}</td>

                                                            <td className="capital">{item.tid}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.costPerUnit}</td>
                                                            <td>{item.quantity * item.costPerUnit}</td>
                                                            <td>  < i onClick={() => ondelete(item)} className="bi bi-x text-danger"></i></td>
                                                        </tr>

                                                    ))}


                                                </tbody>
                                            </table>

                                            <hr />
                                            <div className='row justify-content-end'>

                                                <div className="col-4 d-grid gap-2 ms-4" >
                                                    <label>Grand Total:<span className='ms-5'>{totalPrice}</span></label>


                                                </div>
                                            </div>

                                            <div className='row justify-content-end mt-3'>

                                                <div className="col-3 d-grid gap-2 " style={{ width: '35%' }}>
                                                    <button
                                                        //  onClick={() => navigate('/PrintBill')}
                                                        onClick={() => onPrintData()}
                                                        className="btn btn-primary btn-registration-form ms-1"
                                                        type="submit"

                                                    >
                                                        Save & Print
                                                    </button>


                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>



                        </div>

                    </div>

                </div>
               {/*} <Footer1 style={{ width: '93%' }} /> */}
            </div>
        )
    }
