import { useEffect, useState } from "react";
import { GoogleLoginSignUp } from "../components/GoogleLoginSignUp";
import { Navbar } from "../components/navbar";
import { useAuth } from "../contexts/FakeAuthContext";
import { debounce } from "lodash";
import useDebounce from "../customHooks/debounce";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function SignUp(){
    const {user,registerError,errorMessageRegister,removeError,register,logout}=useAuth()
    const [isPasswordConfirmed,setIsPasswordConfirmed]=useState(true);
    const [isLength,setIsLength]=useState(true);
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [isEmpty,setIsEmpty]=useState(false);
    const [cookies,setCookies,removeCookies]=useCookies();
    const navigate=useNavigate();

    useEffect(()=>{
        removeError();
    },[])

    function handleSignOut(){
        logout();
        removeCookies("user")
        document.getElementById('signInDiv').hidden=false;
        navigate("/")
    }
    
    const handleRegister= async (e)=>{
        e.preventDefault();
        if(e.target.username.value && e.target.email.value && e.target.password.value && confirmPassword && password && isPasswordConfirmed && isLength){
            const new_user={
                username:e.target.username.value,
                email:e.target.email.value,
                password:e.target.password.value
            }
            await register(new_user);
            navigate('/')

        }else{
            setIsEmpty(true);
        }
        // console.log(e.target);
    }

    const handlePassword = ()=>{
        if(password!=''){
            if(password.length < 8){
                setIsLength(false);
            }else{
                setIsLength(true);
            }
            setIsEmpty(false)
        }else{
            setIsLength(true)
        }
    }

    const handleConfirmPassword = ()=>{
        if(confirmPassword!='' && password!=''){
            if (password===confirmPassword){
                console.log(true);
                setIsPasswordConfirmed(true);
            }else{
                console.log(false);
                setIsPasswordConfirmed(false);
            }
            setIsEmpty(false)
        }else{
            setIsPasswordConfirmed(true);
        }
    }

    const debounceOnChange = useDebounce(handlePassword);
    const dobounceConfirmPassword = useDebounce(handleConfirmPassword);
    return(
    <>
    <Navbar></Navbar>
    <div className="containerauth">
        <form className="boxauth" id="formauth" onSubmit={(e)=>handleRegister(e)}>
            <header className="hauth">Sign up</header>
            <div className="containerinputauth">
                <label className="labelauth">Username</label>
                <input type="text" name="username" className="inputauth medium" id="username"/>
            </div>
            <div className="containerinputauth">
                <label className="labelauth">Email</label>
                <input type="email" name="email" className="inputauth medium" id="email"/>
            </div>
            <div className="containerinputauth">
                <label className="labelauth">Password</label>
                <input type="password" name="password" className="inputauth medium" id="password" onChange={(e)=>{
                    debounceOnChange()
                    setPassword(e.target.value);
                    }}/>
                    {isLength? <p></p> : <p>Password Minimal 8 karakter</p>}
            </div>
            <div className="containerinputauth">
                <label className="labelauth">Confirm Password</label>
                <input type="password" className={!isPasswordConfirmed? "inputauth medium borderred":"inputauth medium"} id="confirm" onChange={(e)=>{
                    dobounceConfirmPassword();
                    setConfirmPassword(e.target.value);
                    }}/>
                {isPasswordConfirmed? <p></p> : <p>Password tidak cocok</p>}
            </div>

            {isEmpty?<p className="text-red-500 text-l font-bold mt-3 text-mid">Pastikan semua data terisi!</p>:<p></p>}
            {registerError?<p className="text-red-500 text-l font-bold my-0 text-mid">{errorMessageRegister}</p>:<p></p>}

            {
                user?  <button className="btnauth mt-6" onClick={handleSignOut}>Sign Out</button> : <button id="signButton" className="btnauth mt-6">Sign In</button>
            }

            <div className="googleContainer">
                <div className="textmid">
                    {user? <h1></h1>:<h3 className="text-xl my-1 font-bold">Or</h3>}
                </div>
                <GoogleLoginSignUp></GoogleLoginSignUp>
            </div>
        </form>    
    </div>
        </>
    )
}