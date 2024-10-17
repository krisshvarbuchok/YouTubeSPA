import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import SearchBody from "../SearchBody/SearchBody";
import FavoritesComponent from "../FavoritesComponent/FavoritesComponent";
import styles from './mainPage.module.css';
import { useEffect } from "react";
import { initialFavorite } from "../../redux/listSlice/favoriteSlice";
import getFavoritesLocal from "../../localStorage/getFavorites";

const MainPage = () => {
    const dispatch = useDispatch();
    const isActive = useSelector(state => state.isActive);
    const { status, error } = useSelector(state => state.list);
    const email = useSelector(state => state.email);


    if (status === 'failed') {
        return <div>УПС... что-то пошло не так</div>
    }
    // useEffect(()=>{
    //     dispatch(initialFavorite(getFavoritesLocal(email)));
    // }, [])


    return (
        <>
            <Header />
            <div>
                {isActive === 'search' && <SearchBody />}
                {isActive === 'favorite' && <FavoritesComponent />}
            </div>
        </>
    )
}

export default MainPage;