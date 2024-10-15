import styles from './searchHeader.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { isActiveButton } from '../../../redux/listSlice/isActiveButtonSlice';

const SearchHeader = () =>{
    const dispatch = useDispatch();
    const isActive = useSelector(state => state.isActive);

    const handleClick = () =>{
        dispatch(isActiveButton('search'));
    }


    return (
        <button className={isActive ==='search' ? styles.active : styles.buttonSearch} onClick={()=>handleClick()}>Поиск</button>
    )
}
export default SearchHeader;