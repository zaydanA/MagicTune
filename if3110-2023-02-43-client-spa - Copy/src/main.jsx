import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/mainPage.css'
import './styles/navbar.css'
import './styles/mainCon.css'
// import './styles/body.css'
import './styles/searchBar.css'
import './styles/button.css'
import './styles/reactPlayer.css'
import './styles/cardCon.css'
import './styles/card.css'
import './styles/login.css'
import './styles/google.css'
import './styles/album.css'
import './styles/addAlbum.css'
import './styles/color.css'
import './styles/Spinner.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from './contexts/FakeAuthContext.jsx'
import { SongProvider } from './contexts/SongContext.jsx'
import { AlbumProvider } from './contexts/AlbumContext.jsx'
import './index.css'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
// import './styles/player.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>
      <AlbumProvider>
        <SongProvider>
          <App />
        </SongProvider>
      </AlbumProvider>
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>,
)
