import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ChatPage from './pages/Chatpage'
import HomePage from './pages/Home'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* Add more routes as needed */}
      </Routes>
      {/* You can add a footer or other components here */}
      
    </>
  )
}

export default App
