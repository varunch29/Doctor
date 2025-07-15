import React, { useContext, useEffect, useState } from 'react'
import { Appcontext } from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import ChatPopup from '../components/ChatPopup';


const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(Appcontext)
  const [appointments, setAppointments] = useState([])


  const [openChatId, setOpenChatId] = useState(null);
  const [chatDoctor, setChatDoctor] = useState('');



  const getUSerAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUSerAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUSerAppointments()
      //console.log(data.appointments)
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>MyAppointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold '>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{item.slotDate} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>

              {!item.cancel && (
                <button
                  onClick={() => {
                    setOpenChatId(item._id); // appointmentId
                    setChatDoctor(item.docData.name);
                  }}
                  className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'
                >
                  Chat
                </button>
              )}

              {/* {!item.cancel && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancel && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancel && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>} */}

              {item.isCompleted ? (
                <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                  Appointment Completed
                </button>
              ) : item.cancel ? (
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                  Appointment Cancelled
                </button>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}

            </div>
          </div>
        ))}
      </div>


      {/* 👇 Chat Popup goes here  */}
      {openChatId && (
        <ChatPopup
          appointmentId={openChatId}
          userId="patient" // or actual user ID from context
          doctorName={chatDoctor}
          onClose={() => setOpenChatId(null)}
        />
      )}


    </div>
  )
}

export default MyAppointments