import { useDispatch, useSelector } from "react-redux";
import styles from './favoriteComponent.module.css';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { deleteFavorite } from "../../redux/listSlice/favoriteSlice";
import { fetchGetVideos } from "../../redux/listSlice/listSlice";
import { isActiveButton } from "../../redux/listSlice/isActiveButtonSlice";
import ModalWindow from "../Modal/ModalWindow";
import { isModalOpen } from "../../redux/listSlice/ModalSlice";
import { editElement } from "../../redux/listSlice/EditElementSlice";
import { writeRequest } from "../../redux/listSlice/RequestSlice";
import { searchRequest } from "../../redux/listSlice/RequestTotalSlice";
import removeFavoritesLocal from "../../localStorage/removeFavorites";
import { changeNumber } from "../../redux/listSlice/gridNumberSlice";
import useAppSelectors from "../../hooks/useAppSelectors";

const FavoritesComponent = () => {
    const dispatch = useDispatch();
    const { favorite, modal} = useAppSelectors();

    const handleSearch = (request, select, count) => {
        dispatch(searchRequest(request));
        dispatch(writeRequest(request));
        dispatch(changeNumber(count))
        dispatch(fetchGetVideos({request, select}));
        dispatch(isActiveButton('search'));
    }

    const handleEdit = (item) => {
        dispatch(editElement(item))
        dispatch(isModalOpen(true));
    }

    const handleDelete = (id) => {
        dispatch(deleteFavorite(id));
        removeFavoritesLocal(localStorage.getItem('userName'), id)
    }

    return (
        <>
            <div className="container1">
                <div className={styles.text}>Избранное</div>
                <ul className={styles.list}>
                    {favorite.map(item => {
                        return <li key={item.id} className={styles.string}>
                            {item.name.trim() === '' ?
                                <div className={styles.item} onClick={() => handleSearch(item.request, item.select, item.count)}>{item.request}</div> :
                                <div className={styles.item} onClick={() => handleSearch(item.name, item.select, item.count)}>{item.name}</div>}

                            <div className={styles.editAndDelete}>

                                <Button className={styles.edit} onClick={() => handleEdit(item)}><EditOutlined style={{ fontSize: '25px', color: '#39f' }} /></Button>
                                <Button className={styles.delete} onClick={() => handleDelete(item.id)}><DeleteOutlined style={{ fontSize: '25px', color: '#39f' }} /></Button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
            {modal && <ModalWindow />}
        </>
    )
}
export default FavoritesComponent;