import React, { useEffect, useState } from "react";
import Service from "../../services/Service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./PatientReg.css";
import Footer1 from "./Footer1";
import moment from "moment";
import { toast } from "react-toastify";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

//Patient methods-
export default function PatientReg() {
  const [PatientData, setPatientData] = useState();
  const [DoctorData, setDoctorData] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [filteredPatients, setFilterPatients] = useState([]);
  const [pid, setPid] = useState();

  const [deleteReason, setDeleteReason] = useState();
  const [isDismiss, setIsDismiss] = useState();
  const [deleteData, setDeleteData] = useState();

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

  //menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //fetch data
  const loadAllPatientsData = () => {
    Service.getAllPatients()
      .then((item) => {
        Service.getAllPatientsByDoctor(item.data[0].dId).then((res) => {
          // console.log(item);
          setPatientData(res.data);
          setFilterPatients(res.data);
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (data) => {
    console.log(isUpdate);
    const formData = { ...data, dId: selectedDoctor, isDeleted: "false" };
    if (!isUpdate) {
      Service.savePatients(formData)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("PatientID", JSON.stringify(res.data.pId));

          toast.success("Data saved successfully...");
          navigate("/print");
        })
        .catch((error) => {
          toast.error("Patient already present in the system...");
        });
    } else {
      const dFlag = 0;
      Service.updatePatients(pid, dFlag, data).then((res) => {
        console.log(res.data);

        localStorage.setItem("PatientID", pid);
        toast.success("Data Updated successfully...");
        navigate("/print");
        reset({
          patientName: "",
          contactNo: "",
          address: "",
          email: "",
          birthDate: "",
          gender: "",
          weight: "",
          height: "",
          bloodGroup: "",
        });
        setIsUpdate(false);
        loadAllPatientsData();
      });
    }
  };

  //update data
  const onEdit = (item) => {
    console.log(item);
    reset(item);
    setIsUpdate(true);
    setPid(item.pId);
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
          setIsDismiss("modal");
          toast.success("Record Deleted Successfully...");
          loadAllPatientsData();
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.warning("Please enter delete reason...");
    }
  };

  const openDeleteModal = (item) => {
    setDeleteData(item);
  };

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
  const onPrint = (item) => {
    localStorage.setItem("PatientID", item.pId);
    navigate("/print");
  };
  //search filter

  const handleSearchPatients = (event) => {
    const text = event.target.value;
    if (text) {
      const filtered = PatientData.filter(
        (item) =>
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
    } else alert("Please Write reason");
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
              className="btn  backgroundcolor ms-2 me-2 text-white rounded-2"
              onClick={() => navigate("/SearchPatient")}
            >
              Search Patient
            </button>
            <button
              type="button"
              className="btn  backgroundcolor ms-2 me-2 text-white rounded-2"
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
            <Button
              className="btn backgroundcolor ms-2 me-2 text-white rounded-2"
              aria-controls="simple-menu"
              style={{ textTransform: "none" }}
              aria-haspopup="true"
              onClick={handleClick}
            >
              Daily Reports
            </Button>
            <Menu
              keepMounted
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
            >
              <MenuItem
                style={{ backgroundColor: "#412d91" }}
                className="text-white"
                onClick={() => navigate("/DailyReports")}
              >
                Daily
              </MenuItem>
              <MenuItem
                style={{ backgroundColor: "#412d91" }}
                className="text-white"
                onClick={() => navigate("/DailyReports")}
              >
                Monthly
              </MenuItem>
              <MenuItem
                style={{ backgroundColor: "#412d91" }}
                className="text-white"
                onClick={() => navigate("/DailyReports")}
              >
                Quarterly
              </MenuItem>
              <MenuItem
                style={{ backgroundColor: "#412d91" }}
                className="text-white"
                onClick={() => navigate("/DailyReports")}
              >
                Yearly
              </MenuItem>
            </Menu>
            {/*} <button
              type="button"
              className="btn backgroundcolor me-4 text-white rounded-2"
              onClick={() => navigate("/DailyReports")}
            >
              Daily Reports
            </button>*/}
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
            <div className="col-md-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card patient-reg-card">
                  <div
                    className="card-header patient-reg-card-header"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h5>New Patient Registration Form</h5>
                  </div>
                  <div className="card-body patient-reg-card-body">
                    <div className="row gx-1 gy-1" style={{ width: "100%" }}>
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
                              Dr. {item.doctorName}
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="row gy-2 gx-0" style={{ width: "100%" }}>
                      <div className="col-12">
                        <input
                          className="form-control form-control-sm ps-3 rounded-3"
                          type="text"
                          placeholder="Enter Full Name"
                          aria-label="default input example"
                          {...register("patientName", {
                            required: "Please Enter Your Name.",
                            pattern: {
                              value: /^[a-z A-Z]+$/,
                              message: "Enter Valid Name.",
                            },
                          })}
                        />
                        {errors.patientName && (
                          <span className="text-danger">
                            {errors.patientName.message}
                          </span>
                        )}
                      </div>
                      <div className="col-12">
                        <input
                          className="form-control form-control-sm ps-3 rounded-3"
                          type="text"
                          placeholder="Address"
                          aria-label="default input example"
                          {...register("address", {
                            required: "Please Enter Your Address.",
                          })}
                        />
                        {errors.address && (
                          <span className="text-danger">
                            {errors.address.message}
                          </span>
                        )}
                      </div>
                      <div className="col-12">
                        <input
                          className="form-control form-control-sm ps-3 rounded-3"
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
                      <div className="col-12">
                        <input
                          className="form-control form-control-sm ps-3 rounded-3"
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
                      <div className="col-12">
                        <input
                          className="form-control form-control-sm ps-3 rounded-3"
                          type="text"
                          placeholder="Age"
                          aria-label="default input example"
                          {...register("birthDate", {
                            required: "Please Enter Current Age",
                            pattern: {
                              value: /^[0-9\b]+$/,
                              message: "Enter only numbers",
                            },
                          })}
                        />
                        {errors.birthDate && (
                          <span className="text-danger">
                            {errors.birthDate.message}
                          </span>
                        )}
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
                              {...register("gender", {
                                required: "Select One Option.",
                              })}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                            {errors.gender && (
                              <span className="text-danger">
                                {errors.gender.message}
                              </span>
                            )}
                          </div>
                          <div className="co-6 col-md-6">
                            <input
                              className="form-control form-control-sm rounded-3"
                              type="text"
                              placeholder="Blood Group"
                              aria-label="default input example"
                              {...register("bloodGroup", {
                                required: "Please Enter Your BloodGroup.",
                                pattern: {
                                  value: /^(A|B|AB|O)[+-]$/,
                                  message: "Enter Valid Blood Group.",
                                },
                              })}
                            />
                            {errors.bloodGroup && (
                              <span className="text-danger">
                                {errors.bloodGroup.message}
                              </span>
                            )}
                          </div>
                          {/*} <div className="co-6 col-md-6">
                            <input
                              className="form-control form-control-sm rounded-3"
                              type="text"
                              placeholder="Enter Weight"
                              aria-label="default input example"
                              {...register("weight", {
                                pattern: {
                                  value: /\d+(?:[,.]\d+)?(?=\s*(?:kg|KG))/g,
                                  message: "Enter weight in KG",
                                },
                              })}
                            />
                            {errors.weight && (
                              <span className="text-danger">
                                {errors.weight.message}
                              </span>
                            )}
                            </div>*/}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="row gx-2 gy-2">
                          {/* <div className="co-6 col-md-6">
                            <input
                              className="form-control form-control-sm rounded-3"
                              type="text"
                              placeholder="Blood Group"
                              aria-label="default input example"
                              {...register("bloodGroup", {
                                required: "please enter your bloodGroup.",
                                pattern: {
                                  value: /^(A|B|AB|O)[+-]$/,
                                  message: "Enter valid Blood Group",
                                },
                              })}
                            />
                            {errors.bloodGroup && (
                              <span className="text-danger">
                                {errors.bloodGroup.message}
                              </span>
                            )}
                          </div>
                          <div className="co-6 col-md-6">
                            <input
                              className="form-control form-control-sm rounded-3"
                              type="text"
                              placeholder="Enter Height(cm)"
                              aria-label="default input example"
                              {...register("height", {
                                required: "please enter your height.",
                                pattern: {
                                  value: /\d+(?:[,.]\d+)?(?=\s*(?:cm|CM))/g,
                                  message: "Enter weight in CM",
                                },
                              })}
                            />
                            {errors.height && (
                              <span className="text-danger">
                                {errors.height.message}
                              </span>
                            )}
                            </div>*/}
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
                              type="submit"
                            >
                              Save and Print
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
                </div>
              </form>
            </div>

            <div className="col-md-7">
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
                  <div className="row gx-1 gy-1" style={{ width: "100%" }}>
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
                            Dr. {item.doctorName}
                          </div>
                        </div>
                      ))}
                  </div>

                  <table className="table borderless ">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Sr. No</th>
                        <th scope="col">Date</th>
                        <th scope="col">Patient Id</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Contact No.</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients &&
                        filteredPatients.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>

                            <td className="capital">
                              {moment(item.createdDate).format("DD/MM/YYYY")}
                            </td>
                            <td className="capital">{item.pId}</td>
                            <td className="capital">{item.patientName}</td>
                            <td>{item.contactNo}</td>
                            <td>
                              <i
                                onClick={() => onEdit(item)}
                                className="bi bi-pencil-square ms-2 me-2"
                              ></i>

                              <i
                                onClick={() => onPrint(item)}
                                className="bi bi-printer me-2"
                              ></i>

                              <i
                                onClick={() => openDeleteModal(item)}
                                className="bi bi-trash3"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
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
      {/* <Footer1 style={{width: '93%'}} /> */}
      <br />
      <br />
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                You want to delete. ?
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
                placeholder="Please enter delete reason"
                onChange={(e) => onDeleteReasonChange(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onDelete}
              >
                Delete
              </button>
              <button
                type="button"
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
  );
}
