import React, { Suspense } from "react";
import useAppSelectors from "../../hooks/useAppSelectors";
import SearchComponent from "./SearchComponent/SearchComponent";
//import SearchResult from "./SearchResult/SearchResult";
import styles from './searchBody.module.css';
const SearchResult = React.lazy(() => import('./SearchResult/SearchResult'));

const SearchBody = () => {
    const { data } = useAppSelectors();

    return (
        <div className="container1">
            <div className={data.length === 0 ? styles.withoutRequest : styles.container}>
                <div className={styles.searchVideo}>Поиск видео</div>
                <SearchComponent />
            </div>

            {data.length !== 0 &&

                <Suspense fallback={<div>Загрузка...</div>}>
                    <SearchResult />
                </Suspense>
            }
        </div>
    )
}
export default SearchBody;