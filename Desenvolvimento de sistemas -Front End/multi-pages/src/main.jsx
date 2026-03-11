import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre/Index';
import { Main } from './layouts/Main';

const router = createBrowserRouter([
  {
    element: <Main />,
    children: [


      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Sobre",
        element: <Sobre />,
      },
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
