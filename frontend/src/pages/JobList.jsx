import React from 'react'
import Navbar from '../components/Navbar'
import Jobs from '../components/Jobs'
import BreadCrumbs from '../components/BreadCrumbs';
import Footer from '../components/Footer'

import SerachBar from '../components/SerachBar'


function JobList() {
  return (
    <div>
    <div className="container-xxl bg-white p-0">

      <Navbar/>
      <BreadCrumbs
      title="Jobs"
      />
      <SerachBar/>
      <Jobs/>
    <Footer/>

</div>


    </div>
  )
}

export default JobList