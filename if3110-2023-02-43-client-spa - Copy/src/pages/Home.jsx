import { Navbar } from "../components/navbar"
import { Player } from "../components/player"
import { CardList } from "../components/cardList";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useSongs } from "../contexts/SongContext";
import axios from "axios";
import { useAlbums } from "../contexts/AlbumContext";

export function Home(){


    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [selectedSong,setSelectedSong] = useState(null);
    const {songs,currentSong}=useSongs();
    const {albums}=useAlbums();
    const audioRef = useRef();
    useEffect(()=>{
      setSelectedSong(currentSong);
    },[currentSong])

    useEffect(()=>{
        async function fetchHome() {
        //   const response = await axios.get('http://localhost:3000');
        //   const data =  await response.data
        //   console.log(data);
        //   console.log(cookies.user);
        }
        fetchHome()
      },[])

    return (
        <div className='mainPage'>
            <Navbar></Navbar>
            <div className="mainCon">
                <div className="search-container py-5">
                    <input id="searchBar" type="text" name="search" placeholder="Search..." className="search-input"/>
                    <a className="search-btn">
                            <i className="fas fa-search"></i>      
                    </a>
                </div>

                <div className="cardCon">
                    <div className="filterCon">
                        <h2 className="searchText font-bold text-xl">Now Playing : {currentSong? currentSong.judul:''}</h2>
                        {/* <?php include( __DIR__. '/../template/filter.php') ?> */}
                    </div>
                    <div id='reload'>
                        <CardList data={songs} song={true} audioRef={audioRef}></CardList>
                    </div>
                </div>
                <div className='playerCon'>
                    <Player song={currentSong} audioRef={audioRef}></Player>
                    
                </div>
            </div>
        </div>


    )
}