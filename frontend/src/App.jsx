import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ChatPage from './pages/Chatpage'
import HomePage from './pages/Home'
import SignupForm from './components/Signup'
import LoginForm from './components/Login'

function App() {
  return (
    <>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Add more routes as needed */}
      </Routes>
      {/* You can add a footer or other components here */}
      
    </>
  )
}

export default App
