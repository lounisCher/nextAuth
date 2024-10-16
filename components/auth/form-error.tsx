import { AlertCircle } from 'lucide-react'
import React from 'react'

const FormError = ({message}:{message?: string}) => {
    if(!message) return

  return (
    <div className='bg-destructive text-secondary-foreground p-3 rounded-md'>
      <AlertCircle className='w-5 h-5' />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
