import axios from "axios";
import {
    createContext,
    useEffect,
    useContext,
    useReducer,
    useCallback,
  } from "react";
import { useCookies } from "react-cookie";
  
  const BASE_URL = "http://localhost:9000";
  
  const AlbumContext = createContext();
  
  const initialState = {
    albums: [

    ],
    isLoading: false,
    myAlbum: [],
    error: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "loading":
        return { ...state, isLoadingAlbum: true };
  
      case "albums/loaded":
        return {
          ...state,
          isLoadingAlbum: false,
          albums: action.payload,
        };
  
      case "album/loaded":
        return { ...state, isLoadingAlbum: false, myAlbum: action.payload };
  
      case "album/created":
        return {
          ...state,
          isLoadingAlbum: false,
          albums: [...state.albums, action.payload],
        };
  
      case "album/deleted":
        return {
          ...state,
          isLoadingAlbum: false,
          albums: state.albums.filter((album) => album.album_id !== action.payload),
          myAlbum: state.myAlbum.filter((album) => album.album_id !== action.payload),
        };
  
      case "rejected":
        return {
          ...state,
          isLoadingAlbum: false,
          error: action.payload,
        };
  
      default:
        throw new Error("Unknown action type");
    }
  }
  
  function AlbumProvider({ children }) {
    const [{ albums, isLoadingAlbum, myAlbum, error }, dispatch] = useReducer(
      reducer,
      initialState
    );
    
    const [cookies,setCookies]=useCookies();
    // useEffect(function () {
      async function fetchAlbums() {
        dispatch({ type: "loading" });
  
        try {
          const res = await axios.get(import.meta.env.VITE_API_URL + '/album/allAlbum',
              {
                headers:{
                    'Authorization': `Bearer ${cookies.user.token}`
                }
            }
          );
          // console.log(res.data);
          // const data = await res.json();
          dispatch({ type: "albums/loaded", payload: res.data });
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error loading albums...",
          });
        }
      }
      // fetchAlbums();
      // fetchMyAlbum();
    // }, []);

    async function newAlbum(formData) { 
      try {
        dispatch({ type: "loading" });
        const res = await axios.post(import.meta.env.VITE_API_URL + '/album/addAlbum',
        formData,
        {
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${cookies.user.token}`
            }
        }
        );

        // console.log(res.data)
        const new_album={
          album_id:res.data.album_id,
          judul:res.data.judul,
          year:res.data.year,
          image:res.data.image,
          user:{
            username:cookies.user.username
          }
        }
        dispatch({
          type: "album/created",
          payload: new_album,
        });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: error.message,
        });
      }
     }
     
     async function fetchMyAlbum(){
       try {

         const res = await axios.post(import.meta.env.VITE_API_URL + '/album/userAlbum',
         {
           user_id:cookies.user.user_id
          },
          {
            headers:{
              'Authorization': `Bearer ${cookies.user.token}`,
            }
          }
          );
          
          dispatch({
            type: "album/loaded",
            payload: res.data,
          })
          
        } catch (error) {
          
      }
    }
    async function deleteAlbum(album) { 
      try {
        const res = await axios.post(import.meta.env.VITE_API_URL + '/album/deleteAlbum',
        album,
        {
            headers:{
                'Authorization': `Bearer ${cookies.user.token}`
            }
        }
        );
        // console.log(res);
        dispatch({
          type: "album/deleted",
          payload: album.album_id,
        });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: error.message,
        });
      }
     }
    return (
      <AlbumContext.Provider
        value={{
          albums,
          isLoadingAlbum,
          myAlbum,
          error,
          newAlbum,
          deleteAlbum,
          fetchMyAlbum,
          fetchAlbums
        //   getSong,
        //   createSong,
        //   deleteSong,
        }}
      >
        {children}
      </AlbumContext.Provider>
    );
  }
  
  function useAlbums() {
    const context = useContext(AlbumContext);
    if (context === undefined)
      throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
  }
  
  export { AlbumProvider, useAlbums };