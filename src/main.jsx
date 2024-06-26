import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './C_P_R/provider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import router from './C_P_R/routes/PageRouts.jsx'
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
        <ChakraProvider><RouterProvider router={router} /></ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>


  </React.StrictMode>,
)
