import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/Login'
import { Main } from './layouts/Main';
import Cadastro from './pages/Cadastro'


const router = createBrowserRouter([
  {
    element:<Main />,
    children: [

      {
        path:'/',
        element:<Cadastro/>
      },
      {
        path:'/login',
        element:<Login/>
      }
    ]

  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
)