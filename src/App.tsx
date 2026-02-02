import Sidebar from './Components/Sidebar'
import MainContent from './MainContent'
import { Routes, Route } from 'react-router-dom'
import ProductPage from './Components/ProductPage'

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-white text-black">
            <div className="max-w-7xl mx-auto py-10">
              <h1 className="text-3xl font-bold tracking-tight mb-8">React Store</h1>
              <div className="flex gap-8 items-start">
                <Sidebar />
                <MainContent />
              </div>
            </div>
          </div>
        }
      />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  )
}

export default App
