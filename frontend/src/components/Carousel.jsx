import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

const Carousel = () => {
  const options = {
    autoplay: true,
    smartSpeed: 3000,
    items: 1,
    dots: true,
    loop: true,
    nav: false,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  };

  return (
    <div className="container-fluid p-0">
      <OwlCarousel className="owl-theme header-carousel" {...options}>
        <div className="owl-carousel-item position-relative">
          <img className="img-fluid" src="/assets/img/carousel-1.jpg" alt="Carousel 1" />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
            style={{ background: "rgba(43, 57, 64, .5)" }}
          >
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-10 col-lg-8">
                  <h1 className="display-3 text-white animated slideInDown mb-4">
                    Find The Perfect Job That You Deserved
                  </h1>
                  <p className="fs-5 fw-medium text-white mb-4 pb-2">
                    Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no.
                    Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.
                  </p>
                  <a href="#" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">
                    Search A Job
                  </a>
                
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="owl-carousel-item position-relative">
          <img className="img-fluid" src="/assets/img/carousel-2.jpg" alt="Carousel 2" />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
            style={{ background: "rgba(43, 57, 64, .5)" }}
          >
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-10 col-lg-8">
                  <h1 className="display-3 text-white animated slideInDown mb-4">
                    Find The Best Startup Job That Fit You
                  </h1>
                  <p className="fs-5 fw-medium text-white mb-4 pb-2">
                    Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no.
                    Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.
                  </p>
               
                  <a href="#" className="btn btn-primary py-md-3 px-md-5 animated slideInRight">
                    Find A Talent
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OwlCarousel>
    </div>
  );
};

export default Carousel;
