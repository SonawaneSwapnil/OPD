import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer1() {
    return (
        <div>
            <div className="container-fluid" style={{width: '94%'}}>
                <div className="row bg-dark mt-2 opd-site">
                    <div className="col-3">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className="nav-link text-white"
                                    aria-current="page">
                                    <div className="mt-1 fw-bold fs-6">Our Vision</div>
                                    <div className="fw-light mt-2">

                                        <div>To Bring Healthcare Of International</div>
                                        <div>Standard To This Region, To Evolve As A</div>
                                        <div>Premier Hospital In The Country And To</div>
                                        <div>TOUCH The Lives Of The People We Serve</div>
                                        <div>Through Excellence In Clinical Care,Quality</div>
                                        <div>And Commitment.</div>

                                    </div>
                                </Link>
                            </li>
                        </ul>

                    </div>
                    <div className="col-3">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className="nav-link text-white "
                                    aria-current="page">
                                    <div className="mt-1 fw-bold fs-6">Our Mission</div>
                                    <div className="fw-light mt-2">
                                        <div>To Provide Hope,Care And Cure.</div>
                                        <div>To Provide Compassionate,Accessible,High Quality,</div>
                                        <div>Cost Effective Healthcare To One All.</div>
                                        <div>To Work Continuously To Improve Medical Care To</div>
                                        <div>Sustain And Further Improve Clinical Outcomes,Patient,SafetyPatient Satisfaction.</div>
                                    </div>
                                </Link>
                            </li>
                        </ul>

                    </div>

                  {/*  <div className="col-1">
                        <div className="d-flex" style={{ height: "150px" }}>
                            <div className="vr bg-white mt-3"></div>
                        </div>
    </div>*/}

                    <div className="col-2">

                        <ul className="nav">
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className="nav-link text-white"
                                    aria-current="page">
                                    <div className="mt-1 fw-bold fs-6">Address:</div>
                                    <div className="fw-light mt-2">
                                        <div>Sai Seva Multispeciality Hospital,</div>
                                        <div>A/P : Korhale</div>
                                        <div>Taluka : Rahata,</div>
                                        <div>Dist : Ahmednagar 423107</div>
                                    </div>
                                </Link>
                            </li>
                        </ul>

                    </div>

                    <div className="col-2">

                        <ul className="nav">
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className="nav-link text-white"
                                    aria-current="page">
                                    <div className="mt-1 fw-bold fs-6">Contact Us:</div>
                                    <div className="fw-light mt-2">
                                        <div className='fw-bold'>Contact No-</div>
                                        <div>08888899151</div>
                                        <div className='fw-bold'>Email ID -</div>
                                        <div>saisevamultispecialityhospital@gmail.com</div>
                                    </div>

                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="font at-site">
                            <nav className="navbar ">
                                <div className="container-fluid">
                                    <ul className="nav">
                                        <li className="nav-item ">
                                            <Link to="/" className="nav-link logincolor fw-bold " aria-current="page">Technical Support</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link logincolor fw-bold">Terms Of Use</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link logincolor fw-bold">Privacy Policy</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link logincolor fw-bold text-center ms-5 ">ALL RIGHTS RESERVED @ SAI SEVA MULTISPECIALITY HOSPITAL</Link>
                                        </li>
                                    </ul>
                                    <form className="d-flex">
                                        <div className="nav-item mt-2">
                                            <Link to="/" className="nav-link logincolor fw-bold "><b>DEVELOPED BY ATJOIN PVT.LTD.</b></Link>
                                        </div>
                                    </form>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
