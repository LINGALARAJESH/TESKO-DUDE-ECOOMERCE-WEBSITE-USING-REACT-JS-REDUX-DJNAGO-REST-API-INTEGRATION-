import React from 'react'
import Features from '../../Components/Features/Features';
import Newcollection from '../../Components/Newcollection/Newcollection';
import Banners from '../../Components/Banners/Banners';

import Productbanner from '../../Components/Productbanner/Productbanner';

const Home = () => {
  window.scrollTo(0, 0);
  return (
    <>
    <Productbanner/>
    <Features/>
    <Newcollection/>
    <Banners/>

   </>
  )
}

export default Home