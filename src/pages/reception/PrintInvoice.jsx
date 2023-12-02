import React from 'react';
import './PrintInvoice.css';
import Footer1 from './Footer1';
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function PrintInvoice() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("RecLogin");
        localStorage.removeItem("DocLogin");
        localStorage.removeItem("isRecLoggedIn");
        localStorage.removeItem("isDocLoggedIn");
        navigate("/");
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
    };
    return (

        <div>
            <div className="bgcolor">
                <div className="container-fluid">
                    <header className="secondpageheader">
                        <img
                            className="saiseva-logo"
                            src="./assets/images/logo.jpg"
                            style={{ width: "200px" }}
                            alt="logo"
                        />
                        <div className="logout">
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
                        <div className="row mx-3 ">
                            <div className="card main-card">
                                <div className="row ">
                                    <div className="row justify-content-end">
                                        <div className="col-8 col-lg-8 col-md-8">
                                            <div
                                                className="card-header patient-reg-card-header" //patient-list-card-header mt-4"
                                                style={{
                                                    display: "flex",
                                                    marginTop:"50px",
                                                    //justifyContent: "space-between",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <h5> Prescription </h5>
                                               
                                            </div>
                                        </div>
                                        <div className="col-2 col-lg-2 col-md-2">
                                            <div className="row mt-4">
                                                {" "}
                                                <button
                                                    type="button"
                                                    className="btn btn-primary  btn_print capital "
                                                    onClick={printInvoice}
                                                >
                                                    Print
                                                </button>{" "}
                                            </div>
                                            <div className="row mt-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary  btn_print "
                                                    onClick={() => navigate('/Patient')}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <Outlet />


                            </div>
                        </div>
                    </div>
                </div>
            </div>
           {/*} <Footer1 />*/}

        </div>

    )
}
