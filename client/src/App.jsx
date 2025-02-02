import React, { useEffect } from 'react'

import Navbar from './components/Navbar'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'
import { useAuthState } from './states/authStates'
import { useThemeStates } from './states/themeStates'
import { Toaster } from 'react-hot-toast'

import {Loader} from 'lucide-react'


/// stopped at 1:40:48 
/// start from settung up zustand


import { Routes, Route, Navigate } from 'react-router-dom'


const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthState();
  const { theme } = useThemeStates();
  
  useEffect( ()=>{
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path='/' element={ authUser ? <HomePage/> : <Navigate to="/login" /> } />
        <Route path='/signup' element={ !authUser ? <SignupPage/> : <Navigate to = "/" /> } />
        <Route path='/login' element={ !authUser ? <LoginPage/> : <Navigate to="/"/> } />
        <Route path='/profile' element={ authUser ? <ProfilePage/> : <Navigate to="/login" />} />
        <Route path='/settings' element={ <SettingsPage/>} />
      </Routes>
      <Toaster/>
      
    </div>
  )
}

export default App