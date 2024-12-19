import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8  w-full flex justify-between flex-col'>
            <img className="w-16 ml-8" src="https://www.logo.wine/a/logo/Uber/Uber-White-Dark-Background-Logo.wine.svg" alt="Uber logo" />
            <div className='bg-white py-5 px-6 pb-7'>
                <h2 className='flex items-center justify-center text-2xl font-bold'>Get started with RideSwift</h2>
                <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 mt-4 rounded-lg'>Continue</Link>
            </div>

        </div>
    </div>
  )
}

export default Home