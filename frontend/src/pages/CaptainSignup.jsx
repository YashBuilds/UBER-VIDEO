import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [userData, setUserData] = useState({})

  const submitHandler= ()=>{
    e.preventDefault()

    setUserData({
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      email:email,
      password:password
    })

    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }
  return(
    <div className='p-7 h-screen flex flex-col justify-between'>
     <div>
     <img className="w-16 mb-10" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>

        <h3 className='text-base font-medium mb-4'>What's our Captain's name</h3>
        <div className='flex gap-6 mb-5'>
          <input required 
          value={firstName}
          onChange={(e)=>{
            setFirstName(e.target.value)
          }}
          type="text" 
          className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
          placeholder='Firstname' />

          <input required 
          value={lastName}
          onChange={(e)=>{
            setLastName(e.target.value)
          }}
          type="text" 
          className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
          placeholder='Lastname' />
        </div>

        <h3 className='text-base font-medium mb-4'>What's our Captains email</h3>

        <input required 
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        type="email" 
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
        placeholder='email@example.com' />

        <h3 className='text-base font-medium mb-2' >Enter Password</h3>

        <input required type="password"
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
         placeholder='password' />

        <button
         className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
        >Login</button>

        <p className='text-center'>Already have a account? <Link to="/captain-login" className='text-blue-600'>Login here</Link></p>
      </form>
     </div>

     <div>
      <p className=' flex text-center  justify-center text-[10px] leading-tight'>
        By procedding, you consent to get calls, WhatsApp or SMS messages,
        including by automated means, from Uber and
        its affiliates to the number provided
        This site is protected by reCAPTCHA and the <span className='underline'> &nbsp;Google Privacy Policy&nbsp; </span> and <span className='underline'> &nbsp;Terms of Services &nbsp; </span> apply.
      </p>
      {/* <Link
        to='/captain-login'
         className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      >Sign in as Captain</Link> */}
     </div>
    </div>
  )
}

export default CaptainSignup