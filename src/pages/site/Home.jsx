import React from 'react'
import { Link } from 'react-router-dom'
import Footer1 from '../reception/Footer1'
import './Home.css'
export default function Home() {

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

                  <Link to="./RecLogin" className="mt-4 mx-3 logincolor text-decoration-none">Reception Login</Link>
                 {/* <Link to="./DocLogin" className="mt-4 mx-3 logincolor text-decoration-none">Doctor Login</Link>*/}
                  <Link to="./AdminLogin" className="mt-4 mx-3 logincolor text-decoration-none">Admin Login</Link>

                </div>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-3 col-sm-3 col-md-6 col-lg-6 col-xl-6">
              <div className="mx-5 picture">
                <img src="assets/img/bg-nurse-image-new.png" />
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="mt-5 font text-center split mx-5">
                <h1>GET THE BEST</h1>
                <h1>HEALTHCARE</h1>
                <h1>EXPERIENCE, WITHOUT</h1>
                <h1>HAVING TO LEAVE</h1>
                <h1>HOME</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  )
}

