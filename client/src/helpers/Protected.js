import { Navigate } from "react-router-dom";
const Protected = ({setAccesToken, children }) => {
    //need to change variable of 'setAccessToken'
    if (!setAccesToken){
        return <Navigate to='/' replace />;
    }
    return children;
}
export default Protected;