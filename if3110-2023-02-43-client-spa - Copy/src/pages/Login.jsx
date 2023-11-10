import { NavLink, useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { useAuth } from "../contexts/FakeAuthContext";
import { GoogleLoginSignUp } from "../components/GoogleLoginSignUp";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "../customHooks/debounce";
import jwtDecode from "jwt-decode";
export function Login(){

    const {user,logout,login,isError,errorMessage,removeErrorRegister,registerError}=useAuth();
    const [cookies,setCookies,removeCookies]=useCookies()
    const [password,setPassword]=useState('')
    const [isEmpty,setIsEmpty]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        if(registerError){navigate('/signup')}
    },[])
    function handleSignOut(event){
        logout();
        // removeCookies("user");
        document.getElementById('signInDiv').hidden=false;
        navigate("/")
    }
    async function handleLogin(e){
        e.preventDefault();
        if(e.target.email.value && e.target.password.value){
            setIsEmpty(false);
            const userLogin={
                email:e.target.email.value,
                password:e.target.password.value
            }
            await login(userLogin);
            navigate("/");

        }else{
            setIsEmpty(true);
        }
    }
    return(
    <div>
        <Navbar></Navbar>
        <div className="containerauth">
                <form className="boxauth" id="formauth" onSubmit={(e)=>{handleLogin(e)}}>
                    <div><header className="hauth">Sign in</header></div>
                        <div className="containerinputauth">
                            <label id="emailLabel" className="labelauth">Email</label>
                            <input id="email" name="email" type="email" className="inputauth medium"/>
                            
                        </div>
                        <div className="containerinputauth">
                            <label className="labelauth">Password</label>
                            <input id="password" name="password" type="password" className="inputauth medium" onChange={()=>{
                                setIsEmpty(false)
                                }}/>
                            <p className="text-gray-400 text-l"><NavLink to="/signup">Belum punya akun?</NavLink></p>
                        </div>
                        <div>
                            {isEmpty?<p className="text-red-500 text-l font-bold mt-10 text-mid">Pastikan semua data terisi!</p>:<p></p>}
                            {isError?<p className="text-red-500 text-l font-bold my-0 text-mid">{errorMessage}</p>:<p></p>}
                        
                        </div>
                        {
                            user?  <button className="btnauth mb-10 mt-6" onClick={handleSignOut}>Sign Out</button> : <button id="signButton" className="btnauth mb-10 mt-6">Sign In</button>
                        }
                        
                    

                        <div className="googleContainer">
                            <div className="textmid">
                                {user? <h1></h1>:<h3 className="text-xl mb-10 font-bold">Or</h3>}
                            </div>
                            <GoogleLoginSignUp></GoogleLoginSignUp>
                        </div>
                    </form>
        </div>
    </div>
    )
}