import styles from './favoritesHeader.module.css';
import { useDispatch } from 'react-redux';
import { isActiveButton } from '../../../redux/listSlice/isActiveButtonSlice';
import useAppSelectors from '../../../hooks/useAppSelectors';

const FavoritesHeader = () => {
    const dispatch = useDispatch();
    const { isActive } = useAppSelectors();
    const handleClick = () => {
        dispatch(isActiveButton('favorite'));
    }

    return (
        <button className={isActive === 'favorite' ? styles.active : styles.buttonFavorites} onClick={() => handleClick()}>Избранное</button>
    )
}
export default FavoritesHeader;