import SearchComponent from "./SearchComponent/SearchComponent"
import SearchResult from "./SearchResult/SearchResult"
import styles from './search.module.css'
import { useSelector } from "react-redux"

const Search = () =>{
    const { data } = useSelector(state => state.list);
    console.log('до листа',data);

    return(
        <div className={`${data.length === 0} ? ${styles.withoutRequest} : ${styles.container}`}>
            <SearchComponent />
            {data.length !== 0 && <SearchResult />}
            
        </div>
    )
}
export default Search;