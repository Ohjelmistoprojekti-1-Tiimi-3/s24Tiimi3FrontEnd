import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Products from './components/Products.jsx'
import About from './components/About.jsx'
import Register from './components/Register.jsx'
import Account from './components/Account.jsx'
import Login from './components/Login.jsx'


const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "Account",
        element: <Account />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
