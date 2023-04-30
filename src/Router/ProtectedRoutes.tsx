import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export const ProtectedRoute = ({redirectPath="/login",children}:any) =>{
    const {isLogged} = useSelector((state:RootState)=> state.auth);
    const token = localStorage.getItem('token')
    // const isLogedIn = true;
    if(!isLogged&&!token) return <Navigate to={redirectPath} replace />
    return children;
}
