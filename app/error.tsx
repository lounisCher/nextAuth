'use client'
import React from 'react'

const Error = ({
    error,
    reset,
}: {
    error: Error & {digest?: string}
    reset: ()=>void
}) => {

  return (
    <div className='w-full min-h-full flex items-center justify-center flex-col'>
        <h2>Something went wrong
            {error.message}
        </h2>
        <button
        onClick={()=>reset()}>
            try again
        </button>
    </div>
  )
}

export default Error
