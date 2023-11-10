import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useContext, useReducer } from "react";
import { useCookies } from "react-cookie";


const AuthContext = createContext();

const initialState = {
    user:null,
    isAuthenticated:false,
    isError:false,
    errorMessage:'',
    registerError:false,
    errorMessageRegister:'',
}

function reducer(state,action){
    switch(action.type){
        case 'login':
            return {...state,user:action.payload,isAuthenticated:true,isError:false}
        case 'logout':
            return {...state,user:null,isAuthenticated:false,isError:false}
        case 'googleSignin':
            return {...state,user:action.payload,isAuthenticated:true,isError:false}
        case 'cookieSignin':
            return {...state,user:action.payload,isAuthenticated:true}
        case 'error':
            return {...state,isError:action.isError,errorMessage:action.payload}
        case 'removeError':
            return {...state,isError:false,errorMessage:''}
        case 'errorRegister':
            return {...state,registerError:action.isError,errorMessageRegister:action.payload}
        case 'removeErrorRegister':
            return {...state,registerError:false,errorMessageRegister:''}
    }
}

function AuthProvider({children}){
    const [{ user, isAuthenticated, isError, errorMessage,registerError,errorMessageRegister }, dispatch] = useReducer(
        reducer,
        initialState
      );
    
    const [cookies,setCookies,removeCookies]=useCookies();
    async function login(reqUser){
        try {            
            const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login',reqUser);
            if(res.data.message){
                throw new Error(res.data.message)
            }
            const userLoggedin = jwtDecode(res.data);
            const user = {
                user_id:userLoggedin.user_id,
                email:userLoggedin.email,
                username:userLoggedin.username,
                profile_picture:userLoggedin.profile_picture,
                is_admin:userLoggedin.is_admin,
                token:res.data
            }
            setCookies("user", user, { path: '/' });
            dispatch({type:'login',payload:user}) ;
        } catch (error) {
            // console.log(error);
            // console.log(error.response.data.message);
            dispatch({type:'error',payload:error.response.data.message,isError:true}); 
        }
    }
    function logout(){
        removeCookies("user");
        dispatch({type:'logout'});
    }
    async function googleSignin(reqUser){
        // console.log(reqUser);
        try {            
            const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/google',reqUser);
            if(res.data.message){
                throw new Error(res.data.message)
            }
            const userLoggedin = jwtDecode(res.data);
            const user = {
                user_id:userLoggedin.user_id,
                email:userLoggedin.email,
                username:userLoggedin.username,
                profile_picture:userLoggedin.profile_picture,
                is_admin:userLoggedin.is_admin,
                token:res.data
            }
            setCookies("user", user, { path: '/' });
            dispatch({type:'googleSignin',payload:user}) 
        } catch (error) {
            // console.log(error);
            // console.log(error.response.data.message);
            dispatch({type:'errorRegister',payload:error.response.data.message,isError:true}); 
        }
    }
    function cookieSignin(reqUser){
        // console.log(reqUser);
        dispatch({type:'cookieSignin',payload:reqUser}) 
    }
    function removeError(){
        // console.log(reqUser);
        dispatch({type:'removeError'});  
    }
    function removeErrorRegister(){
        // console.log(reqUser);
        dispatch({type:'removeErrorRegister'});  
    }
    async function register(newUser) { 
        try {            
            const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/register',newUser);
            if(res.data.message){
                throw new Error(res.data.message)
            }
            const userLoggedin = jwtDecode(res.data);
            const user = {
                user_id:userLoggedin.user_id,
                email:userLoggedin.email,
                username:userLoggedin.username,
                profile_picture:userLoggedin.profile_picture,
                is_admin:userLoggedin.is_admin,
                token:res.data
            }
            setCookies("user", user, { path: '/' });
            dispatch({type:'login',payload:user});
            
            return true;
        } catch (error) {
            // console.log(error);
            // console.log(error.response.data.message);
            dispatch({type:'errorRegister',payload:error.response.data.message,isError:true}); 
            return false;
        }
    }
    function setUser(reqUser){
        setCookies("user", reqUser, { path: '/' });
        dispatch({type:'login',payload:reqUser}) 
    }
    return (
        <AuthContext.Provider value={{
            user,isAuthenticated,isError,errorMessageRegister,registerError,errorMessage,login,logout,googleSignin,cookieSignin,removeError,register,removeErrorRegister,setUser
        }}>{children}</AuthContext.Provider>
    )
}

function useAuth(){
    const context=useContext(AuthContext);
    if(context===undefined){
        throw new Error("AuthContext was used outside AuthProvider");
    }
    return context;
}

export {AuthProvider,useAuth};

