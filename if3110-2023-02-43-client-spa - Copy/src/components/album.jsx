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
import { useAlbums } from '../contexts/AlbumContext'
import { IoAlertCircle } from "react-icons/io5";
export function Album(props){
    const [cookies,setCookies]=useCookies();
    const [liked,setLiked]=useState(false);
    const {deleteAlbum,albums,myAlbum} = useAlbums();
    const [isDelete,setIsDelete] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [errorMsgModal,setErrorMsgModal] = useState(null)

    const handleDelete = async (e) => {
        try {
            await deleteAlbum(props.data);

        } catch (error) {
            
        }
    }
    const handleEdit = async (e) => {
        try {
            console.log('aaaaaa')

        } catch (error) {
            
        }
    }
    
    // console.log(props.data.img)
    return(
        <>
            <div className="card" id="song">
                <img className="cardIMG mx-auto object-cover" loading="lazy" src={import.meta.env.VITE_API_URL+'/imgalbum/'+props.data.image}/>
                <h2 className="cardTitle font-bold text-2xl ml-1 mt-2">{props.data.judul}</h2>
                <h4 className="cardAuthor ml-1">{props.data.user.username}</h4>
                <h5 className="cardAuthor ml-1">{props.data.year}</h5>
                    <ReactModal
                        isOpen={isDelete}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={()=>{setIsDelete(false)}}
                        contentLabel="Example Modal"
                        className="w-full h-full blueColor bg-transparent flex justify-center items-center"   
                    >
                        <div className="blueColor w-1/2 h-1/2 rounded-[12px] flex justify-center items-center p-5">
                            <IoAlertCircle className="text-white text-9xl"></IoAlertCircle>
                            <label className="font-['Garamond'] text-white font-bold text-2xl">Hapus Album ?</label>

                            {errorMsgModal && <p className="text-red-500 text-sm font-bold mt-0 text-mid">{errorMsgModal}</p>}
                            <div className="flex flex-row justify-center items-center my-5 gap-5">
                                <button className="font-['Verdana'] bg-white text-black hover:bg-gray-300 rounded-[20px] text-sm w-40 h-6" onClick={()=>{setIsDelete(false)
                                setErrorMsgModal(null);
                                }}> <h3>Cancel</h3> </button>
                                <button className="font-['Verdana'] blueFont text-white hover:bg-blue-800 rounded-[20px] text-sm w-40 h-6" onClick={()=>{handleDelete()}}> <h3>Delete</h3> </button>
                            </div>
                        </div>
                    </ReactModal>
                    <ReactModal
                        isOpen={isEdit}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={()=>{setIsEdit(false)}}
                        contentLabel="Example Modal"
                        className="w-full h-full blueColor bg-transparent flex justify-center items-center"   
                    >
                        <div className="blueColor w-1/2 h-1/2 rounded-[12px] flex justify-center items-center p-5">
                            <IoAlertCircle className="text-white text-9xl"></IoAlertCircle>
                            <label className="font-['Garamond'] text-white font-bold text-2xl">Hapus Album ?</label>

                            {errorMsgModal && <p className="text-red-500 text-sm font-bold mt-0 text-mid">{errorMsgModal}</p>}
                            <div className="flex flex-row justify-center items-center my-5 gap-5">
                                <button className="font-['Verdana'] bg-white text-black hover:bg-gray-300 rounded-[20px] text-sm w-40 h-6" onClick={()=>{setIsEdit(false)
                                setErrorMsgModal(null);
                                }}> <h3>Cancel</h3> </button>
                                <button className="font-['Verdana'] blueFont text-white hover:bg-blue-800 rounded-[20px] text-sm w-40 h-6" onClick={()=>{handleEdit()}}> <h3>Submit</h3> </button>
                            </div>
                        </div>
                    </ReactModal>

                <div className="cardButtonCon">
                    {cookies.user.is_admin || (cookies.user.username === props.data.user.username) && <div className="playButton" onClick={()=>{setIsDelete(true)}}><img src={deleteButton}></img></div>}
                    {cookies.user.is_admin || (cookies.user.username === props.data.user.username) && <div className="playButton" onClick={()=>{setIsEdit(true)}}><img src={editButton}></img></div>}
                </div>
            </div>
        </>
    )
}