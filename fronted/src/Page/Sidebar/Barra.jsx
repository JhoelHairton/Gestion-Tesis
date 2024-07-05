import React, { useState } from "react";
import "./Sidebar.css";
import { Avatar, Button } from "@mui/material";
import CrearTareaForm from "../Tarea/CrearTarea";
import { useLocation, useNavigate } from "react-router-dom";

const menu = [
  { name: "INICIO", value: "Inicio", role: ["ROLE ADMIN", "ROLE CUSTOMER"] },
  { name: "HECHO", value: "Hecho", role: ["ROLE ADMIN", "ROLE CUSTOMER"] },
  { name: "ASIGNADO", value: "Asignado", role: ["ROLE ADMIN"] },
  { name: "NO ASIGNADO", value: "Pendiente", role: ["ROLE ADMIN"] },
  { name: "Crear nueva tarea", value: "", role: ["ROLE ADMIN"] },
  { name: "Notificacion", value: "Notificacion", role: ["ROLE CUSTOMER"] },
]

const rol = "ROLE ADMIN";

const Barra = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("INICIO");

  const [openCrearNuevaForm, setOpenCrearNuevaForm] = useState(false);
  const handleCloseCrearNuevaForm = () => {
    setOpenCrearNuevaForm(false);
  }
  const handleOpenCrearNuevaFormModal = () => {
    setOpenCrearNuevaForm(true);
  }
  const handleMenuChange = (item) => {
    const actualizarParams = new URLSearchParams(location.search);
    if (item.nam == "Crear nueva tarea") {
      handleOpenCrearNuevaFormModal()
    }
    else if (item.name == "Hecho") {
      actualizarParams.delete("filter")
      const queryString = actualizarParams.toString();
      const updatePath = queryString ? `${location.pathname}?${queryString}`
        : location.pathname
      navigate(updatePath);
    }
    else {
      actualizarParams.set("filter", item.value);
      navigate(`${location.pathname}?${actualizarParams.toString()}`);
    }

    setActiveMenu(item.name)
  }
  const handleLogout = () => {
    console.log("hola");
  }

  return (
    <>
      <div className="cardd min-h-[85vh] flex flex-col justify-center fixed w-[20vw]">
        <div className="space-y-5 h-full">
          <div className="flex justify-center">
            <Avatar
              sx={{ width: "8rem", height: "8rem" }}
              className="border-4 border-[#5e5e5e]"
              src="https://seeklogo.com/images/U/Universidad_Peruana_Union-logo-6205753F70-seeklogo.com.png" />
          </div>
          {
            menu.filter((item) => item.role.includes(rol))
              .map((item) => <p onClick={() => handleMenuChange(item)} className={`py-3 px-5 rounded-full text-center cursor-pointer ${activeMenu === item.name ?
                "activeMenuItem" : "menuItem"}`} >
                {item.name}
              </p>)
          }
          <Button onClick={handleLogout} sx={{ padding: ".7rem", borderRadius: "2rem" }} fullWidth className="logoutButton">
            Cerrar Sesion
          </Button>
        </div>
      </div>
      <CrearTareaForm open={openCrearNuevaForm} handleClose={handleCloseCrearNuevaForm} />
    </>

  )
}
export default Barra;