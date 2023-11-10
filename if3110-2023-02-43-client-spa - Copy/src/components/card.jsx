import playButton from '../assets/logo/play.png'
import pauseButton from '../assets/logo/pause.png'
import deleteButton from '../assets/logo/delete.png'
import editButton from '../assets/logo/edit.png'
import downloadButton from '../assets/logo/download.png'
import likeButton from '../assets/logo/like.png'
import likedButton from '../assets/logo/liked.png'
import backModal from '../assets/logo/backModal.png'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useSongs } from '../contexts/SongContext'
import ReactModal from 'react-modal'
import { useCookies } from 'react-cookie'

export function Card(props){
    const {currentSong}=useSongs();
    const [cookies,setCookies]=useCookies();
    const customStyles = {
        content: {
            backgroundColor:'#1C2540',
            whiteSpace: 'pre-line',
            borderRadius:'20px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            alignItems:'center',
            textAlign:'center',
            color : '#FFFFFF'
        },
      };

    const [liked,setLiked]=useState(false);
    const [isOpen,setIsOpen]=useState(false)
    const {isPlaying,currentIndex,setCurrSong,setIsPlaying}=useSongs()
    const handleLike = ()=>{
        if(liked){
            setLiked(false)
        }else{
            setLiked(true)
        }
    }
    const handlePlay = (index)=>{
        if(currentIndex===index){
            if(isPlaying){
                setIsPlaying(false);
            }
            else{
                setCurrSong(index);
                setIsPlaying(true);
            }
        }else{
            setCurrSong(index);
            if(currentSong){
                props.audioRef.current.currentTime=0;
            }
            setIsPlaying(true);
        }
    }

    const handleDelete = ()=>{
        
    }

    return(
        <div className="card" id="song">
            <img onClick={()=>{setIsOpen(true)}} loading="lazy" className={props.song?"cardIMG mx-auto cursor-pointer object-cover":"cardIMG mx-auto"} src={import.meta.env.VITE_API_URL+'/imgsong/'+props.data.image}/>
            <h2 className="cardTitle font-bold text-2xl ml-1 mt-2">{props.data.judul}</h2>
            <h4 className="cardAuthor ml-1">{props.data.penyanyi}</h4>
            <h5 className="cardAuthor ml-1">{props.data.year}</h5>

            <div className="cardButtonCon">
                {cookies.user.is_admin && <div className="playButton"><img src={deleteButton}></img></div>}
                {/* <a><div className="playButton"><img src={editButton}></img></div></a> */}
                {
                    <NavLink to={import.meta.env.VITE_API_URL + "/Audio/"+props.data.audio} download={props.data.judul} target="_blank"
        rel="noopener noreferrer"><div className="playButton"><img src={downloadButton}></img></div></NavLink>
                    
                    
                    }

                    {<ReactModal
                        isOpen={isOpen}
                        contentLabel="Example Modal"
                        onRequestClose={() => setIsOpen(false)}
                        style={customStyles}
                        
                    >   
                        <img src={backModal} className='fixed top-10 left-10 ml-2 mt-2 cursor-pointer' onClick={()=>{setIsOpen(false)}}></img>
                        <p className='text-xl'>
                            {props.data.lyric}
                        </p>
                    </ReactModal>}
                {<div id="1" className="playButton" onClick={()=>{handlePlay(props.index)}}><img src={!(currentIndex===props.index)?playButton:(!isPlaying?playButton:pauseButton)}></img></div>}
                {<div id="1" className="playButton" onClick={handleLike}><img src={liked?likedButton:likeButton}></img></div> }
            </div>
        </div>
    )
}