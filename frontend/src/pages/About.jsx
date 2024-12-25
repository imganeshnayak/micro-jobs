import React from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import BreadCrumbs from '../components/BreadCrumbs';



function About() {
  return (
    <>
   
    <div className="container-xxl p-0">
    <Navbar/>
    <BreadCrumbs
    title="About"/>
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
            <div className="row g-0 about-bg rounded overflow-hidden">
              <div className="col-6 text-start">
                <img className="img-fluid w-100" src="assets/img/about-1.jpg" alt="Professional team collaborating in a modern office" />
              </div>
              <div className="col-6 text-start">
                <img className="img-fluid" src="assets/img/about-2.jpg" alt="Technology innovation in the workplace" style={{ width: '85%', marginTop: '15%' }} />
              </div>
              <div className="col-6 text-end">
                <img className="img-fluid" src="assets/img/about-3.jpg" alt="Job seekers finding the right opportunities" style={{ width: '85%' }} />
              </div>
              <div className="col-6 text-end">
                <img className="img-fluid w-100" src="assets/img/about-4.jpg" alt="Connecting talented professionals with employers" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <h1 className="mb-4">Empowering Job Seekers and Employers to Connect and Thrive</h1>
            <p className="mb-4">
              Our platform is designed to help job seekers find the best job opportunities and allow employers to discover the right talent for their businesses. With a focus on connecting individuals with jobs that match their skills, experience, and passions, we aim to create a seamless recruitment process for both job seekers and employers.
            </p>
            <p><i className="fa fa-check text-primary me-3"></i>Discover a wide range of job opportunities</p>
            <p><i className="fa fa-check text-primary me-3"></i>Connect with talented professionals quickly and efficiently</p>
            <p><i className="fa fa-check text-primary me-3"></i>Build a brighter future through meaningful work</p>
            <a className="btn btn-primary py-3 px-5 mt-3" href="#">Learn More About Our Services</a>
          </div>
        </div>

      </div>
      <Footer/>

    </div>

  
  </>);
}

export default About;
