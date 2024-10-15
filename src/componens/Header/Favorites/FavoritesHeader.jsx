import styles from './favoritesHeader.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { isActiveButton } from '../../../redux/listSlice/isActiveButtonSlice';

const FavoritesHeader = () =>{
    const dispatch = useDispatch();
    const isActive = useSelector(state => state.isActive);
    const handleClick = () =>{
        dispatch(isActiveButton('favorite'));
    }

    return (
        <button className={isActive === 'favorite' ? styles.active : styles.buttonFavorites} onClick={()=>handleClick()}>Избранное</button>
    )
}
export default FavoritesHeader;