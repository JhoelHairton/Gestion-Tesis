import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

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

const tarea = [1,1,1,1]

export default function UsuarioList({handleClose,open})  {
  
  return (
    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {
            tarea.map((item,index) => 
                <>
                <div className='flex items-center justify-between w-full'>
                <div>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'/>
                        </ListItemAvatar>
                        <ListItemText
                        secondary="jhoel@gmail.com"
                        primary={"Jhoel hairton"}/>
                    </ListItem>
                </div>
                <div>
                    <Button className='botonAsignar'>Seleccionar</Button>
                </div>

            </div>
            {index!==tarea.length-1 && <Divider variant='inset'/>}

                </>
            
        )
        }
      </Box>
    </Modal>
  </div>
);
}

