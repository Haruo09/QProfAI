import React from 'react';

export default function SpinnerEffect({ text='loading' }) {
  return (
    <div className="flex justify-center items-center text-slate-200">
        <span>{text}</span>
        <div className="ml-2 animate-spin h-5 w-5 border-t-4 border-b-4 rounded-full border-indigo-700"></div>
    </div>
  )
}
