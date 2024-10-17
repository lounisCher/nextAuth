import { AlertCircle } from 'lucide-react'
import React from 'react'

const FormError = ({message}:{message?: string}) => {
    if(!message) return

  return (
    <div className='bg-destructive/25 text-secondary-foreground p-3 rounded-md
    flex items-center justify-center gap-3'>
      <AlertCircle className='w-5 h-5' />
      <p className='text-xs font-bold'>{message}</p>
    </div>
  );
};

export default FormError;
