import { useCookies } from "react-cookie"
import { Navbar } from "../components/navbar"
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import editWhite from '../assets/logo/editWhite.png'
import React, { useEffect, useState } from "react";
import useDebounce from "../customHooks/debounce";
import { AiFillEdit,AiOutlineCheck,AiFillCamera } from "react-icons/ai";
import { IoAlertCircle } from "react-icons/io5";
import axios from "axios";
import jwtDecode from "jwt-decode";
import ReactModal from 'react-modal'
import { FileUploader } from "react-drag-drop-files";
import { CardList } from "../components/cardList";
import { AlbumProvider, useAlbums } from "../contexts/AlbumContext";
import { useSongs } from "../contexts/SongContext";
export function UserPage(){
    const[cookies,setCookies,removeCookies]=useCookies()
    const {user,logout,setUser}=useAuth()
    const navigate=useNavigate();
    const [isPasswordConfirmed,setIsPasswordConfirmed]=useState(true);
    const [isLength,setIsLength]=useState(true);
    const [isEmptyEmail,setIsEmptyEmail]=useState(false);
    const [isEmptyUsername,setIsEmptyUsername]=useState(false);
    
    const [oldPassword,setOldPassword]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [deletePassword,setDeletePassword]=useState('')
    const [email,setEmail]=useState(cookies.user.email);  
    const [username,setUsername]=useState(cookies.user.username);  
    const [isEmptyPassword,setIsEmptyPassword]=useState(false);
    const [isEditUsername,setIsEditUsername]=useState(false);


    const [errorMsg,setErrorMsg]=useState(null);
    const [errorMsgModal,setErrorMsgModal]=useState(null);
    const [errorMsgPassword,setErrorMsgPassword]=useState(null);
    const [isDelete,setIsDelete]=useState(false);
    const [isImage,setIsImage]=useState(false);

    // const [myAlbum,setMyAlbum]=useState(true);

    function handleSignOut(event){
        logout();
        navigate("/login")
    }

    useEffect(()=>{
        if(username === ''){
            setIsEmptyEmail(true);
        }else{
            setIsEmptyEmail(false);
        }
    },[email])

    useEffect(()=>{
        if(username === ''){
            setIsEmptyUsername(true);
        }else{
            setIsEmptyUsername(false);
        }
    },[username])

    const handlePassword = ()=>{
        if(password!=''){
            if(password.length < 8){
                setIsLength(false);
            }else{
                setIsLength(true);
            }
            handleConfirmPassword()
        }else{
            setIsLength(true)
        }
    }

    const handleConfirmPassword = ()=>{
        if(confirmPassword!='' && password!=''){
            if (password===confirmPassword){
                setIsPasswordConfirmed(true);
            }else{
                setIsPasswordConfirmed(false);
            }
        }else{
            setIsPasswordConfirmed(true);
        }
    }

    const handleEditUserPassword = async ()=>{
        if(password !='' && oldPassword != ''){
            if(isPasswordConfirmed){
                setIsEmptyPassword(false);
                try {
                    const res = await axios.post(import.meta.env.VITE_API_URL + "/user/updatePassword", 
                    {
                        user_id:cookies.user.user_id,
                        old_password:oldPassword,
                        new_password:password
                    } ,{
                        headers:{
                            'Authorization': `Bearer ${cookies.user.token}`
                        }
                    })
                    setErrorMsgPassword(null);
                    navigate('/');
                } catch (error) {
                    if(error.response.data.message){
                        setErrorMsgPassword(error.response.data.message);
                    }
                }
            }
            
        }else{
            setIsEmptyPassword(true);
        }
    }

    const handleChangeUsername = async ()=>{
        if(username != ''){
            setErrorMsg(null);
            if(username != cookies.user.username){
                try {
                    const res = await axios.post(import.meta.env.VITE_API_URL + "/user/updateUsername", 
                    {
                        user_id:cookies.user.user_id,
                        username:username
                    } ,{
                        headers:{
                            'Authorization': `Bearer ${cookies.user.token}`
                        }
                    })
                    const userLoggedin = jwtDecode(res.data);
                    const user = {
                        user_id:userLoggedin.user_id,
                        email:userLoggedin.email,
                        username:userLoggedin.username,
                        profile_picture:userLoggedin.profile_picture,
                        is_admin:userLoggedin.is_admin,
                        token:res.data
                    }
                    setUser(user);
                    setIsEditUsername(false);
                } catch (error) {
                    if(error.response.data.message){
                        setErrorMsg(error.response.data.message);
                    }
                }
            }else{
                setIsEditUsername(false);
            }
        }
    }

    const handleDelete = async () => {
            try {
                const res = await axios.post(import.meta.env.VITE_API_URL + "/user/deleteUser", 
                {
                    user_id:cookies.user.user_id,
                    password:deletePassword
                } ,{
                    headers:{
                        'Authorization': `Bearer ${cookies.user.token}`
                    }
                })

                logout();
                navigate("/login");
            } catch (error) {
                if(error.response.data.message){
                    setErrorMsgModal(error.response.data.message);
                }
            }
    }
    const debounceOnChange = useDebounce(handlePassword);
    const dobounceConfirmPassword = useDebounce(handleConfirmPassword);

    const [file, setFile] = useState(null);
    const [filePreview,setFilePreview] = useState(null);
    const fileTypes = ["JPG", "PNG", "JPEG"];
    const handleChange = (file) => {
      setFile(file);
      setFilePreview(URL.createObjectURL(file))


    };

    const handleUpdatePhoto = async ()=>{
        if(file !== null){
            const formData = new FormData();
            formData.append('file', file);
            try {
                const res = await axios.post(import.meta.env.VITE_API_URL + '/user/updateUserPhoto',
                formData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${cookies.user.token}`
                    }
                }
                );
                
                const userLoggedin2 = jwtDecode(res.data);
                const user2 = {
                user_id:userLoggedin2.user_id,
                email:userLoggedin2.email,
                username:userLoggedin2.username,
                profile_picture:userLoggedin2.profile_picture,
                is_admin:userLoggedin2.is_admin,
                token:res.data
                }
                setFile(null);
                setFilePreview(null)
                setUser(user2);
                setIsImage(false);
                navigate('/user');
            } catch (error) {
                
            }
        }else{
            setIsImage(false);
        }
    }

    const {fetchMyAlbum,myAlbum} = useAlbums();
    useEffect(()=>{
        
        fetchMyAlbum();
        console.log(myAlbum);
    },[])

    return(
        <>
            <Navbar></Navbar>
            <ReactModal
                isOpen={isDelete}
                // onAfterOpen={afterOpenModal}
                onRequestClose={()=>{setIsDelete(false)}}
                contentLabel="Example Modal"
                className="w-full h-full blueColor bg-transparent flex justify-center items-center"   
            >
                <div className="blueColor w-1/2 h-1/2 rounded-[12px] flex justify-center items-center p-5">
                    <IoAlertCircle className="text-white text-9xl"></IoAlertCircle>
                    <label className="font-['Garamond'] text-white font-bold text-2xl">Hapus Akun ?</label>

                    <div className="w-full">
                        <label className="font-['Garamond'] text-white font-bold">Password </label>
                        <input type="password" className="font-['Open_Sans'] w-full my-1 h-7 px-2 rounded-[12px]" placeholder="Leave blank if using google" onChange={(e)=>{
                                            setDeletePassword(e.target.value);
                                            }}></input>
                    </div>
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
                isOpen={isImage}
                // onAfterOpen={afterOpenModal}
                onRequestClose={()=>{setIsImage(false)}}
                contentLabel="Example Modal"
                className="w-full h-full blueColor bg-transparent flex justify-center items-center"   
            >
                <div className="blueColor w-[500px] h-[500px] rounded-[12px] flex justify-center items-center p-5">
                <div className="mb-5">
                <FileUploader className="w-1/2 h-1/2 border-white border-1 border rounded-[12px] flex p-1 blueFont flex" handleChange={handleChange} name="file" types={fileTypes}
                    children={
                        <div className="w-[250px] h-[250px] border-white border-1 border rounded-[12px] flex p-1 blueFont">
                            {filePreview ? <img src={filePreview} className="rounded-[9px] w-full h-full object-cover"/> : <AiFillCamera className="text-white mx-auto my-auto text-8xl"></AiFillCamera>}
                        </div>
                    }
                />
                </div>
                
                <FileUploader handleChange={handleChange} name="file" types={fileTypes}/>

                    <div className="flex flex-row justify-center items-center my-5 gap-5 w-full">
                        <button className="font-['Verdana'] bg-white text-black hover:bg-gray-300 rounded-[20px] text-sm w-1/3 h-6" onClick={()=>{setIsImage(false)
                        setFilePreview(null);
                        }}> <h3>Cancel</h3> </button>
                        <button className="font-['Verdana'] blueFont text-white hover:bg-blue-800 rounded-[20px] text-sm w-1/3 h-6" onClick={()=>{
                            handleUpdatePhoto();

                        }}> <h3>Save</h3> </button>
                    </div> 
                </div>
            </ReactModal>
            <div className="px-8 justify-center flex items-center">

            <div className="container px-1 mt-10 mb-5 py-10 mx-auto flex flex-wrap lg:flex-row blueFont justify-center rounded-[15px] items-center">
                <div className="h-full p-1 lg:w-1/3 flex justify-center items-center">
                    <div className="px-10 lg:px-2 py-0 relative text-cente justify-center items-center flex">
                        <h1 className="font-['Garamond'] font-bold mb-4 text-white text-xl sm:text-3xl lg:text-3xl">Pengaturan Pengguna</h1>
                        <div className="flex justify-center items-center">
                            <img src={import.meta.env.VITE_API_URL+'/img/'+cookies.user.profile_picture} className="rounded-full h-1/2 w-1/2 w-[200px] h-[200px] lg:w-[200px] lg:h-[200px] object-cover"/>
                        </div>
                        <img src={editWhite} onClick={()=>{setIsImage(true)}} className="mt-2 w-10 cursor-pointer"/>
                    </div>
                </div>
                <div className="h-full p-1 lg:w-3/6 px-3">
                    <div className="relative">
                        <div className="mt-2">
                            <label className="font-['Garamond'] text-white font-bold">Email</label>
                            <div className="flex flex-row items-center">
                                <input className="font-['Open_Sans'] w-full my-1 h-7 px-2 rounded-[12px]" defaultValue={email} readOnly></input>
                            </div>
                            {isEmptyEmail?<p className="text-red-500 text-sm font-bold mt-1 text-mid">Pastikan email terisi!</p>:<p className=""></p>}
                        </div>
                        <div className="mt-0">
                            <label className="font-['Garamond'] text-white font-bold">Username</label>
                            <div className="flex flex-row items-center">
                            
                                {!isEditUsername?<input className="font-['Open_Sans'] w-full my-1 h-7 px-2 rounded-[12px]" defaultValue={username} readOnly></input>:<input className="font-['Open_Sans'] w-full my-1 h-7 px-2 rounded-[12px]" defaultValue={username} onChange={(e)=>{setUsername(e.target.value)}}></input>}
                                {!isEditUsername?<AiFillEdit className="ml-2 text-white cursor-pointer" onClick={()=>{setIsEditUsername(true)}}/> : <AiOutlineCheck className="ml-2 text-white cursor-pointer" onClick={()=>{
                                    handleChangeUsername();
                                    }}/>}
                            </div>
                            {isEmptyUsername?<p className="text-red-500 text-sm font-bold mt-1 text-mid">Pastikan username terisi!</p>:<p className=""></p>}
                            {errorMsg?<p className="text-red-500 text-sm font-bold mt-1 text-mid">{errorMsg}</p>:<p className=""></p>}
                        </div>
                        <label className="font-['Garamond'] text-white font-bold">Old Password</label>
                                <input type="password" className="font-['Open_Sans'] w-full my-1 h-7 px-2 rounded-[12px]" onChange={(e)=>{
                                    setOldPassword(e.target.value);
                                    }}></input>
                        <div className="flex flex-row w-full">
                            <div className=" mr-1 w-full">
                                <label className="font-['Garamond'] text-white font-bold">New Password</label>
                                <input type="password" className="font-['Open_Sans'] w-full my-1 h-7 px-2 rounded-[12px]" onChange={(e)=>{
                                    debounceOnChange()
                                    setPassword(e.target.value);
                                    }}></input>
                                {isLength? <p className="text-red-500 text-sm mt-5"></p> : <p className="text-red-500 text-sm" >Password Minimal 8 karakter</p>}
                            </div>
                            <div className=" ml-1 w-full">
                                <label className="font-['Garamond'] text-white font-bold">Confirm Password</label>
                                <input type="password" className="font-['Open_Sans'] w-full my-1 h-7 px-2 rounded-[12px]" onChange={(e)=>{
                                    dobounceConfirmPassword();
                                    setConfirmPassword(e.target.value);
                                    }}></input>
                                {isPasswordConfirmed? <p className="text-red-500 text-sm"></p> : <p className="text-red-500 text-sm ">Password tidak cocok</p>}
                            </div>
                        </div>
                    </div>
                    {isEmptyPassword && <p className="text-red-500 text-sm font-bold text-mid">Semua password wajib diisi</p>}
                    {errorMsgPassword?<p className="text-red-500 text-sm font-bold mt-1 text-mid">{errorMsgPassword}</p>:<p className=""></p>}
                    <button className="font-['Verdana'] bg-blue-800 text-white mb-4 mt-2 hover:bg-blue-700 py-1 px-5 rounded-[20px] text-sm" onClick={handleEditUserPassword}> Change Password </button>

                </div>
                <div className="h-full p-1 lg:w-1/6">
                <div className="relative flex">
                </div>
                </div>
                    <button className="font-['Verdana'] blueColor text-white mt-4 hover:bg-blue-800 py-2 px-5 rounded-[20px] text-xl" onClick={handleSignOut}> Logout </button>
            </div>
                    <div className="mb-10">

                        <button className="font-['Verdana'] bg-red-700 text-white hover:bg-red-800 py-1 px-3 rounded-[20px] text-sm" onClick={()=>{setIsDelete(true)}}> Delete Account </button>
                    </div>      
                    
                    {myAlbum? <CardList song={false} data={myAlbum}></CardList> : <div className="text-2xl w-1/2 h-1/2 rounded-[12px] blueFont text-white text-mid py-2 px-1">No User Album</div>}
   
                    <div className="mt-14"></div>
            </div>
            
        </>

    )
}