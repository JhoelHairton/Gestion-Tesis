import { ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/darktheme';
import Home from './Page/Home/Home';
import Nav from './Page/Navbar/Nav';
import Auth from './Page/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { buscarTareas } from './Redux/TareaSlice';
import { PerfilUsuario } from './Redux/Autenticacion';

function App() {
  const user = true;
  const dispatch = useDispatch();
  const { tarea, auth } = useSelector(store => store)

  useEffect(() => { 
    
    dispatch(buscarTareas({})) 
    dispatch(PerfilUsuario(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);

  return (

    <ThemeProvider theme={darkTheme}>
      {auth.user? <div>
        <Nav />
        <Home />
      </div> :
        <Auth />}
    </ThemeProvider>

  );
}

export default App;
