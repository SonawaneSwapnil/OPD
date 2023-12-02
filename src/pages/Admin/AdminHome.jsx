import React, { useEffect, useState } from "react";

import './AdminHome.css'
import { useForm } from "react-hook-form";
import Service from '../../services/Service';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminHome() {

  useEffect(() => {
    loadAllTreatmentData();
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [TreatmentData, setTreatmentData] = useState();
  

  //logout function 
  const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("AdminLogin");
  localStorage.removeItem("isAdminLoggedIn");
  navigate("/");
};

  const loadAllTreatmentData = () => {
    Service.getTreatment().then(res => {
      setTreatmentData(res.data);
    })
  }
  const saveData = (data) => {
    console.log(data);
    Service.saveTreatment(data).then(res => {
      
      console.log(res.data);
    
      toast.success('Record successfully Added');
      loadAllTreatmentData();
    })
    .catch(error => {
       toast.error('Record already present');
    });
   
    
  };
  const ondelete = (item) => {
     if(window.confirm('Are you really want to delete this record?'))
     {
          console.log(item.tid);
          Service.deleteTreatmentRecord(item.tid).then(res => {
            toast.success('Record deleted successfully...');
            loadAllTreatmentData();
            
          })
      }

  }
  return (
    <div>
      <div className="main-container ">
        <header className="header">
          <img
            className="header-logo"
            src="/assets/images/logo.jpg"
            alt="logo"
          />
          <div>
            <button
                  type="button"
                  className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
                  onClick={() => navigate("/DoctorSpecialization")} >
                  Add Specialization
            </button>
            <button
                  type="button"
                  className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
                  onClick={() => navigate("/DoctorDetails")} >
                  Add Doctor
            </button>
            <button
              type="button"
              className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
              onClick={() => navigate("/adminhome")} >
              Add Treatment
            </button>
            <button
              type="button"
              className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
              onClick={() => navigate("/billing")} >
              Generate Patient Bill
            </button>
            <button
              type="button"
              className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
              onClick={() => navigate("/DailyReports")}
            >
              Daily Reports
            </button>
            <a
              onClick={logout}
              className="btn-logout text-decoration-none"
              style={{ cursor: "pointer" }}
            >
              Logout
            </a>
          </div>
        </header>
        <div className="section" style={{ marginTop: 30 }}>
          <div className="row">
            <div className="col-md-6">
              <div className="card patient-reg-card ">
                <div className="card-header patient-reg-card-header">
                  <h5 className="text-center">Add Treatment</h5>
                </div>
                <div className="row gy-2 mt-2 mb-2 ms-4">
                  <div className="col-6">
                    <label className="Medicine-label mb-2 ms-2"> Treatment Name</label>
                    <input className="form-control form-control-sm ps-3 rounded-3 ms-2"
                      type="text"
                      placeholder="Treatment Name"
                      aria-label="default input example"
                      {...register("treatmentName", {
                        required: "Enter Treatment Name.",
                        pattern: {
                          value: /^[a-z A-Z]+$/,
                          message: "Enter Valid Name.",
                        },
                      })}
                    />
                    {errors.treatmentName && (
                      <span className="text-danger">
                        {errors.treatmentName.message}
                      </span>
                    )}
                  </div>
                  <div className="col-3">
                    <label className="Medicine-label mb-2 ms-2"> Treatment Cost</label>
                    <input
                      className="form-control  form-control-sm ps-3 rounded-2 ms-3"
                      type="text"
                      placeholder="Treatment Cost"
                      aria-label="default input example"
                      {...register("treatmentCost", {
                        required: "Enter Treatment Cost.",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Enter Valid Treatment Cost.",
                        },
                      })}
                    />
                    {errors.treatmentCost && (
                      <span className="text-danger">
                        {errors.treatmentCost.message}
                      </span>
                    )}
                  </div>
                  <div className="col-3">
                    <label className="Medicine-label mb-2 ms-2"> </label>
                    <form onSubmit={handleSubmit(saveData)} >
                      <button className="btn btn-primary btn-registration-form ms-4" type="submit" >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card patient-reg-card">
                <div className="card-header patient-reg-card-header">
                  <h5 className="text-center">List of Treatment</h5>
                </div>
                <div className="card-body patient-list-card-body" >
                  <div className="row ms-3" style={{ width: "100%" }}>

                    <table className="table borderless">
                      <thead className="table-light ">
                        <tr>
                          <th scope="col"> Id</th>
                          <th scope="col">Treatment</th>
                          <th scope="col">Cost</th>

                        </tr>
                      </thead>
                      <tbody>
                        {TreatmentData && TreatmentData.map((item, i) => (
                          <tr key={i}>
                            <td className="capital">{i + 1}</td>
                            <td className="capital">{item.treatmentName}</td>
                            <td className="capital">{item.treatmentCost}</td>
                            <td>  < i onClick={() => ondelete(item)} className="bi bi-x text-danger"></i></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     {/* <Footer1 style={{width: '60%'}} /> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
      </div>
    </div>
  );
}

