import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import SearchBody from "../SearchBody/SearchBody";
import FavoritesComponent from "../FavoritesComponent/FavoritesComponent";
import styles from './mainPage.module.css';

const MainPage = () => {
    const dispatch = useDispatch();
    const isActive = useSelector(state => state.isActive);
    const { status, error } = useSelector(state => state.list);


    if (status === 'failed') {
        return <div>УПС... что-то пошло не так</div>
    }


    return (
        <div className={styles.container}>
            <Header />
            {isActive === 'search' && <SearchBody />}
            {isActive === 'favorite' && <FavoritesComponent />}
        </div>
    )
}

export default MainPage;