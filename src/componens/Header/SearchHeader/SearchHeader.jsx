import styles from './searchHeader.module.css';
import { useDispatch } from 'react-redux';
import { isActiveButton } from '../../../redux/listSlice/isActiveButtonSlice';
import useAppSelectors from '../../../hooks/useAppSelectors';

const SearchHeader = () => {
    const dispatch = useDispatch();
    const { isActive } = useAppSelectors();

    const handleClick = () => {
        dispatch(isActiveButton('search'));
    }


    return (
        <button className={isActive === 'search' ? styles.active : styles.buttonSearch} onClick={() => handleClick()}>Поиск</button>
    )
}
export default SearchHeader;