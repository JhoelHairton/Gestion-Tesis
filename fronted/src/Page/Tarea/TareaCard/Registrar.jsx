import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'

const Registrar = ({ togglePanel }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        rol: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        //validar formulario y hacer la petición al API
        console.log("login", formData)
    }
    return (
        <div>
            <h1 className='text-lg font-bold text-center pb-8'>REGISTRARSE</h1>
            <form className='space-y-3' onSubmit={handleSubmit}>

                <TextField
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder='Introduce su nombre....'
                />

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Introduce tu correo electrónico....'
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
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-sel ect"
                        value={formData.rol}
                        label="Rol"
                        name='rol'
                        onChange={handleChange}
                    >
                        <MenuItem value={"ROLE ADMIN"}>ADMIN</MenuItem>
                        <MenuItem value={"ROLE ESTUDIANTE"}>ESTUDIANTE</MenuItem>
                        <MenuItem value={"ROLE DOCENTE"}>DOCENTE</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <Button fullWidth
                        className='customeButton'
                        type='submit'
                        sx={{ padding: ".9rem" }}>Registrarse</Button>


                </div>
            </form>
            <div className='mt-5 flex items-center gap-2 py-5 justify-center'>
                <span>¿Ya tienes una cuenta?</span>
                <Button onClick={togglePanel}>Login</Button>
            </div>
        </div>
    )
}

export default Registrar