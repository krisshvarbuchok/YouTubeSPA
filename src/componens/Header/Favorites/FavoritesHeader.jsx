import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './favoritesHeader.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isActiveButton } from '../../../redux/listSlice/isActiveButtonSlice';

const FavoritesHeader = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isActive = useSelector(state => state.isActive);
    //const [isActive, setActive] = useState(false);
    const handleClick = () =>{
        //setActive(!isActive);
        dispatch(isActiveButton('favorite'))
        //navigate('/favoriteComponent')
    }

    return (
        <button className={isActive === 'favorite' ? styles.active : styles.buttonFavorites} onClick={()=>handleClick()}>Избранное</button>
    )
}
export default FavoritesHeader;