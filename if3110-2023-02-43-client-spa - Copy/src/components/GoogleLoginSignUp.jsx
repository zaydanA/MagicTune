import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";

export function GoogleLoginSignUp(){
    const {user,isAuthenticated,googleSignin,logout}=useAuth();
    const [cookies,setCookie]=useCookies(["user"]);

    const navigate=useNavigate()

    // console.log(googleSignin)
    async function handleCallbackResponse(response){
        // console.log(response.credential);
        var userObject = jwt_decode(response.credential);
        // console.log(userObject);
        // const new_user={
        //     email:userObject.email,
        //     username:userObject.name,
        //     profile_picture:userObject.picture,
        //     token:response.credential
        // }
        const new_user={
            email:userObject.email,
            username:userObject.name,
        }
        await googleSignin(new_user);
        navigate("/")
    }
    


    useEffect(()=>{
        // const google = window.google;
        /* global google */
        if(!cookies.user){
            google.accounts.id.initialize({
                    client_id:"588103548071-j8lgu4m0q30hoc0hlau0kb8r80rf5l4v.apps.googleusercontent.com",
                    callback: handleCallbackResponse
            })
            google.accounts.id.disableAutoSelect();
            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),{theme:"outline",size:"large",shape: "pill",logo_alignment: "left"
                }
            )
            google.accounts.id.prompt();
        }

    },[user])

    return(
        <div id="signInDiv">
        </div>
    )
}