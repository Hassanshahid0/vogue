import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import Topbarber from '../components/Topbarber'
import Banner from '../components/Banner'
import BarberCount from '../components/barbercount'
import Usercomments from '../components/Usercomments'


const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <Topbarber />
      <Banner />
      <BarberCount/>
      <Usercomments/>
      

      
    </div>
  )
}
export default Home