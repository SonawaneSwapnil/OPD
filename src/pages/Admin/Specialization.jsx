import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Footer1 from '../reception/Footer1'
import './AdminHome.css'
import { useForm } from "react-hook-form";
import Service from '../../services/Service';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Specialization(){
const {
    register, 
    handleSubmit, 
    
    formState: { errors },
    reset
    
    } = useForm();
    const [SpecializationData, setSpecializationData] = useState();
    const [isUpdate, setIsUpdate] = useState(false);
    const [sid, setsid] = useState();

    useEffect(() => {
        loadAllSpecializationData();
    }, [])
    
const loadAllSpecializationData = () => {
    Service.getAllSpecialization().then(res => {
        setSpecializationData(res.data);
    })
}

 //update data
 const onEdit = (item) => {
    console.log(item);
    reset(item);
    setIsUpdate(true);
    setsid(item.sId);
  };

const saveData = (data) => {
    if (!isUpdate) {
        console.log(data);
        Service.saveSpecialization(data).then(res => {
            console.log(res.data);
            toast.success('Record Successfully Added');
            loadAllSpecializationData();
        })
        .catch(error => {
            toast.error('Record already present');
        });
    }
    else{
        Service.updateSpecialization(sid, data).then((res) => {
        console.log(res.data);
        toast.success('Data Updated successfully...');
        reset({
            doctorSpecialization:"",
        });
        setIsUpdate(false);
        loadAllSpecializationData();
        });
    }
    
};

const ondelete = (item) => {
    if(window.confirm('Are you really want to delete this record?'))
    {
        console.log(item.sId);
        Service.deleteSpecialization(item.sId).then(res => {
        toast.success('Record deleted successfully...');
        loadAllSpecializationData();                
        })
    }

};
const navigate = useNavigate();
//logout user
    const logout = () => {
        localStorage.removeItem("AdminLogin");
        localStorage.setItem("isAdminLoggedIn",false);
        navigate("/");
      };
      
return(
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
      <div className="section" style={{ marginTop: 30,marginBottom:10 }}>
        <div className="row">
          <div className="col-md-4">
              <form onSubmit={handleSubmit(saveData)} autoComplete="off">
                  <div className="card patient-reg-card ">
                      <div className="card-header patient-reg-card-header">
                        <h5 className="text-center">Add Doctor Specialization</h5>
                      </div>
                      <br/>
                      <div className="row ms-5 gy-2 mb-3" style={{ width: "90%" }}>
                      <div className="col-10">
                          <input
                          className="form-control fo0rm-control-sm ps-3 rounded-3"
                          type="text"
                          placeholder="Enter Specialization"
                          aria-label="default input example"
                          {...register("doctorSpecialization", {
                              required: "Please Enter Specialization.",
                              pattern: {
                              value: /^[a-z A-Z]+$/,
                              message: "Enter Valid Specialization.",
                              },
                          })}
                          />
                          {errors.doctorSpecialization && (
                          <span className="text-danger">
                              {errors.doctorSpecialization.message}
                          </span>
                          )}
                      </div>
                      <div className="col-10">
                          <div
                          className="row gx-2 gy-2"
                          style={{ width: "100%" }}
                          >
                          <div className="col-6 d-grid gap-2">
                              <button
                              className="btn btn-primary btn-registration-form"
                              type="submit"
                              >
                              Save
                              </button>
                          </div>
                          <div className="col-6 d-grid gap-2">
                              <button
                              className="btn btn-primary btn-registration-form"
                              type="reset"
                              >
                              Cancel
                              </button>
                          </div>
                          </div>
                      </div>
                      
                      </div>
                  </div>
              </form>
          </div>
                      
          <div className="col-md-8">
            <div className="card patient-reg-card">
              <div className="card-header patient-reg-card-header">
                <h5 className="text-center">List of Specialization</h5>
              </div>
              <div className="card-body patient-list-card-body" >
                <div className="row ms-5" style={{ width: "90%" }}>

                  <table className="table borderless">
                    <thead className="table-light ">
                      <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Specialization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SpecializationData && SpecializationData.map((item, i) => (
                        <tr key={i}>
                          <td className="capital">{i + 1}</td>
                          <td className="capital">{item.doctorSpecialization}</td>
                          <td> 
                              <i
                                  onClick={() => onEdit(item)}
                                  className="bi bi-pencil-square ms-2 me-2"
                              ></i>
                              < i onClick={() => ondelete(item)} 
                              className="bi bi-x text-danger"></i>
                          </td>
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
</div>
);
}