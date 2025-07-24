import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ChatPage from './pages/Chatpage'
import HomePage from './pages/Home'
import SignupForm from './components/Signup'
import LoginForm from './components/Login'
import ProfilePage from './pages/Profile'

function App() {
  return (
    <>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Add more routes as needed */}
      </Routes>
      {/* You can add a footer or other components here */}
      
    </>
  )
}

export default App
