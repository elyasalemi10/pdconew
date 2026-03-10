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
          className: 'rounded-none border-primary font-heading font-medium text-sm px-6 py-4 shadow-elegant',
          success: { icon: '✓', style: { background: 'white', color: '#1B2A41' } },
          error: { icon: '✕', style: { background: 'white', color: '#B91C1C' } },
        }}
      />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
