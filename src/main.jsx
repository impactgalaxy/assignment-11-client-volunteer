import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './C_P_R/routes/pages_routes.jsx'
import { Helmet } from 'react-helmet'
import AuthProvider from './C_P_R/provider/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Helmet>
        <RouterProvider router={routes} />
      </Helmet>
    </AuthProvider>

  </React.StrictMode>,
)
