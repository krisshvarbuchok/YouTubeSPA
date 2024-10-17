import { useNavigate } from "react-router-dom";
import styles from './logOut.module.css';
import { useDispatch } from "react-redux";
import { writeRequest } from "../../../redux/listSlice/RequestSlice";
import { removeList } from "../../../redux/listSlice/listSlice";

const LogOut = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleClick = () =>{
        //localStorage.clear()
        localStorage.removeItem('token')
        console.log(localStorage.getItem('token'));
        dispatch(writeRequest(''))
        dispatch(removeList([]))
        navigate('/')
    }
    return (
        <button className={styles.buttonLogOut} onClick={()=>handleClick()}>Выход</button>
    )
}
export default LogOut;