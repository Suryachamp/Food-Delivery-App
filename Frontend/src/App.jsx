import React from 'react'
import AppRoutes from './routes/AppRoutes.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'

function App() {
  return (
    <Router>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </Router>
  )
}

export default App
