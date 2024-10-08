import Favorites from "./Favorites/Favorites"
import LogOut from "./LogOut/LogOut"
import Search from "./SearchHeader/SearchHeader"
import styles from './header.module.css'

const Header = () => {

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Search />
                <Favorites />
            </div>
            <LogOut />
        </div>
    )
}
export default Header;