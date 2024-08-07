import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VerCard from './VerCard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
    borderRadius:'20px',
    color: 'white' ,
    
};

const presentacion=[1,1,1]
export default function VerPresentacion({handleClose,open})  {
  
  return (
    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
        {presentacion.length>0?<div className='space-y-2'>
          {presentacion.map((item)=><VerCard/>)}
        </div>
        :<div className='space-y-2'>
            <div className='text-center'>   
                Nse ve la presentacion
            </div>
        </div>}
        </div>
      
     
      </Box>
    </Modal>
  </div>
);
}

