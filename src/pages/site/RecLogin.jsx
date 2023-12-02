import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../services/Service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Footer1 from "../reception/Footer1";
import "./Home.css";
import { toast } from "react-toastify";

export default function RecLogin() {
  //display current date and time:
  const navigate = useNavigate();
  const [dateState, setDateState] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {   
    setInterval(() => setDateState(new Date()), 1000); 
    LoadSignInPatient();
  }, []);


  const LoadSignInPatient = () => {
    const Recdata= JSON.parse(localStorage.getItem("RecLogin"));
    const CheckPatient = JSON.parse(localStorage.getItem("isRecLoggedIn"));
    if(Recdata == null && CheckPatient== null)
    {
      navigate("/RecLogin");
    }
    else
    {
      //const CheckPatient = JSON.parse(localStorage.getItem("isRecLoggedIn"));
      if(CheckPatient == true && Recdata != '')
          navigate("/Patient");
      else
        navigate("/RecLogin");
      
    }
  }

  //Keep me sign in
  const [Checked, setChecked] = useState(false);

  const KeepSignedIn = () => {
       setChecked(!Checked);
       localStorage.setItem("isRecLoggedIn",true);
  };

  //reception login:
  const loginData = (data) => {
    Service.loginReception(data).then((res) => {
      console.log(res.data);
      if (res.data) {
        localStorage.setItem("RecLogin",JSON.stringify(res.data));
        
        navigate("/Patient");
      } else {
        toast.error('Please enter valid Username and Password.');
      }
    });
  };

  const ResetFunc = () =>{
    localStorage.removeItem("RecLogin");
    localStorage.removeItem("isRecLoggedIn");
    this.form.userName='';
    this.form.password='';
    navigate("/");
  }


  return (
    <div>
      <div className="bgcolor">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <nav className="navbar navbar-light">
                <Link className="navbar-brand mt-3 ms-4" to="#">
                  <img src="assets/img/logo.jpg" width="80%" height="65%" />
                </Link>
                <div className="d-flex">
                  <Link to="../RecLogin" className="mt-4 mx-3 logincolor fs-6 fw-bold">
                    Reception Login
                  </Link>
                 {/* <Link
                    to="../DocLogin"
                    className="mt-4 mx-3 logincolor text-decoration-none"
                  >
                    Doctor Login
                 </Link>*/}
                  <Link
                    to="../AdminLogin"
                    className="mt-4 mx-3 logincolor  text-decoration-none"
                  >
                  Admin Login
                  </Link>
                </div>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div className="mx-5 picture">
                <img src="assets/img/bg-nurse-image-new.png" />
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <form onSubmit={handleSubmit(loginData)}>
                <div className="font">
                  <div className="col-8 mx-3">
                    <div className="RecLogin">
                      <h4 className="text-center logincolor fw-bold ms-5">
                         {dateState.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                      </h4>
                      {/* <hr className="line" /> */}

                      <h4 className="text-center logincolor fw-bold ms-5">
                        {dateState.toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            second:'numeric',
                            hour12: true,
                        })}
                      </h4>
                    </div>

                    <button
                      type="button"
                      className="btn btn-lg backgroundcolor text-white mt-5 mx-5 w-100 rounded-0 p-2 fw-bold fs-2 fw-bold"
                    >
                      Reception Login
                    </button>
                    <form autoComplete="off">
                      <input
                        type="text"
                        className="form-control text-center mt-5 p-2 fs-6 mx-5 bgcolor"
                        placeholder="ENTER LOGIN CODE"
                        {...register("userName", {
                          required: "Please Enter User Name",
                        })}
                      />
                      {errors.userName && (
                        <div className="text-danger mx-5">
                          {errors.userName.message}
                        </div>
                      )}

                      <input
                        type="password"
                        className="form-control text-center mt-3 p-2 fs-6 mx-5 bgcolor"
                        placeholder="ENTER PASSWORD"
                        {...register("password", {
                          required: "Please Enter Password",
                        })}
                      />
                      {errors.password && (
                        <div className="text-danger mx-5">
                          {errors.password.message}
                        </div>
                      )}
                    </form>
                    <div className="mt-3 is">
                      
                        <div className="mt-4 mx-5 logincolor">
                            <label className="mx-3 text-dark fs-4">
                              <input type="checkbox" className="mt-3 p-2 mx-3" checked={ Checked} onChange={ KeepSignedIn } />
                              Keep me sign in
                            </label>
                        </div>                    
                    </div>
                    
                  </div>
                  <div className="col-10 mx-3">
                   <button
                        type="Submit"
                        className="btn  backgroundcolor text-white ms-5 mt-5 w-35 btn-lg right"
                        style={{width:"40%"}}>
                        Login
                      </button>

                      <button
                         type="reset"
                         className="btn mt-5  border w-30 ms-2 btn-lg text-center"
                          onclik={ ResetFunc }
                          style={{width:"38%"}}
                      >
                        CANCEL
                      </button>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
