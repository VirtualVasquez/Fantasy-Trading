import { Navigate } from "react-router-dom";
const Protected = ({localToken, children }) => {
    //need to change variable of 'setAccessToken'
    if (!localToken){
        return <Navigate to='/' replace />;
    }
    return children;
}
export default Protected;