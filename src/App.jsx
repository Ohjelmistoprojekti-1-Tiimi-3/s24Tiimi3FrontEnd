import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <nav>
        <Link to={"/"}>Etusivu</Link>
        <Link to={"/products"}>Tuotteet</Link>
        <Link to={"/about"}>Meistä</Link>
        <Link to={"/register"}>Rekisteröidy</Link>

      </nav>
      <Outlet />
    </>
  )
}

export default App
