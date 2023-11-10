import { useState } from "react";
import { Navbar } from "../components/navbar";
import { useAlbums } from "../contexts/AlbumContext"
import { FileUploader } from "react-drag-drop-files";
import { AiFillCamera } from "react-icons/ai";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function AddAlbum(){
    const {newAlbum}=useAlbums();
    const [cookies,setCookies]=useCookies();
    const [file,setFile]=useState(null);
    const [penyanyi,setPenyanyi]=useState(null);
    const [judul,setJudul]=useState(null);

    const [error,setError]=useState(null);
    const navigate=useNavigate();

    const fileTypes = ["JPG", "PNG", "JPEG"];

    const handleChange = (file)=>{
        setFile(file);
    }

    const handleUpload = async ()=>{
        const year = new Date().getFullYear();
    
        if(file !== null && judul && year){
            setError(null);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('judul', judul);
            formData.append('year', year);
            try {
                await newAlbum(formData);
                
                navigate("/album");
            } catch (error) {
                setError(error.message);
            }
        }else{
            setError('Pastikan semua data terisi')
        }
        
    }

    return(
        <>
        <Navbar></Navbar>
            <div className="container-auth">
                <div className="box-auth">
                    <header className="h-auth">Add Album</header>
                    <div className="container-input-auth">
                        <label name="judul" className="label-auth">Title</label>
                        <input name="judul" id='songTitle' type="text" className="input-auth medium" onChange={(e)=>{setJudul(e.target.value)}}/>
                    </div>

                    <div className="container-input-auth">
                        <label className="label-auth">Year</label>
                        <input name="year" id='songYear' type="text" className="input-auth medium" value={new Date().getFullYear()} readOnly/>
                    </div>
                    <div className="container-input-auth">
                            <label className="label-auth flex">Image</label>
                            <FileUploader className="w-1/2 h-1/2 border-white border-1 border rounded-[12px] flex p-1 blueFont flex" handleChange={handleChange} name="file" types={fileTypes}/>
                    </div>
                    <div className="flex justify-center items-center">
                        {error && <p className="text-red-500 text-md font-bold mt-0 text-mid mb-2">{error}</p>}
                        <button className="btn-auth" id="submitForm" onClick={handleUpload}>Upload</button>
                    </div>
                </div>    
            </div>
        </>
    )
}