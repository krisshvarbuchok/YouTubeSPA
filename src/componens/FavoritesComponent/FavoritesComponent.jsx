import { useDispatch, useSelector } from "react-redux";
import styles from './favoriteComponent.module.css';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { deleteFavorite, initialFavorite } from "../../redux/listSlice/favoriteSlice";
import { fetchGetVideos } from "../../redux/listSlice/listSlice";
import { isActiveButton } from "../../redux/listSlice/isActiveButtonSlice";
import ModalWindow from "../Modal/ModalWindow";
import { isModalOpen } from "../../redux/listSlice/ModalSlice";
import { editElement } from "../../redux/listSlice/EditElementSlice";
import { writeRequest } from "../../redux/listSlice/RequestSlice";
import { searchRequest } from "../../redux/listSlice/RequestTotalSlice";
import { useEffect } from "react";
import getFavoritesLocal from "../../localStorage/getFavorites";
import removeFavoritesLocal from "../../localStorage/removeFavorites";

const FavoritesComponent = () => {
    const favorite = useSelector(state => state.favorite);
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);
    

    const handleSearch = (request, select) => {
        dispatch(searchRequest(request))
        dispatch(writeRequest(request))
        dispatch(fetchGetVideos({request, select}));
        dispatch(isActiveButton('search'))
    }

    const handleEdit = (item) => {
        dispatch(editElement(item))
        dispatch(isModalOpen(true));
    }

    const handleDelete = (id) => {
        dispatch(deleteFavorite(id));
        removeFavoritesLocal(localStorage.getItem('userName'), id)
    }
    useEffect(()=>{
        const savedEmail = localStorage.getItem('userName');
        //console.log('savedEmail',savedEmail);
        console.log(localStorage);
        
        
        if(savedEmail){
            //console.log('this',getFavoritesLocal(savedEmail));
            
            dispatch(initialFavorite(getFavoritesLocal(savedEmail)));
        }
    }, [dispatch])

    return (
        <>
            <div className="container1">
                <div className={styles.text}>Избранное</div>
                <ul className={styles.list}>
                    {favorite.map(item => {
                        return <li key={item.id} className={styles.string}>
                            {item.name.trim() === '' ?
                                <div className={styles.item} onClick={() => handleSearch(item.request, item.select)}>{item.request}</div> :
                                <div className={styles.item} onClick={() => handleSearch(item.name, item.select)}>{item.name}</div>}

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