import { useState } from "react"
import { Card } from "./card"
import { useSongs } from "../contexts/SongContext"
import addAlbum from '../assets/logo/addAlbum.png'
import { NavLink } from "react-router-dom"
import { Album } from "./album"
import { useAlbums } from "../contexts/AlbumContext"
import Spinner from "./Spinner"
export function CardList(props){

    const {isLoadingAlbum} = useAlbums()
    return(
        <div className="cardCon2">
            <div className="cardCon3" id="data-container">

                {props.song? props.data.map((data,index)=>(
                    <Card key={index} data={data} song={props.song} audioRef={props.audioRef} index={index}></Card>
                )) : null}

                {
                    !props.song? props.data.map((data,index)=>(
                    <Album key={index} data={data} song={props.song} index={index}></Album>
                )) : null}

                {isLoadingAlbum && <Spinner></Spinner>}
                {!props.song?                
                <div className="outerCard">
                    <div className="card addAlbum">
                        <NavLink  to="/addAlbum">
                            <img src={addAlbum}/>
                        </NavLink>
                    </div>
                </div>:null
                }
            </div>
            <div className="paginationCon" id='scroll'>
            </div> 
        </div>

    )
}