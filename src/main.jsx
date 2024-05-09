import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './C_P_R/routes/pages_routes.jsx'
import { Helmet } from 'react-helmet'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Helmet>
      <RouterProvider router={routes} />
    </Helmet>

  </React.StrictMode>,
)
