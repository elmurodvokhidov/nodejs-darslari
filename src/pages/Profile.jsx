import { useDispatch } from "react-redux";
import { authLogout, authStart } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authStart());
        dispatch(authLogout());
        navigate('/');
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}