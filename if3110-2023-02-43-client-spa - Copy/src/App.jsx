import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { useAuth } from './contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import { useCookies } from 'react-cookie';
import { Album } from './pages/Album';
import { AddAlbum } from './pages/AddAlbum';
import { AddSong } from './pages/AddSong';
import { UserPage } from './pages/UserPage';

// import './App.css'

function App() {
  const [cookies,setCookies]=useCookies(["user"])
  const {cookieSignin}=useAuth()

  useEffect(()=>{
      if(cookies.user){
        cookieSignin(cookies.user);
      }

  },[])


  return (

          <BrowserRouter>
            <Routes>
              <Route index element={
                !cookies.user?
                <ProtectedRoute>
                  <Home></Home>
                </ProtectedRoute>:<Home></Home>
              }></Route>
              <Route path="/album" element={
                !cookies.user?
                <ProtectedRoute>
                  <Album></Album>
                </ProtectedRoute>:<Album></Album>
              }>
              </Route>
              <Route path="/addAlbum" element={
                !cookies.user?
                <ProtectedRoute>
                  <AddAlbum></AddAlbum>
                </ProtectedRoute>:<AddAlbum></AddAlbum>
              }>
              </Route>
              <Route path="/addSong" element={
                !cookies.user?
                <ProtectedRoute>
                  <AddSong></AddSong>
                </ProtectedRoute>:<AddSong></AddSong>
              }>
              </Route>
              <Route path="/user" element={!cookies.user? 
              <ProtectedRoute>
                <UserPage></UserPage>
              </ProtectedRoute>:<UserPage></UserPage>
              }></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/signup" element={<SignUp></SignUp>}></Route>
              <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
          </BrowserRouter>  

  )
}

export default App
