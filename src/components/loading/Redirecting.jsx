import React from 'react';
import SpinnerEffect from './SpinnerEffect';

export default function Redirecting() {
  return (
    <div className='absolute top-0 left-0 bg-violet-200 bg-opacity-20 w-[100vw] h-[100vh] duration-200'>
      <div className='absolute top-[45vh] left-[45vw] bg-[#020617] shadow-md text-white text-2xl p-2 duration-200 rounded-md'>
        <SpinnerEffect text='Redirecting' />
      </div>
    </div>
  )
}
