import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Footer1 from '../reception/Footer1'
import './AdminHome.css'
import { useForm } from "react-hook-form";
import Service from '../../services/Service';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Doctor() {

  // This variable determines whether password is shown or not
  const [isShown, setIsSHown] = useState(false);
 
  // This function is called when the checkbox is checked or unchecked
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

useEffect(() => {
    loadAllDoctorData();
    loadAllSpecializationData();
  }, [])

  const {
    register, 
    handleSubmit, 
    
    formState: { errors },
    reset
  
  } = useForm();
  const [DoctorData, setDoctorData] = useState();
  const [SpecializationData,setSpecializationData] = useState();
  const [SelectedSpecialization,setSelectedSpecialization] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [did, setDid] = useState();
      
  const navigate = useNavigate();
//logout user
    const logout = () => {
        localStorage.removeItem("AdminLogin");
        localStorage.setItem("isAdminLoggedIn",false);
        navigate("/");
      };

//On Change of Specialization
const onSpecializationChange = (e) => {
  const value = e.target.value;
  setSelectedSpecialization(value);
}

  //update data
  const onEdit = (item) => {
    console.log(item);
    reset(item);
    setIsUpdate(true);
   setSelectedSpecialization(item.sId);
    setDid(item.dId);
  };

const loadAllDoctorData = () => {
  Service.getAllDoctor().then(res => {
    setDoctorData(res.data);
  })
}

const loadAllSpecializationData = () => {
  Service.getAllSpecialization().then(res => {
    setSpecializationData(res.data);
  })
}

const saveData = (data) => {
  const formdata={...data,specialization:SelectedSpecialization};
  if (!isUpdate) {
      console.log(formdata);
      Service.saveDoctor(formdata).then(res => {
        
        console.log(res.data);
      
        toast.success('Record successfully Added');
        loadAllDoctorData();
      })
      .catch(error => {
          toast.error('Record already present');
      });
  }
  else{
     Service.updateDoctors(did, formdata).then((res) => {
      console.log(res.data);
      toast.success('Data Updated successfully...');
      reset({
        doctorName: "",
        contactNo: "",
        address: "",
        email: "",
        designation: "",
        doctorSpecialization: "",
        username: "",
        password: "",
      });
      setIsUpdate(false);
      loadAllDoctorData();
    });
  }
  
};
const ondelete = (item) => {
    if(window.confirm('Are you really want to delete this record?'))
    {
        console.log(item.dId);
        Service.deleteDoctorRecord(item.dId).then(res => {
          toast.success('Record deleted successfully...');
          loadAllDoctorData();                
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
      <div className="section" style={{ marginTop: 30,marginBottom:10 }}>
        <div className="row">
          <div className="col-md-4">
              <form onSubmit={handleSubmit(saveData)} autoComplete="off">
                  <div className="card patient-reg-card ">
                      <div className="card-header patient-reg-card-header">
                        <h5 className="text-center">Add Doctor Details</h5>
                      </div>
                      <br/>
                      <div className="row ms-5 gy-2 mb-3" style={{ width: "90%" }}>
                      <div className="col-10">
                          <input
                          className="form-control form-control-sm rounded-3"
                          type="text"
                          placeholder="Enter Full Name"
                          aria-label="default input example"
                          {...register("doctorName", {
                              required: "Please Enter Your Name.",
                              pattern: {
                              value: /^[a-z A-Z]+$/,
                              message: "Enter Valid Name.",
                              },
                          })}
                          />
                          {errors.doctorName && (
                          <span className="text-danger">
                              {errors.doctorName.message}
                          </span>
                          )}
                      </div>
                      <div className="col-10">
                          <input
                          className="form-control form-control-sm rounded-3"
                          type="text"
                          placeholder="Contact No"
                          aria-label="default input example"
                          {...register("contactNo", {
                              required: "Please Enter Your Contact No.",

                              pattern: {
                              value: /^[0][1-9]\d{9}$|^[1-9]\d{9}$/,
                              message: "Enter Valid Contact Number.",
                              },
                          })}
                          />
                          {errors.contactNo && (
                          <span className="text-danger">
                              {errors.contactNo.message}
                          </span>
                          )}
                      </div>
                      <div className="col-10">
                          <input
                          className="form-control form-control-sm rounded-3"
                          type="text"
                          placeholder="Enter Email-ID [not mandatory]"
                          aria-label="default input example"
                          {...register("email", {
                              pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Enter Valid email-id.",
                              },
                          })}
                          />
                          {errors.email && (
                          <span className="text-danger">
                              {errors.email.message}
                          </span>
                          )}
                      </div>                    
                      <div className="col-10" >
                        <input
                            className="form-control form-control-sm rounded-3"
                            type="text"
                            placeholder="Enter Qualification"
                            aria-label="default input example"
                            {...register("qualification", {
                                required: "Please Enter Your Qualification.",
                            })}
                            />
                            {errors.qualification && (
                            <span className="text-danger">
                                {errors.qualification.message}
                            </span>
                            )}
                          {/*<select
                          className="form-select form-select-sm rounded-3"
                          aria-label="Default select example"
                          {...register("qualification", {
                              required: "Select One Option.",
                          })}
                          >
                          <option value="">Select Qualification</option>
                          <option value="MBBS">MBBS</option>
                          <option value="BAMS">BAMS</option>
                          <option value="BDS">BDS</option>
                          </select>
                          {errors.qualification && (
                          <span className="text-danger">
                              {errors.qualification.message}
                          </span>
                          )}*/}
                      </div>  
                      <div className="col-10" >
                        <select
                              className="form-select form-select-sm rounded-3"
                              aria-label="Default select example"
                              onChange={(e) =>  onSpecializationChange(e)}
                          >
                              {<option value="">Select Specialization</option>}
                              {(SpecializationData)?.map((option) => (
                                  <option selected={(SelectedSpecialization == option.sId) ? "active" : ""} key={option} value={option.sId} >
                                      {option.doctorSpecialization}
                                  </option>

                              ))}
                          </select>
                          {errors.medicineName && (
                              <span className="text-danger">
                                  {errors.medicineName.message}
                              </span>
                          )}
                      </div> 
                      <div className="col-10" >
                          <input
                              className="form-control form-control-sm rounded-3"
                              type="text"
                              placeholder="UserName"
                              aria-label="default input example"
                              {...register("userName", {
                                  required: "Please Enter UserName.",
                                  pattern: {
                                      value:/^[a-z A-Z 0-9]+$/,
                                      message: "Enter Valid Username.",
                                  },
                              })}
                              />
                              {errors.userName && (
                              <span className="text-danger">
                                  {errors.userName.message}
                              </span>
                          )}
                      </div> 
                      <div className="col-10" >
                        <table className="table borderless ">
                          <tr>
                            <td >
                                  <input
                                    className="form-control form-control-sm rounded-3"
                                    type={isShown ? "text" : "password"}
                                    placeholder="Password"
                                    title="7 to 15 characters which contain at least one numeric digit and a special character"
                                    aria-label="default input example"
                                    {...register("password", {
                                        required: "Please Enter Proper Password.",
                                        pattern: {
                                             value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
                                            //value:/^[a-z A-Z 0-9]+$/,
                                            message: "Enter Valid Password.",
                                        },
                                    })}
                                    />
                                    {errors.password && (
                                    <span className="text-danger">
                                        {errors.password.message}
                                    </span>
                                )}

                            </td>
                            <td style={{ align:'right' }}>
                              &nbsp;&nbsp;&nbsp;
                                <input
                                  id="checkbox"
                                  type="checkbox"
                                  checked={isShown}
                                  onChange={togglePassword}
                                  placeholder="Show password"
                                  title="Show Password?"
                                />
                                    </td>
                          </tr>
                        </table>
                        
                          
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
                <h5 className="text-center">List of Doctors</h5>
              </div>
              <div className="card-body patient-list-card-body" >
                <div className="row ms-5" style={{ width: "90%" }}>

                  <table className="table borderless">
                    <thead className="table-light ">
                      <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Contact No</th>
                        <th scope="col">Email-id</th>
                        <th scope="col">Specialization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DoctorData && DoctorData.map((item, i) => (
                        <tr key={i}>
                          <td className="capital">{i + 1}</td>
                          <td className="capital">Dr. {item.doctorName}</td>
                          <td>{item.contactNo}</td>
                          <td className="capital">{item.email}</td>
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
   {/* <Footer1 style={{width: '60%'}} /> */}
    
  </div>
);
}
