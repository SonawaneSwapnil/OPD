import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//import { Link } from "react-router-dom";
import "./PatientReg.css";
import Footer1 from "./Footer1";
import moment from 'moment'
//changes by jayashri on 8-9
import PatientModal from "./PatientModal.jsx";
import { toast } from "react-toastify";

//Patient methods-
export default function PatientReg() {
  const [PatientData, setPatientData] = useState();
  const [DoctorData, setDoctorData] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [filteredPatients, setFilterPatients] = useState([]);
  const [DoctorId, setDoctorId] = useState();
  const [Pname, setPname] = useState();
  const [PatientError,setPatientError] = useState([]);

  //changes by jayashri on 8-9
  const [PatientModalOpen, setPatientModalOpen] = useState(false);

  const [deleteReason, setDeleteReason] = useState();
  const [isDismiss, setIsDismiss] = useState();
  const [deleteData, setDeleteData] = useState();
  const [delreason, setdelreason] = useState();
  const [messagecolor,setmessagecolor] = useState();
  const [show, setshow] = useState(false);
  const [closepopup,setclosepopup] = useState();

  //const [selectedPatient, setSelectedPatient] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  useEffect(() => {
    loadAllPatientsData();
  }, []);

  //fetch data
  const loadAllPatientsData = () => {
    Service.getAllPatients()
      .then((res) => {
        setPatientData(res.data);
        setFilterPatients(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };


  const onDoctorPrint = (item) => {
    //console.log(item);
    setSelectedDoctor(item.dId);
    console.log(selectedDoctor);
    reset(item);
    setPatientData(item);
  };

  //update data
  const openEditModal = (item) => {
    console.log(item);
    reset(item);
    setPatientData(item);
  };

  //Assign control values
  const onPatientNameChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, patientName: value });
  }
  const oncontactNoChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, contactNo: value });
  }
  const onaddressChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, address: value });
  }
  const onemailChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, email: value });
  }
  const onbirthDateChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, birthDate: value });
  }
  const ongenderChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, gender: value });
  }
  const onweightChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, weight: value });
  }
  const onheightChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, height: value });
  }
  const onbloodGroupChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, bloodGroup: value });
  }

  const ondoctorOptionChange = (e) => {
    const value = e.target.value;
    setPatientData({ ...PatientData, dId: value });
  }

  //input field validation

 const validate = (data) => {
   // let input = this.state.input;
    const errors = {};
    let isValid = true;
    var pattern; 
  
    if (data.patientName == "") {
      isValid = false;
      errors["patientName"] = "Enter Patient Name.";
    }
  
    if (typeof data.patientName !== "undefined") {
      const regx = /^[a-z A-Z]+$/;
      if(!regx.test(data.patientName)){
          isValid = false;
          errors["patientName"] = "Enter Valid Patient Name.";
      }
    }
  
    if (data.address == "") {
      isValid = false;
      errors["address"] = "Enter Address.";
    }
  
    if (typeof data.address !== "undefined") {
      const regx = /^[a-z A-Z 0-9]+$/;
      if(!regx.test(data.address)){
          isValid = false;
          errors["address"] = "Enter Valid Address.";
      }
    }
    if (data.contactNo == "") {
      isValid = false;
      errors["contactNo"] = "Enter Contact No";
    }
  
    if (typeof data.contactNo !== "undefined") {
      const regx = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
      if(!regx.test(data.contactNo)){
          isValid = false;
          errors["contactNo"] = "Enter Valid(10-digit) Contact No";
      }
    }

   
    if (typeof data.email !== "undefined" && data.email != "") {
      const regx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if(!regx.test(data.email)){
          isValid = false;
          errors["email"] = "Enter Valid Email-ID";
      }
    }

    if (data.birthDate == "") {
      isValid = false;
      errors["birthDate"] = "Enter Current Age";
    }
    if (typeof data.birthDate !== "undefined") {
      const regx =  /\d+(?:[,.]\d+)?(?=\s*(?: yrs))/g;
      if(!regx.test(data.birthDate)){
          isValid = false;
          errors["birthDate"] = "Enter Valid Age";
      }
    }
   

    if (data.gender == "") {
      isValid = false;
      errors["gender"] = "Enter Gender.";
    }

    if (data.weight == "") {
      isValid = false;
      errors["weight"] = "Enter Weight(KG)";
    }
  
    if (typeof data.weight !== "undefined") {
      const regx =  /\d+(?:[,.]\d+)?(?=\s*(?:kg|KG))/g;
      if(!regx.test(data.weight)){
          isValid = false;
          errors["weight"] = "Enter weight in KG";
      }
    }

    if (data.bloodGroup == "") {
      isValid = false;
      errors["bloodGroup"] = "Enter BloodGroup";
    }
  
    if (typeof data.bloodGroup !== "undefined") {
      const regx = /^(A|B|AB|O)[+-]$/;
      if(!regx.test(data.bloodGroup)){
          isValid = false;
          errors["bloodGroup"] = "Enter Valid Blood Group";
      }
    }

    if (data.height == "") {
      isValid = false;
      errors["height"] = "Enter height(CM).";
    }

    if (typeof data.height !== "undefined") {
      const regx =  /\d+(?:[,.]\d+)?(?=\s*(?:cm|CM))/g;
      if(!regx.test(data.height)){
          isValid = false;
          errors["height"] = "Enter height in CM";
      }
    }
    setPatientError(errors);
    return isValid;
  }

  //Update changes in db
  const onSubmit = (e) => {
    const dFlag = 0;
    //console.log(data);
   // e.preventDefault();
    let valid = validate(PatientData);
      if(valid)
      {
        
          Service.updatePatients(PatientData.pId, dFlag, PatientData).then((res) => {
            console.log(res.data);
            //close popup and remove fade page
            document.getElementById("EditModal").classList.remove("show", "d-block");
            document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
            document.body.classList.remove("modal-open");
            document.body.style.overflow = "auto";
           alert('Data Updated successfully...');
           window.location.reload();
          });
    }

  };

  const ondoctorUpdate = (event) => {

    event.preventDefault();
    const dFlag = 1;
    Service.updatePatients(PatientData.pId, dFlag, PatientData).then((res) => {
      console.log(res.data);
      setIsDismiss("modal");
      localStorage.setItem("PatientID", PatientData.pId);
      setSelectedDoctor('');
      navigate("/print");
    });

  };

  //delete data
  const onDelete = () => {
    var data = {
      pId: deleteData.pId,
      deleteReason: deleteReason,
    };

    console.log(data);
    if (deleteReason) {
      Service.deleteRecord(data)
        .then((res) => {
         // setdelreason("Record Successfully Deleted...");
         // setmessagecolor("text-success ms-3");
          alert('Record Successfully Deleted...');
          document.getElementById("DeleteModal").classList.remove("show", "d-block");
          document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "auto";
          window.location.reload();
          //loadAllPatientsData();
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setdelreason("Please Enter Delete Reason.");
      setmessagecolor("text-danger ms-3");
    }
  };

  const openDeleteModal = (item) => {
    setDeleteData(item);
  };

  const CloseDel = () => {
    setIsDismiss("modal");
    loadAllPatientsData();
    setdelreason("");
  }
  //Doctor method-

  useEffect(() => {
    loadAllDoctorData();
  }, []);

  const loadAllDoctorData = () => {
    Service.getAllDoctor()
      .then((res) => {
        if (res.data && res.data.length) {
          setDoctorData(res.data);
          setSelectedDoctor(res.data[0].dId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onchange = (item) => {
    setSelectedDoctor(item.dId);
    console.log(item);
    // reset();
    Service.getAllPatientsByDoctor(item.dId).then((res) => {
      console.log(item);
      setPatientData(res.data);
      setFilterPatients(res.data);
    });
  };
  //print icon
  const onPrint = (event) => {
    event.preventDefault();
    const dFlag = 1;
    Service.updatePatients(PatientData.pId, dFlag, PatientData).then((res) => {
        console.log(res.data);
        setIsDismiss("modal");
        localStorage.setItem("PatientID", PatientData.pId);
        setSelectedDoctor('');
        navigate("/print");
    });
  };
  //search filter

  const handleSearchPatients = (event) => {
    const text = event.target.value;
    if (text) {
      const filtered = PatientData.filter((item) =>
        item.patientName.toLowerCase().includes(text.toLowerCase()) ||
        item.contactNo.toLowerCase().includes(text.toLowerCase())

      );
      setFilterPatients(filtered);
    } else {
      setFilterPatients(PatientData);
    }
  };

  const logout = () => {
    localStorage.removeItem("RecLogin");
    localStorage.removeItem("DocLogin");
    localStorage.removeItem("isRecLoggedIn");
    localStorage.removeItem("isDocLoggedIn");
    navigate("/");
  };

  const onDeleteReasonChange = (reason) => {
    if (reason) {
      setDeleteReason(reason);
      setdelreason("");
    }
  };

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
              onClick={() => navigate("/SearchPatient")}
            >
              Search Patient
            </button>
            <button
              type="button"
              className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
              onClick={() => navigate("/patient")}
            >
              Patient Registration
            </button>
            <button
              type="button"
              className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
              onClick={() => navigate("/billing")}
            >
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
            <div className="col-md-12">
              <div className="card patient-reg-card">
                <div
                  className="card-header patient-list-card-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6>List of Patient</h6>
                  <div className="input-group input-group-sm input-patient-search">
                    <input
                      type="text"
                      className="form-control search-patient"
                      aria-label="patient-search"
                      aria-describedby="patient-search-sm"
                      placeholder="Search Patient"
                      onChange={handleSearchPatients}
                    />
                    <span>
                      <i className="bi bi-search"></i>
                    </span>
                  </div>
                </div>

                <div className="card-body patient-list-card-body">
                  {/* <div className="row gx-1 gy-1" style={{ width: "100%" }}>
                    {DoctorData &&
                      DoctorData.map((item, i) => (
                        <div className="col-3 col-md-3">
                          <div
                            className={`btn-doctors-tabs ${
                              selectedDoctor === item.dId ? "active" : ""
                            } `}
                            key={i}
                            onClick={() => onchange(item)}
                          >
                            {item.doctorName}
                          </div>
                        </div>
                      ))}
                  </div> */}

                  <table className="table borderless ">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Sr.No</th>
                        <th scope="col">Date</th>
                        <th scope="col">Patient Id</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Contact No.</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients &&
                        filteredPatients.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td className="capital">{moment(item.createdDate).format('DD/MM/YYYY')}</td>
                            <td className="capital">{item.pId}</td>
                            <td className="capital">{item.patientName}</td>
                            <td className="capital">
                              {item.doctorName}
                            </td>
                            <td>{item.contactNo}</td>
                            <td>
                              <i
                                onClick={() => openEditModal(item)}
                                className="bi bi bi-pencil-square ms-2 me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#EditModal"
                              ></i>

                              <i
                                onClick={() => onDoctorPrint(item)}
                                className="bi bi-printer me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#DoctorModal"
                              ></i>

                              <i
                                onClick={() => openDeleteModal(item)}
                                className="bi bi-trash3"
                                data-bs-toggle="modal"
                                data-bs-target="#DeleteModal"
                              ></i>
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
     {/*} <Footer1 style={{ width: '93%' }} />*/}

      <div
        class="modal fade"
        id="DoctorModal"
        tabindex="-1"
        aria-labelledby="DoctorModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header patient-reg-card-header">
              <h5 class="modal-title" id="DoctorModalLabel">
                Consult another Doctor ?
              </h5>
            </div>
            <div class="patient-reg-card-body">
              <div className="row gy-2 gx-0" style={{ width: "100%" }}>
                <div className="col-12">
                  <div >
                    <div
                      className="col-10 "
                      style={{ display: "flex" }}
                    >
                      <label className="Doctor-label col-4">Doctor Name : </label>
                      <select
                        className="form-select form-select-sm rounded-3"
                        aria-label="Default select example"
                        onChange={(event) => ondoctorOptionChange(event)}
                      >
                        {<option value="">Select Doctor</option>}
                        {(DoctorData)?.map((option) => (
                          <option selected={selectedDoctor === option.dId ? "active" : ""} key={option} value={option.dId}>
                            {option.doctorName}
                          </option>

                        ))}
                      </select>

                    </div>
                    <br />
                    <div className="col-12">
                      <div
                        className="row gx-2 gy-2"
                        style={{ width: "100%" }}
                      >
                        <div className="col-6 d-grid gap-2">
                          <button
                            className="btn btn-primary btn-registration-form"
                            type="button"
                            data-bs-dismiss="modal"
                            onClick={(event) => ondoctorUpdate(event)}
                          >
                            Change Doctor
                          </button>
                        </div>
                        <div className="col-6 d-grid gap-2">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={(event) => onPrint(event)}
                          >
                            Print
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
      </div>


      <div
        class="modal fade"
        id="EditModal"
        tabindex="-1" show={show}
        aria-labelledby="EditModalLabel"        
        aria-hidden="true"
        
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header patient-reg-card-header">
              <h5 class="modal-title" id="EditModalLabel">
                Update Patient Details
              </h5>
            </div>
            <div class="patient-reg-card-body">
              <div className="row gy-2 gx-0" style={{ width: "100%" }}>
                <div className="col-12">
                  <input
                    className="form-control form-control-sm ps-3 rounded-3"
                    type="text"
                    placeholder="Enter Full Name"
                    aria-label="default input example"
                    required="true"

                    {...register("patientName", {
                      required: "please enter your name.",
                      pattern: {
                        value: /^[a-z A-Z]+$/,
                        message: "Enter valid Name",
                      },
                      onChange: e => onPatientNameChange(e)
                    })}
                  />
                    <span className="text-danger">
                      {PatientError.patientName}
                    </span>
                </div>
                <div className="col-12">
                  <input
                    className="form-control form-control-sm ps-3 rounded-3"
                    type="text"
                    placeholder="Address"
                    aria-label="default input example"
                    required="true"
                    {...register("address", {
                      required: "please enter your address.",
                      pattern: {
                        value: /^[a-z A-Z 0-9]+$/,
                        message: "Enter valid Address",
                      },
                      onChange: e => onaddressChange(e)
                    })}
                  />
                    <span className="text-danger">
                      {PatientError.address}
                    </span>
                </div>
                <div className="col-12">
                  <input
                    className="form-control form-control-sm ps-3 rounded-3"
                    type="text"
                    placeholder="Conatct No"
                    aria-label="default input example"
                    required="true"
                    {...register("contactNo", {
                      required: "please enter your contactNo.",

                      pattern: {
                        value: /^[0][1-9]\d{9}$|^[1-9]\d{9}$/,
                        message: "Enter valid Contact Number",
                      },
                      onChange: e => oncontactNoChange(e)
                    })}
                  />
                    <span className="text-danger">
                      {PatientError.contactNo}
                    </span>
                </div>
                <div className="col-12">
                  <input
                    className="form-control form-control-sm ps-3 rounded-3"
                    type="text"
                    placeholder="Enter Email ID [not mandatory]"
                    aria-label="default input example"
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Enter valid email",
                      },
                      onChange: e => onemailChange(e)
                    })}
                  />
                    <span className="text-danger">
                      {PatientError.email}
                    </span>
                </div>
                <div className="col-12">
                  <input
                    className="form-control form-control-sm ps-3 rounded-3"
                    type="text"
                    placeholder="Current Age"
                    aria-label="default input example"
                    {...register("birthDate", {
                      required: "Please Enter Current Age",
                      pattern: {
                        value: /\d+(?:[,.]\d+)?(?=\s*(?: yrs))/g,
                        message: "Enter Valid Age. (e.g. 0.3 yrs)",
                      },
                      onChange: e => onbirthDateChange(e)
                    })}
                  />

                    <span className="text-danger">
                      {PatientError.birthDate}
                    </span>
                </div>
                <div className="col-12">
                  <div className="row gx-2 gy-2">
                    <div
                      className="col-6 col-md-6"
                      style={{ display: "flex" }}
                    >
                      <label className="gender-label">Gender</label>
                      <select
                        className="form-select form-select-sm rounded-3"
                        aria-label="Default select example"
                        required="true"
                        {...register("gender", {
                          required: "Select one option.",

                          onChange: e => ongenderChange(e)
                        })}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                        <span className="text-danger">
                          {PatientError.gender}
                        </span>
                    </div>

                    <div className="co-6 col-md-6">
                      <input
                          className="form-control form-control-sm rounded-3"
                          type="text"
                          placeholder="Blood Group"
                          aria-label="default input example"
                          required="true"
                          {...register("bloodGroup", {
                            required: "please enter your bloodGroup.",
                            onChange: e => onbloodGroupChange(e),
                            pattern: {
                              value: /^(A|B|AB|O)[+-]$/,
                              message: "Enter valid Blood Group",
                            },
                          })}
                        />
                          <span className="text-danger">
                            {PatientError.bloodGroup}
                          </span>
                      {/*<input
                        className="form-control form-control-sm rounded-3"
                        type="text"
                        placeholder="Enter Weight"
                        aria-label="default input example"
                        //required="true"
                        {...register("weight", {
                          pattern: {
                            value: /\d+(?:[,.]\d+)?(?=\s*(?:kg|KG))/g,
                            message: "Enter weight in KG",
                          },
                          //required: "please enter your weight.",

                          onChange: e => onweightChange(e)
                        })}
                      />
                        <span className="text-danger">
                          {PatientError.weight}
                        </span>*/}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row gx-2 gy-2">
                    <div className="co-6 col-md-6">
                      
                    </div>
                    <div className="co-6 col-md-6">
                     {/*} <input
                        className="form-control form-control-sm rounded-3"
                        type="text"
                        placeholder="Enter Height(cm)"
                        aria-label="default input example"
                        required="true"
                        {...register("height", {
                          pattern: {
                            value: /\d+(?:[,.]\d+)?(?=\s*(?:cm|CM))/g,
                            message: "Enter weight in CM",
                          },

                          onChange: e => onheightChange(e)
                        })}
                      />
                        <span className="text-danger">
                          {PatientError.height}
                        </span>*/}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div
                    className="row gx-2 gy-2"
                    style={{ width: "100%" }}
                  >
                    <div className="col-6 d-grid gap-2">
                      <button
                        className="btn btn-primary btn-registration-form"
                        type="button"
                        //data-bs-dismiss="modal"
                        onClick={e => onSubmit(e)}
                       // data-bs-dismiss="modal"
                      // onClick={ () => { this.form.dispatchEvent(new Event('submit',{ cancelable: true })) } }                                      
                      >
                        Update
                      </button>
                    </div>
                    <div className="col-6 d-grid gap-2">
                      <button
                        type="reset"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div
        class="modal fade"
        id="DeleteModal"
        tabindex="-1"

        aria-labelledby="DeleteModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="DeleteModalLabel">
                You Want To Delete. ?
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control  rounded-4"
                placeholder="Please Enter Delete Reason"
                {...register("deleteReason", {
                  required: "Please Enter Your Reason.",
                  pattern: {
                    value: /^[a-z A-Z 0-9]+$/,
                    message: "Enter Valid Reason",
                  },
                  onChange: (e) => onDeleteReasonChange(e.target.value)
                })}
              />
              {errors.deleteReason && (
                <span className="text-danger">
                  {errors.deleteReason.message}
                </span>
              )}
              <label className={messagecolor} id="delreasonmsg" >{delreason}</label>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                
                // data-bs-dismiss="modal"
                onClick={onDelete}

              >
                Delete
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={CloseDel}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
