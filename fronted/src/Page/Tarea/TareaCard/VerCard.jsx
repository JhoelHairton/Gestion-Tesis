import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function VerCard() {
    const handleAcceptDecline=(status) => {
        console.log(status)

    }
  return (
    <div className='rounded-md bg-black p-5 flex items-center justify-between'>
        <div className='space-y-2'>
            <div className='flex items-center gap-2'>
                <span>Git hub</span>
                <div className='flex items-center gap-2 text-[#ffff]'>
                    <OpenInNewIcon/>
                    <a href="/" target='_blank' rel='noopener noreferrer'>
                    Link del trabajo
                    </a>
                </div>
            </div>
            <div className='flex items-center gap-2 text-xs'>
                <p>tiempo de presentación:</p>
                <p className='text-gray-400'>2024-01-2383243043:12</p>
            </div>
        </div>
        <div>
            {
                true?<div className='flex gap-5'>
                    <div className='text-green-500'>
                        <IconButton color='success' onClick={()=>handleAcceptDecline("ACEPTADO")}>
                            <CheckIcon/>
                        </IconButton>
                    </div>
                    <div className='text-red-500'>
                        <IconButton color='error' onClick={()=>handleAcceptDecline("RECHAZADO")}>
                            <CloseIcon/>
                        </IconButton>
                    </div>


                </div>:<Button color={true?"success":"error"} size='small' variant='outlined'>
                Aceptado
                </Button>  
    
            }
        </div>
    </div>
  )
}

export default VerCard