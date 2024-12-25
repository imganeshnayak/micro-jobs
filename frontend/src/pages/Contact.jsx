import React from 'react';
import Navbar from '../components/Navbar';
import BreadCrumbs from '../components/BreadCrumbs';
import Footer from '../components/Footer';


function Contact() {
  return (
    <div>
      <Navbar />
      <BreadCrumbs title="Contact Us " />

      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Contact For Any Query
          </h1>
          <p className="text-center mb-5">
            Our platform is dedicated to helping you find people for any type of microjobs nearby. Reach out to us for more details or any assistance.
          </p>
          <div className="row g-4">
            <div className="col-12">
              <div className="row gy-4">
                <div className="col-md-4 wow fadeIn" data-wow-delay="0.1s">
                  <div className="d-flex align-items-center bg-light rounded p-4">
                    <div
                      className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3"
                      style={{ width: '45px', height: '45px' }}
                    >
                      <i className="fa fa-map-marker-alt text-primary"></i>
                    </div>
                    <span>Udupi, Karnataka, India</span>
                  </div>
                </div>
                <div className="col-md-4 wow fadeIn" data-wow-delay="0.3s">
                  <div className="d-flex align-items-center bg-light rounded p-4">
                    <div
                      className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3"
                      style={{ width: '45px', height: '45px' }}
                    >
                      <i className="fa fa-envelope-open text-primary"></i>
                    </div>
                    <span>info@microjobsplatform.com</span>
                  </div>
                </div>
                <div className="col-md-4 wow fadeIn" data-wow-delay="0.5s">
                  <div className="d-flex align-items-center bg-light rounded p-4">
                    <div
                      className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3"
                      style={{ width: '45px', height: '45px' }}
                    >
                      <i className="fa fa-phone-alt text-primary"></i>
                    </div>
                    <span>+91 98765 43210</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <iframe
                className="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.123456789!2d74.74643357612345!3d13.339168400000067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcabcdef123456%3A0xabcdef123456789!2sUdupi%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1670000000000!5m2!1sen!2sin"
                frameBorder="0"
                style={{ minHeight: '400px', border: '0' }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
            <div className="col-md-6">
              <div className="wow fadeInUp" data-wow-delay="0.5s">
                <p className="mb-4">
                  The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code, and you're done.{' '}
                  <a href="https://htmlcodex.com/contact-form">Download Now</a>.
                </p>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          placeholder="Subject"
                        />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a message here"
                          id="message"
                          style={{ height: '150px' }}
                        ></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      <Footer/>

      </div>

    </div>
  );
}

export default Contact;
