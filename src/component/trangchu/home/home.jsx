//import React from 'react'
import Header from '../header/index'
import Slice1 from '../footer/slice1'
import Slice2 from '../footer/slice2'
import Slice3 from '../footer/slice3'
const home = () => {
  
  return (
    <div className='w-full absolute top-36'>
          <Header/>
          <Slice1/>
          <Slice2/>
          <Slice3/>
    </div>
  )
}

export default home
