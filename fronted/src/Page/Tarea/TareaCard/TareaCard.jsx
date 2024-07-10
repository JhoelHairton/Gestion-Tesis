import { IconButton } from '@mui/material';
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UsuarioList from '../UsuarioList';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import VerPresentacion from './VerPresentacion';
import EditarTareaForm from './EditarTareaForm';


const rol="ROLE_ADMIN"

const TareaCard = ({item}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    //usuario list
    const [openUserList,setOpenUserList]=useState(false);
    const handleCloseUserList = () => {
        setOpenUserList(false);
    }

    const handleOpenUserList =()=>{
        setOpenUserList(true);
        handleMenuClose();
    }
    //ver presentacion
    const [OpenVerPresentacion,setOpenVerPresentacion]=useState(false);
    const handleCloseVerPresentacion = () => {
        setOpenVerPresentacion(false);
    }
    const handleOpenVerPresentacion =()=>{
        setOpenVerPresentacion(true);
        handleMenuClose();
    }
    //editar
    const [OpenEditar,setOpenEditar]=useState(false);
    const handleCloseEditar = () => {
        setOpenEditar(false);
    }
    const handleOpenEditar=()=>{
        setOpenEditar(true);
        handleMenuClose();
    }

    //eliminar
    const handleEliminar=()=>{
        handleMenuClose();
    }
  
  return (
    <div>
        <div className='card lg:flex justify-between'>
            <div className='lg:flex gap-5 items-center space-y-2 w-[0%] lg:w-[50%]'>
                <div className=''>
                    <img className='lg:w-[10rem] lg:h-[9.2rem] object-cover' 
                    src={item.image} alt="" />
                </div>
                <div className='space-y-5'>
                    <div className='space-y-2'>
                        <h1 className='font-bold text-lg'>{item.title}</h1>
                        <p className='text-gray-900 text-sm'>{item.descripcion}</p>
                    </div>

                    <div className='flex flex-wrap gap-2 items-center'>
                        {item.tags.map((item)=> <span className='py-1 px-5 rounded-full
                        techStack'> {item}</span>)}
                    </div>
                </div>
                
            </div>

            <div>
                <IconButton id="basic-button"
        aria-controls={openMenu? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu? 'true' : undefined}
        onClick={handleMenuClick}>
                    <MoreVertIcon className="text-black" />
                </IconButton>
                <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
            rol==="ROLE ADMIN"?<>
            <MenuItem onClick={handleOpenUserList}>Asignar docente</MenuItem>
            <MenuItem onClick={handleOpenVerPresentacion}>Ver presentaciones</MenuItem>
            <MenuItem onClick={handleOpenEditar}>Editar</MenuItem>
            <MenuItem onClick={handleEliminar}>Eliminar</MenuItem>
            </>:<>
            </>
        }
        </Menu>
            </div>
        </div>
        <UsuarioList open={openUserList} handleClose={handleCloseUserList}/>
        <VerPresentacion open={OpenVerPresentacion} handleClose={handleCloseVerPresentacion}/>
        <EditarTareaForm open={OpenEditar} handleClose={handleCloseEditar} />
    </div>
  );
}

export default TareaCard