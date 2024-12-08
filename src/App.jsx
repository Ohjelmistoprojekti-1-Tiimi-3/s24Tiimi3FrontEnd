import { Link, Outlet } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import './App.css';
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';

function App() {

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
            <PetsIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Omppu & Rane Koiratarvikkeet
          </Typography>
          <Stack direction='row' spacing={2}>
            <Link to={"/"} color='inherit'>Etusivu</Link>
            <Link to={"/products"}>Tuotteet</Link>
            <Link to={"/about"}>Meistä</Link>
            <Link to={"/register"}>Rekisteröidy</Link>
            <Link to={"/login"}>Kirjaudu</Link>
            <Link to={"/account"}>Omat tiedot</Link>
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  )
}

export default App
