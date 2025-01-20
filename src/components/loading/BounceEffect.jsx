import React from 'react'

export default function BounceLoading({ text='loading' }) {
  return (
    <div className="flex items-center justify-center">
      <span>{text}</span>
      <div className="animate-bounce h-5 w-5 rounded-full p-0 m-0 bg-violet-700 inline-block relative bottom-0"></div>
    </div>
  )
}
