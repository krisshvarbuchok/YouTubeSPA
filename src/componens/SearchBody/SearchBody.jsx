import SearchComponent from "./SearchComponent/SearchComponent"
import SearchResult from "./SearchResult/SearchResult"
import styles from './searchBody.module.css'
import { useSelector } from "react-redux"

const SearchBody = () => {
    const { data } = useSelector(state => state.list);
    //console.log('до листа', data);

    return (
        <div className={styles.containerBig}>
            <div className={data.length === 0 ? styles.withoutRequest : styles.container}>
                <div className={styles.searchVideo}>Поиск видео</div>
                <SearchComponent />


            </div>

            {data.length !== 0 && <SearchResult />}

        </div>

    )
}
export default SearchBody;