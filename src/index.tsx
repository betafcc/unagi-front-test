import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { Collection } from './pages/Collection'

const router = createBrowserRouter([
  {
    path: '/collection',
    element: <Collection />,
  },
  // Using modal instead
  // {
  //   path: '/create-card',
  //   element: <CreateCard />,
  // },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
