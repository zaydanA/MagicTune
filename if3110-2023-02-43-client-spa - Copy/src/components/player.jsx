import { useCallback, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
// import song from "../../public/Audio/song.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import { useSongs } from "../contexts/SongContext";

export function Player(props){
    const progressBarRef = useRef();
    const {currentSong,currentIndex,isPlaying,setIsPlaying,songs,setCurrSong}=useSongs();
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration,setDuration]=useState(0);
    const playAnimationRef = useRef();
    const repeat = useCallback(() => {
      if(props.audioRef.current){
        const currentTime = props.audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        playAnimationRef.current = requestAnimationFrame(repeat);
      }else{
        setIsPlaying(false);
      }
    },[]);

    const formatTime = (time) => {
      if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const formatMinutes =
          minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(time % 60);
        const formatSeconds =
          seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formatMinutes}:${formatSeconds}`;
      }
      return '00:00';
    };
    
    const playingButton = () => {
      if(currentSong){
        if (isPlaying) {
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
        }
      }
    };

    const nextButton=()=>{
      // console.log('click');
      if(currentSong){
        setIsPlaying(false);
        if(currentIndex+1<songs.length){
          setCurrSong(currentIndex+1)
          props.audioRef.current.currentTime=0;
        }else{
          setCurrSong(0)
          props.audioRef.current.currentTime=0;
        }
        setIsPlaying(true);
      }
    }

    const prevButton=()=>{
      // console.log('click');
      if(currentSong){
        setIsPlaying(false);
        if(props.audioRef.current.currentTime < 2){
          if(currentIndex-1<0){
            setCurrSong(0);
            props.audioRef.current.currentTime=0;
          }else{
            setCurrSong(currentIndex-1)
            props.audioRef.current.currentTime=0;
          }
        }else{
          props.audioRef.current.currentTime=0;
        }
        setIsPlaying(true);
      }
    }

    useEffect(() => {
      if(currentSong){
        setDuration(props.audioRef.current.duration);
        if (isPlaying) {
          props.audioRef.current.play();
        } else {
          props.audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
      }
    }, [isPlaying, props.audioRef,currentSong,repeat]);

    const handleProgressChange = () => {
      props.audioRef.current.currentTime = progressBarRef.current.value;
    };

    const onLoadedMetadata = () => {
      setDuration(props.audioRef.current.duration);
      progressBarRef.current.max = props.audioRef.current.duration;
    };
    return (
        <div className="playerCon2">
        {currentSong? <audio className="audio" src={`${import.meta.env.VITE_API_URL}/Audio/${currentSong.audio}`} onEnded={nextButton} ref={props.audioRef} onLoadedMetadata={onLoadedMetadata} />:<></>}
            <div className="slider">
                <p>
                    {formatTime(timeProgress)}
                </p>
                <input
                    type="range"
                    min="0"
                    ref={progressBarRef}
                    defaultValue="0"
                    className="timeline"
                    onChange={handleProgressChange}
                     />
                    <p>
                      {formatTime(duration)}
                    </p>
            </div>
            <div className="buttonCon">
                    <button className="playButton" onClick={prevButton}>
                        <IconContext.Provider value={{ size: "5em", color: "#1C2540" }}>
                            <BiSkipPrevious className='mx-auto' />
                        </IconContext.Provider>
                    </button>
                    {!isPlaying ? (
                        <button className="playButton" onClick={playingButton}>
                            <IconContext.Provider value={{ size: "5em", color: "#1C2540" }}>
                                <AiFillPlayCircle className='mx-auto' />
                            </IconContext.Provider>
                        </button>
                    ) : (
                        <button className="playButton" onClick={playingButton}>
                            <IconContext.Provider value={{ size: "5em", color: "#1C2540" }}>
                                <AiFillPauseCircle className='mx-auto' />
                            </IconContext.Provider>
                        </button>
                    )}
                    <button className="playButton" onClick={nextButton}>
                        <IconContext.Provider value={{ size: "5em", color: "#1C2540" }}>
                            <BiSkipNext className='mx-auto' />
                        </IconContext.Provider>
                    </button>
            </div>
        </div>
    )
}