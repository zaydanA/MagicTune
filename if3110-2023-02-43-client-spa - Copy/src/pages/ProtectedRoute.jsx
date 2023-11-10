import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function ProtectedRoute({children}){
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const [cookies,setCookies,removeCookies]=useCookies(["user"]);
    useEffect(()=>{
        if(!isAuthenticated || !cookies.user){
            navigate("/login");
        }
    },[isAuthenticated,navigate,cookies.user])
    return isAuthenticated || cookies.user ? children : null;
}

export default ProtectedRoute;