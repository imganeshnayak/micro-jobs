import React from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import BreadCrumbs from '../components/BreadCrumbs';
import Category from '../components/Category'



function JobCategory() {
    return (
      <>
    <div className="container-xxl bg-white p-0">

<Navbar/>
<BreadCrumbs
title="Category"
/>
<Category/>

<Footer/>


      </div>
      </>
    )}
    export default JobCategory;
