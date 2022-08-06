import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/images/covid.png';

const  Header:React.FC = () => {

  const menu = {
    justifyContent: "center",
    alignItems: "center"
  }

return (
  <Box sx={{ flexGrow: 1 }} id="main-menu">
        <AppBar sx={menu}  position="static" color='inherit' className="main-nav">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img src ={logo} alt="logo"/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Header