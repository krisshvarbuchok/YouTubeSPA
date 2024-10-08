import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

const LogOut = () =>{
    const navigate = useNavigate()
    const handleClick = () =>{
        localStorage.clear()
        console.log(localStorage.getItem('token'));
        
        navigate('/')
    }
    return (
        <Button onClick={()=>handleClick()}>Выход</Button>
    )
}
export default LogOut;