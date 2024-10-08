import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Search = () =>{
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate('/search')
    }


    return (
        <Button onClick={()=>handleClick()}>Поиск</Button>
    )
}
export default Search;