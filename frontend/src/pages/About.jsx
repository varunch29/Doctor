import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
        
        <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
        </div>

        <div className='flex flex-col my-10 md:flex-row gap-12'>
          <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
            <p>At our Doctor Appointment platform, we aim to bridge the gap between patients and healthcare professionals, providing an easy and reliable way to book medical consultations. Our user-friendly interface allows you to explore, compare, and schedule appointments with trusted doctors in various specialties. </p>
            <p>Our mission is to simplify healthcare access by offering transparent information about doctors' qualifications, experience, and fees. We prioritize your health and time, enabling you to book appointments without the hassle of long queues or confusing processes</p>
            <b className='text-gray-800'>Our Vision</b>
            <p>We are dedicated to maintaining the highest standards of service by continuously improving our platform based on user feedback. Our secure booking system ensures your personal information is protected while offering flexible scheduling options.</p>
          </div>
        </div>
        <div className='text-xl my-4'>
          <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>

        </div >
        <div className='flex flex-col md:flex-row mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
            <b>EFFICIENCY:</b>
            <p>streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
            <b>CONVIENENCE:</b>
            <p>Access to a network of trusted doctors healthcare professionals in your area</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
            <b>PERSONALIZATION:</b>
            <p>Tailored recommendations and remainders to help you stay on top of your health.</p>
          </div>
        </div>
    </div>
  )
}

export default About