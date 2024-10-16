import { CheckCircle2 } from 'lucide-react'
import React from 'react'

const FormSuccess = ({message}:{message?: string}) => {
    if(!message) return

  return (
    <div className='bg-teal-500 text-secondary-foreground p-3 rounded-md'>
      <CheckCircle2 className='w-5 h-5' />
      <p>{message}</p>
    </div>
  )
}

export default FormSuccess;

