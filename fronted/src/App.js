import { ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/darktheme';
import Home from './Page/Home/Home';
import Nav from './Page/Navbar/Nav';
import Auth from './Page/Auth/Auth';


function App() {
  
const user=true
  return (

    <ThemeProvider theme={darkTheme}>
      {user? <div>
        <Nav />
        <Home />
      </div> :
        <Auth />}
    </ThemeProvider>

  );
}

export default App;
