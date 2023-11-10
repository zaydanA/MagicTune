import {
    createContext,
    useEffect,
    useContext,
    useReducer,
    useCallback,
  } from "react";
  
  // const BASE_URL = "http://localhost:9000";
  
  const SongContext = createContext();
  
  const initialState = {
    songs: [
        {
            "song_id":1,
            "judul":"Shallow",
            "penyanyi":"Lady Gaga, Bradley Cooper",
            "year":2019,
            "image":"song.png",
            "audio":"song.mp3",
            "lyric":`I threw a wish in the well
            Don't ask me, I'll never tell
            I looked to you as it fell
            And now you're in my way
            I trade my soul for a wish
            Pennies and dimes for a kiss
            I wasn't looking for this
            But now you're in my way
            Your stare was holdin'
            Ripped jeans, skin was showin'
            Hot night, wind was blowin'
            Where you think you're going, baby?
            Hey, I just met you, and this is crazy
            But here's my number, so call me, maybe
            It's hard to look right at you, baby
            But here's my number, so call me, maybe
            Hey, I just met you, and this is crazy
            But here's my number, so call me, maybe
            And all the other boys try to chase me
            But here's my number, so call me, maybe
            You took your time with the call
            I took no time with the fall
            You gave me nothing at all
            But still, you're in my way
            I beg and borrow and steal
            At first sight, and it's real
            I didn't know I would feel it
            But it's in my way
            Your stare was holdin'
            Ripped jeans, skin was showin'
            Hot night, wind was blowin'
            Where you think you're going, baby?
            Hey, I just met you, and this is crazy
            But here's my number, so call me, maybe
            It's hard to look right at you, baby
            But here's my number, so call me, maybe
            Hey, I just met you, and this is crazy
            But here's my number, so call me, maybe
            And all the other boys try to chase me
            But here's my number, so call me, maybe
            Before you came into my life, I missed you so bad
            I missed you so bad, I missed you so, so bad
            Before you came into my life, I missed you so bad
            And you should know that
            I missed you so, so bad
            (Bad, bad, bad, bad, bad, bad)
            It's hard to look right at you, baby
            But here's my number, so call me, maybe
            Hey, I just met you, and this is crazy
            But here's my number, so call me, maybe
            And all the other boys try to chase me
            But here's my number, so call me, maybe
            Before you came into my life, I missed you so bad
            I missed you so bad, I missed you so, so bad
            Before you came into my life, I missed you so bad
            And you should know that
            So call me maybe
          `
        },
        {
            "song_id":2,
            "judul":"Viva La Vida",
            "penyanyi":"Coldplay",
            "year":2019,
            "image":"song.png",
            "audio":"song2.mp3",
            "lyric":`I used to rule the world
            Seas would rise when I gave the word
            Now in the morning, I sleep alone
            Sweep the streets I used to own
            I used to roll the dice
            Feel the fear in my enemy's eyes
            Listen as the crowd would sing
            Now the old king is dead, long live the king
            One minute, I held the key
            Next the walls were closed on me
            And I discovered that my castles stand
            Upon pillars of salt and pillars of sand
            I hear Jerusalem bells a-ringin'
            Roman Cavalry choirs are singin'
            Be my mirror, my sword and shield
            My missionaries in a foreign field
            For some reason, I can't explain
            Once you'd gone, there was never, never an honest word
            And that was when I ruled the world
            It was a wicked and wild wind
            Blew down the doors to let me in
            Shattered windows and the sound of drums
            People couldn't believe what I'd become
            Revolutionaries wait
            For my head on a silver plate
            Just a puppet on a lonely string
            Oh, who would ever want to be king?
            I hear Jerusalem bells a-ringin'
            Roman Cavalry choirs are singing
            Be my mirror, my sword and shield
            My missionaries in a foreign field
            For some reason, I can't explain
            I know Saint Peter won't call my name
            Never an honest word
            But that was when I ruled the world
            Oh-oh-oh, oh-oh, oh
            Oh-oh-oh, oh-oh, oh
            Oh-oh-oh, oh-oh, oh
            Oh-oh-oh, oh-oh, oh
            Oh-oh-oh, oh-oh, oh
            I hear Jerusalem bells a-ringin'
            Roman Cavalry choirs are singin'
            Be my mirror, my sword and shield
            My missionaries in a foreign field
            For some reason I can't explain
            I know Saint Peter won't call my name
            Never an honest word
            But that was when I ruled the world
            `
        },
        {
            "song_id":3,
            "judul":"Viva La Vida",
            "penyanyi":"Coldplay",
            "year":2019,
            "image":"song.png",
            "audio":"song2.mp3",
            "lyric":`I used to rule the world
            Seas would rise when I gave the word
            Now in the morning, I sleep alone
            Sweep the streets I used to own
            I used to roll the dice
            Feel the fear in my enemy's eyes
            Listen as the crowd would sing
            Now the old king is dead, long live the king
            One minute, I held the key
            Next the walls were closed on me
            And I discovered that my castles stand
            Upon pillars of salt and pillars of sand
            I hear Jerusalem bells a-ringin'
            Roman Cavalry choirs are singin'
            Be my mirror, my sword and shield
            My missionaries in a foreign field
            For some reason, I can't explain
            Once you'd gone, there was never, never an honest word
            And that was when I ruled the world
            It was a wicked and wild wind
            Blew down the doors to let me in
            Shattered windows and the sound of drums
            People couldn't believe what I'd become
            Revolutionaries wait
            For my head on a silver plate
            Just a puppet on a lonely string
            Oh, who would ever want to be king?
            I hear Jerusalem bells a-ringin'
            Roman Cavalry choirs are singing
            Be my mirror, my sword and shield
            My missionaries in a foreign field
            For some reason, I can't explain
            I know Saint Peter won't call my name
            Never an honest word
            But that was when I ruled the world
            Oh-oh-oh, oh-oh, oh
            Oh-oh-oh, oh-oh, oh
            Oh-oh-oh, oh-oh, oh
            Oh-oh-oh, oh-oh, oh
            Oh-oh-oh, oh-oh, oh
            I hear Jerusalem bells a-ringin'
            Roman Cavalry choirs are singin'
            Be my mirror, my sword and shield
            My missionaries in a foreign field
            For some reason I can't explain
            I know Saint Peter won't call my name
            Never an honest word
            But that was when I ruled the world
            `
        }
    ],
    isPlaying: false,
    currentSong: null,
    currentIndex:null,
    error: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "loading":
        return { ...state, isPlaying: true };
  
      case "songs/loaded":
        return {
          ...state,
          isPlaying: false,
          songs: action.payload,
        };
  
      case "song/loaded":
        return { ...state, isPlaying: true, currentSong: action.payload, currentIndex:action.index};
      
      case "song/isPlaying":
        return { ...state, isPlaying: action.payload };
      
      case "song/next":
        return { ...state, isPlaying: false, currentSong: action.payload, currentIndex:action.index};
      // case "song/created":
      //   return {
      //     ...state,
      //     isPlaying: false,
      //     cities: [...state.cities, action.payload],
      //     currentSong: action.payload,
      //   };
  
      // case "song/deleted":
      //   return {
      //     ...state,
      //     isPlaying: false,
      //     cities: state.cities.filter((song) => song.id !== action.payload),
      //     currentSong: {},
      //   };
  
      case "rejected":
        return {
          ...state,
          isPlaying: false,
          error: action.payload,
        };
  
      default:
        throw new Error("Unknown action type");
    }
  }
  
  function SongProvider({ children }) {
    const [{ songs, isPlaying, currentSong, currentIndex, error }, dispatch] = useReducer(
      reducer,
      initialState
    );
  
    useEffect(function () {
      async function fetchSongs() {
        dispatch({ type: "loading" });
  
        try {
        //   const res = await fetch(`${BASE_URL}/cities`);
          const res = songs;
          const data = await res.json();
          dispatch({ type: "songs/loaded", payload: data });
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error loading songs...",
          });
        }
      }
      fetchSongs();
    }, []);
    
    
    const setCurrSong = useCallback(
      async function setCurrSong(idx) {
        // if (Number(id) === currentSong.id) return;
        // dispatch({ type: "loading" });
        try {
          // console.log(idx);
          const res = songs[idx];
          // console.log(res);
          const index=idx;
          dispatch({ type: "song/loaded", payload: res ,index:index});
        } catch {
          console.log('eror')
          dispatch({
            type: "rejected",
            payload: "There was an error loading the song...",
          });
        }
      },
      [currentSong]
    );
    
    const setIsPlaying = useCallback(
      async function setIsPlaying(boolean) {
  
        // dispatch({ type: "loading" });
        try {
          dispatch({ type: "song/isPlaying", payload: boolean });
        } catch {
          console.log('eror');
          dispatch({
            type: "rejected",
            payload: "There was an error loading the song...",
          });
        }
      },
      [isPlaying]
    );
    // const setNextSong = useCallback(
    //   async function setNextSong() {
    //     // dispatch({ type: "loading" });
    //     try {
    //       var new_index;
    //       console.log(currentIndex);

    //       if(currentIndex+1===songs.length){
    //         new_index=0;
    //       }else{
    //         new_index=currentIndex+1;

    //       }
    //       const res=songs[new_index];
    //       console.log(res);
    //       dispatch({ type: "song/next", payload: res, index:new_index });
    //     } catch {
    //       console.log('eror');
    //       dispatch({
    //         type: "rejected",
    //         payload: "There was an error loading the song...",
    //       });
    //     }
    //   },
    //   [isPlaying]
    // );
    // const getSong = useCallback(
    //   async function getSong(id) {
    //     if (Number(id) === currentSong.id) return;
  
    //     // dispatch({ type: "loading" });
  
    //     try {
    //     //   const res = await fetch(`${BASE_URL}/cities/${id}`);
    //       const res = await fetch(`${BASE_URL}/cities/${id}`);
    //       const data = await res.json();
    //       dispatch({ type: "song/loaded", payload: data });
    //     } catch {
    //       dispatch({
    //         type: "rejected",
    //         payload: "There was an error loading the song...",
    //       });
    //     }
    //   },
    //   [currentSong.id]
    // );
  
    // async function createSong(newsong) {
    // //   dispatch({ type: "loading" });
  
    //   try {
    //     const res = await fetch(`${BASE_URL}/cities`, {
    //       method: "POST",
    //       body: JSON.stringify(newsong),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     const data = await res.json();
  
    //     dispatch({ type: "song/created", payload: data });
    //   } catch {
    //     dispatch({
    //       type: "rejected",
    //       payload: "There was an error creating the song...",
    //     });
    //   }
    // }
  
    // async function deletesong(id) {
    //   dispatch({ type: "loading" });
  
    //   try {
    //     await fetch(`${BASE_URL}/cities/${id}`, {
    //       method: "DELETE",
    //     });
  
    //     dispatch({ type: "song/deleted", payload: id });
    //   } catch {
    //     dispatch({
    //       type: "rejected",
    //       payload: "There was an error deleting the song...",
    //     });
    //   }
    // }
  
    return (
      <SongContext.Provider
        value={{
          songs,
          isPlaying,
          currentIndex,
          currentSong,
          error,
          setCurrSong,
          setIsPlaying,
          // setNextSong
        }}
      >
        {children}
      </SongContext.Provider>
    );
  }
  
  function useSongs() {
    const context = useContext(SongContext);
    if (context === undefined)
      throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
  }
  
  export { SongProvider, useSongs };