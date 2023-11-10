import { Navbar } from "../components/navbar";
import { useAlbums } from "../contexts/AlbumContext"
import { useSongs } from "../contexts/SongContext";


export function AddSong(){
    const {albums}=useAlbums();
    const {songs}=useSongs();
    return(
        <>
        <Navbar></Navbar>
        <form id="fileUploadForm" method='POST' encType="multipart/form-data">
            <div className="container-auth">
                <div className="box-auth">
                    <header className="h-auth">Add Song</header>
                    <div className="container-input-auth">
                        <label name="judul" className="label-auth">Title</label>
                        <input name="judul" id='songTitle' type="text" className="input-auth medium"/>
                    </div>
                    <div className="container-input-auth">
                        <label className="label-auth">Author</label>
                        <input name="penyanyi" id='songAuthor' type="text" className="input-auth medium"/>
                    </div>
                    <div className="container-input-auth">
                        <label className="label-auth">Year</label>
                        <input name="year" id='songYear' type="text" className="input-auth medium" value={new Date().getFullYear()} readOnly/>
                    </div>
                    <div className="container-input-auth flex">
                        <label className="label-auth">Album</label>
                        <select name="album_id" id="option" value="">
                        <option defaultValue="undef"> -- select an option -- </option>
                            {
                                albums.map((album,index)=>(<option key={index} value={album.id}>{album.judul}</option>))
                                
                            }
                        </select>
                    </div>

                    <div className="container-input-auth">
                            <label className="label-auth flex">Audio</label>
                            <input className="inputAudio" type="file" id="audioInput" name="audio" accept=".mp3"/>
                    </div>
                    <div className="container-input-auth">
                            <label className="label-auth flex">Image</label>
                            <input className="inputAudio" type="file" id="imageInput" name="image" accept=".jpg, .jpeg, .png"/>
                    </div>
                    <button className="btn-auth" type="button" id="submitForm">Upload</button>
                </div>    
            </div>
        </form>
        </>
    )
}