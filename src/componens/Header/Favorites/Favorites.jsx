import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Favorites = () =>{
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('')
    }

    return (
        <Button onClick={()=>handleClick()}>Избранное</Button>
    )
}
export default Favorites;