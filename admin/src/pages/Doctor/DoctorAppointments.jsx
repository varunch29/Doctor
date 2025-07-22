// // import React from 'react'
// // import { useContext } from 'react'

// import React, { useContext, useEffect, useState } from 'react'

// import { DoctorContext } from '../../context/DoctorContext'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import ChatPopup from '../../components/ChatPopup'; // adjust path if needed


// const DoctorAppointments = () => {

//   const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
//   const { calculateAge, currency } = useContext(AppContext)

//   const [openChatId, setOpenChatId] = useState(null);


//   const handleComplete = async (item) => {
//     console.log('item: ', item)
//     console.log('item: ', item.userId)
//     completeAppointment(item._id)
//   }
//   useEffect(() => {
//     //console.log("Fetching appointments, dToken:", dToken);
//     //console.log(item._id)
//     if (dToken) {
//       getAppointments()
//     }
//   }, [dToken])

//   return (
//     <div className='w-full max-w-6xl m-5'>
//       <p className='mb-3 text-lg font-medium'>All Appointments</p>
//       <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
//         <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fee</p>
//           <p>Action</p>
//         </div>
//         {
//           [...appointments].reverse().map((item, index) => (
//             <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//               <p className='max-sm:hidden'>{index + 1}</p>
//               <div className='flex items-center gap-2'>
//                 <img className='w-8 h-8 rounded-full' src={item.userData.image} alt="" />
//                 <p >{item.userData.name}</p>
//               </div>
//               <div>
//                 <p className='text-xs inline border border-primary px-2 rounded-full'>
//                   {item.payment ? 'Online' : 'CASH'}
//                 </p>
//               </div>
//               <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//               <p>{item.slotDate},{item.slotTime}</p>
//               <p>{currency}{item.amount}</p>
//               {/* {
//                 item.cancel
//                   ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                   : item.isCompleted
//                     ? <p className='text-green-500 text-xs font-medium'>Completed</p>
//                     : <div className='flex'>
//                       <img onClick={() => cancelAppointment(  item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                       <img onClick={() => handleComplete(item)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//                     </div>
//               } */}


//               {
//                 item.cancel ? (
//                   <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                 ) : (
//                   <div className='flex flex-col gap-1 items-start'>
//                     <div className='flex gap-2'>
//                       {item.isCompleted ? (
//                         <p className='text-green-500 text-xs font-medium'>Completed</p>
//                       ) : (
//                         <>
//                           <img
//                             onClick={() => cancelAppointment(item._id)}
//                             className='w-6 cursor-pointer'
//                             src={assets.cancel_icon}
//                             alt='Cancel'
//                           />
//                           <img
//                             onClick={() => handleComplete(item)}
//                             className='w-6 cursor-pointer'
//                             src={assets.tick_icon}
//                             alt='Complete'
//                           />
//                         </>
//                       )}
//                     </div>
//                     <button
//                       onClick={() => setOpenChatId(item._id)}
//                       className='text-xs text-blue-600 underline hover:text-blue-800 mt-1'
//                     >
//                       Chat
//                     </button>
//                   </div>
//                 )
//               }



//             </div>
//           ))
//         }
//       </div>

//       {openChatId && (
//         <ChatPopup
//           appointmentId={openChatId}
//           userId={doctorData?._id}          // ✅ actual doctor ID
//           patientId={item.userId}           // ✅ actual patient ID
//           patientName={item.userData.name}  // for the UI
//           onClose={() => setOpenChatId(null)}
//         />
//       )}


//     </div>
//   )
// }

// export default DoctorAppointments
import React, { useContext, useEffect, useState } from 'react';

import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import ChatPopup from '../../components/ChatPopup';

const DoctorAppointments = () => {
  const {
    dToken,
    profileData,
    getProfileData,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, currency } = useContext(AppContext);

  const [openChatAppointment, setOpenChatAppointment] = useState(null);

  const handleComplete = async (item) => {
    completeAppointment(item._id);
  };

  useEffect(() => {
    if (dToken) {
      getAppointments();
      getProfileData();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {[...appointments].reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={item._id}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full" src={item.userData.image} alt="Patient" />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {item.slotDate}, {item.slotTime}
            </p>
            <p>{currency}{item.amount}</p>

            {item.cancel ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : (
              <div className="flex flex-col gap-1 items-start">
                <div className="flex gap-2">
                  {item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">Completed</p>
                  ) : (
                    <>
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-6 cursor-pointer"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                      <img
                        onClick={() => handleComplete(item)}
                        className="w-6 cursor-pointer"
                        src={assets.tick_icon}
                        alt="Complete"
                      />
                    </>
                  )}
                </div>
                <button
                  onClick={() => setOpenChatAppointment(item)}
                  className="text-xs text-blue-600 underline hover:text-blue-800 mt-1"
                >
                  Chat
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {openChatAppointment && profileData && profileData._id && (
        <ChatPopup
          appointmentId={openChatAppointment._id}
          userId={profileData._id}
          patientId={openChatAppointment.userId}
          patientName={openChatAppointment.userData?.name || 'Patient'}
          onClose={() => setOpenChatAppointment(null)}
        />
      )}
    </div>
  );
};

export default DoctorAppointments;
