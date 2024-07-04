import React from 'react'
import ListaTarea from '../ListaTarea/ListaTarea'
import Barra from '../Sidebar/Barra'

const Home = () => {
  return (
    <div className='lg:flex px-5 lg:px-20 pt-[2.9vh]'>
        <div className='hidden lg:block w-[25vw] relative'>
            <Barra/>
        </div>
        <div className='right-side-part w-full flex justify-center mb-10'>
          <ListaTarea/>

        </div>
    </div>
  )
}

export default Home