import Header from "../Header/Header";
import SearchBody from "../SearchBody/SearchBody";
import FavoritesComponent from "../FavoritesComponent/FavoritesComponent";
import useAppSelectors from "../../hooks/useAppSelectors";

const MainPage = () => {
    const {isActive} = useAppSelectors();



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