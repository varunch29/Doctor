import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Login from './pages/Login'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctor' element={<Doctors/>}/>
        <Route path='/doctor/:speciality' element={<Doctors/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/my-appointment' element={<MyAppointments/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
      </Routes> 
      <Footer/>
    </div>
  )
}

export default App