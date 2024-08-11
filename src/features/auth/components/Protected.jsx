import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../authSlice';
import { selectUserInfo } from '../../user/userSlice';

function Protected({ children }) {
    const user = useSelector(selectLoggedInUser);
    const userInfo = useSelector(selectUserInfo)

    console.log("user", user)
    console.log("userInfo", userInfo)

    if (!user) {
        console.log("user")
        return <Navigate to="/login" replace={true}></Navigate>;
    }
    // if (user && userInfo.role !== "admin") {
    //     return <Navigate to="/" replace={true}></Navigate>;
    // }
    return children;
}

export default Protected;
