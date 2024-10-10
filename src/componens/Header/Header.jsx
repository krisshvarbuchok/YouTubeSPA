import FavoritesHeader from "./Favorites/FavoritesHeader"
import LogOut from "./LogOut/LogOut"
import SearchHeader from "./SearchHeader/SearchHeader"
import styles from './header.module.css'

const Header = () => {

    return (
        <div className={styles.header}>
            <div className={styles.container} >
                <div className={styles.searchAndHeader}>
                    <img src="sibdev-logo.svg" alt="Logo" className={styles.logo} />
                    <SearchHeader />
                    <FavoritesHeader />
                </div>
                <LogOut />
            </div>
        </div>
    )
}
export default Header;