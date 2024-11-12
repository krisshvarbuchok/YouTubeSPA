import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () =>{
    const isAuthenticated = localStorage.getItem('token');
   // console.log(localStorage.getItem('token'));
    
    return isAuthenticated ?  <Outlet /> : <Navigate to='/' replace/>
}
export default PrivateRoute;