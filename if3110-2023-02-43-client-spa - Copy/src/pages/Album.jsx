import { useEffect, useState } from "react";
import { CardList } from "../components/cardList";
import { Navbar } from "../components/navbar";
import { useAlbums } from "../contexts/AlbumContext";
import { useSongs } from "../contexts/SongContext";

export function Album(){
    const {albums,fetchAlbums}=useAlbums();

    useEffect(()=>{
        fetchAlbums()
    },[])
    return(
        <div className='mainPage'>
        <Navbar></Navbar>

        <div className="mainCon">
            {/* <div className="search-container">
                <input type="text" name="search" placeholder="Search..." onchange="handleSubmit(this.value)" className="search-input"/>
                <a href="#" className="search-btn">
                        <i className="fas fa-search"></i>      
                </a>
            </div> */}

            <div className="cardCon albumCon">

                {/* <div className="filterCon">
                    <h2 className="searchText">Album List </h2>
                </div> */}
                <div id='reload'>
                    {albums && <CardList data={albums}></CardList>}
                </div>
            </div>
        </div>
        
    </div>
    )
}