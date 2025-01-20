import React from 'react';
import BounceLoading from './BounceEffect';

export default function Loading() {
  return (
    <div className='bg-[#5a555517] text-slate-200 block'>
        <span>Loading</span>
        <BounceLoading />
    </div>
  )
}
