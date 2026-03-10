import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1B2A41',
            color: '#fff',
            padding: '16px 24px',
            borderRadius: '0',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            borderLeft: '4px solid #B8A369',
          },
          success: {
            iconTheme: {
              primary: '#B8A369',
              secondary: '#1B2A41',
            },
          },
          error: {
            style: {
              borderLeft: '4px solid #DC2626',
            },
            iconTheme: {
              primary: '#DC2626',
              secondary: '#fff',
            },
          },
        }}
      />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
