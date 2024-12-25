import React from 'react'
import Navbar from '../components/Navbar'
import Jobs from '../components/Jobs'
import BreadCrumbs from '../components/BreadCrumbs';
import Footer from '../components/Footer'



function JobList() {
  return (
    <div>
    <div className="container-xxl bg-white p-0">

      <Navbar/>
      <BreadCrumbs
      title="Jobs"
      />
      <Jobs/>
    <Footer/>

</div>


    </div>
  )
}

export default JobList