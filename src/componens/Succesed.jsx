import { useDispatch, useSelector } from "react-redux";
import Header from "./Header/Header";
import SearchBody from "./SearchBody/SearchBody";
import { useEffect } from "react";
import FavoritesComponent from "./FavoritesComponent/FavoritesComponent";

const Succesed = () =>{
    const dispatch = useDispatch();
    const isActive = useSelector(state => state.isActive);
    const {status, error} = useSelector(state => state.list);
    if(status === 'loading'){
        return <div>...loading</div>
    }
    if( status === 'failed') {
        return <div>УПС... что-то пошло не так: {error.message}</div>
    }

    
    return (
        <>
            <Header />
           {isActive === 'search' && <SearchBody />} 
            {isActive === 'favorite' && <FavoritesComponent />}
        </>
    )
}

export default Succesed;