import React from 'react'

import Navbar from './components/Navbar'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'


/// stopped at 1:38:48 


import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <div>

      <Navbar/>
      <Routes>
        <Route path='/' element={ <HomePage/>} />
        <Route path='/signup' element={ <SignupPage/>} />
        <Route path='/login' element={ <LoginPage/>} />
        <Route path='/profile' element={ <ProfilePage/>} />
        <Route path='/settings' element={ <SettingsPage/>} />
      </Routes>

    </div>
  )
}

export default App