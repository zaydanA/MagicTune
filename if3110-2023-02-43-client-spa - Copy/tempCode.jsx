                    // {/* <div className='progressBar'>

                    // </div> */}
                    // {/* <div className="player">
                    //     <div className="sliderPlayerCon">
                    //         <div className="slider_container">
                    //             <div className="current-time">00:00</div>
                    //             <input type="range" min="1" max="100"
                    //             value="0" className="seek_slider"/>
                    //             <div className="total-duration">00:00</div>
                    //         </div>
                    //         <div className="buttonCon">
                    //             <div className="prev-track" onclick="prevTrack()">
                    //                 <i className="fa fa-step-backward fa-2x"></i>
                    //             </div>
                    //             <div className="playpause-track">
                    //                 <i className="fa fa-play-circle fa-5x"></i>
                    //             </div>
                    //             <div className="next-track">
                    //                 <i className="fa fa-step-forward fa-2x"></i>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div> */}

                    // const [time, setTime] = useState({
                    //     min: "00",
                    //     sec: "00"
                    //   });
                    //   const [currTime, setCurrTime] = useState({
                    //     min: "00",
                    //     sec: "00"
                    //   });
                    
                    //   const [seconds, setSeconds] = useState(0);
                    //   // console.log(currentSong.audio);
                      
                    //   // const [play, { pause, duration, sound }] = useSound(null);
                    //   const [play, { pause, duration, sound }] = useSound(`./Audio/song.mp3`);
                    //   // console.log(sound);
                    
                    //   useEffect(() => {
                    //     if (duration) {
                    //       const sec = duration / 1000;
                    //       const min = Math.floor(sec / 60);
                    //       const secRemain = Math.floor(sec % 60);
                    //       setTime({
                    //         min: min,
                    //         sec: secRemain
                    //       });
                    //     }
                    //     // console.log(thisSong);
                    //   }, [isPlaying]);
                    
                    //   useEffect(() => {
                    //     const interval = setInterval(() => {
                    //       if (sound) {
                    //         setSeconds(sound.seek([]));
                    //         const min = Math.floor(sound.seek([]) / 60);
                    //         const sec = Math.floor(sound.seek([]) % 60);
                    //         setCurrTime({
                    //           min,
                    //           sec
                    //         });
                    //       }
                    //     }, 1000);
                    //     return () => clearInterval(interval);
                    //   }, [sound]);