import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { UserProvider } from './lib/context/JWTContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
    }
  }
})
function App() {
  return (
    <div className='p-0 m-0'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
        />
      </QueryClientProvider>
    </div>
  )
}

export default App
