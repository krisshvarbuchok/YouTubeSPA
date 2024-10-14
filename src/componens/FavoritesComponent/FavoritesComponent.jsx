import { useDispatch, useSelector } from "react-redux";
import styles from './favoriteComponent.module.css';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { deleteFavorite } from "../../redux/listSlice/favoriteSlice";
import { fetchGetVideos } from "../../redux/listSlice/listSlice";
import { useNavigate } from "react-router-dom";
import { isActiveButton } from "../../redux/listSlice/isActiveButtonSlice";
import ModalWindow from "../Modal/ModalWindow";
import { isModalOpen } from "../../redux/listSlice/ModalSlice";
import { editElement } from "../../redux/listSlice/EditElementSlice";
import { writeRequest } from "../../redux/listSlice/Request";

const FavoritesComponent = () => {
    const favorite = useSelector(state => state.favorite);
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);
    //const navigate = useNavigate();
    console.log(favorite);

    const handleSearch = (request) => {
        dispatch(writeRequest(request))
        dispatch(fetchGetVideos(request));
        dispatch(isActiveButton('search'))
    }

    const handleEdit = (item) => {
        //console.log('item',item);

        dispatch(editElement(item))
        dispatch(isModalOpen(true));
    }

    const handleDelete = (id) => {
        dispatch(deleteFavorite(id))
    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.text}>Избранное</div>
                <ul className={styles.list}>
                    {favorite.map(item => {
                        return <li key={item.id} className={styles.string}>
                            {item.name.trim() === '' ?
                                <div className={styles.item} onClick={() => handleSearch(item.request)}>{item.request}</div> :
                                <div className={styles.item} onClick={() => handleSearch(item.name)}>{item.name}</div>}

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