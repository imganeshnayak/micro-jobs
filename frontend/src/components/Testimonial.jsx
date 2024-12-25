import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

const Testimonial = () => {
  const options = {
    autoplay: true,
    smartSpeed: 1000,
    loop: true,
    dots: true,
    nav: true, // Change to true if you want navigation arrows
    items: 2,   // Adjust as per the layout (e.g., 2 or 3 for multiple testimonials per slide)
  };

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <h1 className="text-center mb-5">Our Clients Say!!!</h1>
        <OwlCarousel className="owl-theme testimonial-carousel" {...options}>
          <div className="testimonial-item bg-light rounded p-4">
            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
            <div className="d-flex align-items-center">
              <img
                className="img-fluid flex-shrink-0 rounded"
                src="assets/img/testimonial-1.jpg"
                alt="Client 1"
                style={{ width: "50px", height: "50px" }}
              />
              <div className="ps-3">
                <h5 className="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
          <div className="testimonial-item bg-light rounded p-4">
            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
            <div className="d-flex align-items-center">
              <img
                className="img-fluid flex-shrink-0 rounded"
                src="assets/img/testimonial-2.jpg"
                alt="Client 2"
                style={{ width: "50px", height: "50px" }}
              />
              <div className="ps-3">
                <h5 className="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
          <div className="testimonial-item bg-light rounded p-4">
            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
            <div className="d-flex align-items-center">
              <img
                className="img-fluid flex-shrink-0 rounded"
                src="assets/img/testimonial-3.jpg"
                alt="Client 3"
                style={{ width: "50px", height: "50px" }}
              />
              <div className="ps-3">
                <h5 className="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
          <div className="testimonial-item bg-light rounded p-4">
            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
            <div className="d-flex align-items-center">
              <img
                className="img-fluid flex-shrink-0 rounded"
                src="assets/img/testimonial-4.jpg"
                alt="Client 4"
                style={{ width: "50px", height: "50px" }}
              />
              <div className="ps-3">
                <h5 className="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
};

export default Testimonial;
