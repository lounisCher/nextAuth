import { CheckCircle2 } from 'lucide-react'
import React from 'react'

const FormSuccess = ({message}:{message?: string}) => {
    if(!message) return

  return (
    <div className='bg-teal-500/25 text-secondary-foreground p-3 rounded-md flex items-center  justify-center gap-3'>
      <CheckCircle2 className='w-5 h-5'/>
      <p className='text-xs font-bold'>{message}</p>
    </div>
  )
}

export default FormSuccess;

