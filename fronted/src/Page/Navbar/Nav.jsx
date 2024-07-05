import React from "react";
import "./Nav.css";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useSelector } from "react-redux";

const Nav = () => {
  const { task,auth } = useSelector(store => store)

    return (
      <Navbar fluid rounded>
      <NavbarBrand>
        <img src="https://media.licdn.com/dms/image/C4D03AQFr1oN3UNDWMA/profile-displayphoto-shrink_200_200/0/1517539119433?e=2147483647&v=beta&t=sWWOrO5JbghlWRyi7WWiPQyMEeSKS1L0mGU3kgyoFQ8" 
        className="mr-3 h-6 sm:h-10" alt="Flowbite React Logo" />
<span className="self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white">Gestion de Tesis</span>
</NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <DropdownHeader>
            <span className=" text-black dark:text-white ">{auth.user?.nombre}</span>
            <span className="block truncate text-sm font-medium">{auth.user?.email}</span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          INICIO
        </NavbarLink>
        <NavbarLink href="#">CONFIGURACION</NavbarLink>
        <NavbarLink href="#">TESIS</NavbarLink>
        <NavbarLink href="#">INICIAR SESION</NavbarLink>
      </NavbarCollapse>
    </Navbar>
        
    );
}
export default Nav;