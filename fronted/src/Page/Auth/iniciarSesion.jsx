import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../Redux/Autenticacion'

const IniciarSesion = ({togglePanel}) => {
    const dispatch =useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(formData))
        //validar formulario y hacer la petición al API
        console.log("login", formData)
    }
    return (
        <div>
            <h1 className='text-lg font-bold text-center pb-8'>LOGIN</h1>
            <form className='space-y-3' onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Introduce tu email'
                />

                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Ingrese tu contraseña'
                />
                <div>
                    <Button fullWidth
                    className='customeButton'
                    type='submit'
                    sx={{padding:".9rem"}}>Login</Button>


                </div>
            </form>
            <div className='mt-5 flex items-center gap-2 py-5 justify-center'>
                <span>no tienes una cuenta?</span>
                <Button onClick={togglePanel}>Registrarse</Button>
            </div>
        </div>
    )
}

export default IniciarSesion