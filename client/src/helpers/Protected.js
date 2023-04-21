import { Navigate } from "react-router-dom";
const Protected = ({user, children }) => {
    //need to change variable of 'setAccessToken'
    if (!user){
        return <Navigate to='/' replace />;
    }
    return children;
}
export default Protected;