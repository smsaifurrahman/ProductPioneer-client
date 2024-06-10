import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";


const AdminRoute = ({children}) => {
    const {data, isLoading} = useRole();
    
    if(isLoading)  return <span className="loading loading-dots loading-lg"></span>
    if(data?.role === 'admin') return children


    return <Navigate to={'/dashboard'}></Navigate>
};

export default AdminRoute;