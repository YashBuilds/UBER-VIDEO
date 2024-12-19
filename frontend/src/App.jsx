import React, { useContext } from 'react'
import Home from './pages/home';
import { Route,Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import UserSignup from './pages/UserSignup'
import { UserDataContext } from './context/UserContext';


const App = () => {

  // const ans = useContext(UserDataContext)

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element= {<UserLogin/>} />
        <Route path='/signup' element= {<UserSignup/>} />
        <Route path='/captain-login' element= {<Captainlogin/>} />
        <Route path='/captain-signup' element= {<CaptainSignup/>} />
      </Routes>
    </div>
  )
}

export default App