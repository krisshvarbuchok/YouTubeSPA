import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import styles from './logOut.module.css';

const LogOut = () =>{
    const navigate = useNavigate()
    const handleClick = () =>{
        localStorage.clear()
        console.log(localStorage.getItem('token'));
        
        navigate('/')
    }
    return (
        <button className={styles.buttonLogOut} onClick={()=>handleClick()}>Выход</button>
    )
}
export default LogOut;