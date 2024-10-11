import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import SearchBody from "../SearchBody/SearchBody";
import { useEffect } from "react";
import FavoritesComponent from "../FavoritesComponent/FavoritesComponent";
import styles from './mainPage.module.css';

const MainPage = () =>{
    const dispatch = useDispatch();
    const isActive = useSelector(state => state.isActive);
    const {status, error} = useSelector(state => state.list);
    // if(status === 'loading'){
    //     return <div>...loading</div>
    // }
    if( status === 'failed') {
        return <div>УПС... что-то пошло не так: {error.message}</div>
    }

    
    return (
        <div >
            <Header />
           {isActive === 'search' && <SearchBody />} 
            {isActive === 'favorite' && <FavoritesComponent />}
        </div>
    )
}

export default MainPage;