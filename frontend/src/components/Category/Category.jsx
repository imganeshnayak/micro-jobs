import React from 'react';
import './Category.css'; // Import CSS for styling

function Category() {
  return (
    <div>
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Explore By Category
          </h1>
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <a className="cat-item rounded p-4 glowing-border" href="">
                <i className="fa fa-3x fa-seedling text-primary mb-4"></i>
                <h6 className="mb-3">Agriculture</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <a className="cat-item rounded p-4 glowing-border" href="">
                <i className="fa fa-3x fa-laptop-code text-primary mb-4"></i>
                <h6 className="mb-3">Technology</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <a className="cat-item rounded p-4 glowing-border" href="">
                <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
                <h6 className="mb-3">Human Resource</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <a className="cat-item rounded p-4 glowing-border" href="">
                <i className="fa fa-3x fa-tasks text-primary mb-4"></i>
                <h6 className="mb-3">Project Management</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <a className="cat-item rounded p-4 glowing-border" href="">
                <i className="fa fa-3x fa-chart-line text-primary mb-4"></i>
                <h6 className="mb-3">Business Development</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <a className="cat-item rounded p-4 glowing-border" href="">
                <i className="fa fa-3x fa-hands-helping text-primary mb-4"></i>
                <h6 className="mb-3">Sales & Communication</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <a className="cat-item rounded p-4 glowing-border" href="">
                <i className="fa fa-3x fa-book-reader text-primary mb-4"></i>
                <h6 className="mb-3">Teaching & Education</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <a className="cat-item rounded p-4 glowing-border" href="">
                <i className="fa fa-3x fa-drafting-compass text-primary mb-4"></i>
                <h6 className="mb-3">Design & Creative</h6>
                <p className="mb-0">123 Vacancy</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
