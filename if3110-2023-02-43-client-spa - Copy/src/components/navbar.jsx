import home from '../assets/logo/logo.png'
import addAlbum from '../assets/logo/album.png'
import addSong from '../assets/logo/addSong.png'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/FakeAuthContext'
import { useCookies } from 'react-cookie'

export function Navbar(){
    const {user}=useAuth();
    const [cookies,setCookies]=useCookies(["user"]);

    return (
        <div className="navCon">
            <nav className='navbar'>
                <NavLink className="logoCon" to="/">
                    <img className='logoimg' src={home}/>
                </NavLink>
                <div className='leftCon'>
                    <NavLink className="" to="/album">
                        <img className='navbarimg' src={addAlbum}/>
                    </NavLink>
                    <NavLink className="" to="/addSong">
                        <img className='navbarimg' src={addSong}/>
                    </NavLink>
                </div>

                <NavLink  to={cookies.user?"/user":"/login"} className={cookies.user?"z-0 mr-7":"mr-7"}>
                {
                    user? <img className='avatar logoimg object-cover' src={import.meta.env.VITE_API_URL + '/img/'+user.profile_picture} referrerPolicy="no-referrer"/>:
                    <div className="avatar">
                        <div className="user-icon"></div>
                    </div>   
                }

                </NavLink>
            </nav>
        </div>    
    )
}