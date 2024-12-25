import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import SerachBar from '../components/SerachBar'
import Category from '../components/Category'
import About1 from '../components/About1'
import Jobs from '../components/Jobs'
import Testimonial from '../components/Testimonial'
function Home() {
  return (
    <div className="container-xxl bg-white p-0">
    {/* Spinner Start */}
    {/* Spinner End */}

    {/* Navbar Start */}
    <Navbar/>
    {/* Navbar End */}

    {/* Carousel Start */}
<Carousel/>
    
    {/* Carousel End */}

    {/* Search Start */}
  <SerachBar/>
    {/* Search End */}


    {/* Category Start */}
   <Category/>
    {/* Category End */}


    {/* About Start */}
   <About1/>
    {/* About End */}


    {/* Jobs Start */}
    <Jobs/>
    {/* Jobs End */}


    {/* Testimonial Start */}
    <Testimonial/>
    {/* Testimonial End */}
    

    {/* Footer Start */}
   <Footer/>
    {/* Footer End */}


    {/* Back to Top */}
    <a href="" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
</div>

)
}

export default Home