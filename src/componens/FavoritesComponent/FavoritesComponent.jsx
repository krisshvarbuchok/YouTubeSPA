import { useDispatch, useSelector } from "react-redux";
import styles from './favoriteComponent.module.css';
import { EditOutlined } from "@ant-design/icons";

const FavoritesComponent = () => {
    const favorite = useSelector(state => state.favorite);
    console.log(favorite);


    return (
        <div className={styles.container}>
            <div className={styles.text}>Избранное</div>
            <ul className={styles.list}>
                {favorite.map(item => {
                    return <li key={item.id} className={styles.string}>
                        <div>{item.name}</div>
                        <div><EditOutlined /></div>
                    </li>
                })}
            </ul>
        </div>
    )
}
export default FavoritesComponent;