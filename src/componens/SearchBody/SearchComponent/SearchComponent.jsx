import { useDispatch } from "react-redux";
import { writeRequest } from "../../../redux/listSlice/RequestSlice";
import { fetchGetVideos } from "../../../redux/listSlice/listSlice";
import { useEffect, useRef } from "react";
import { Input, Button } from 'antd';
import styles from './searchComponent.module.css';
import { HeartOutlined } from "@ant-design/icons";
import SearchWithoutRequest from "./SearchWithoutRequest/SearchWithoutRequest";
import WarningComponent from "../../Warning/WarningComponent";
import { isModalOpen } from "../../../redux/listSlice/ModalSlice";
import ModalWindow from "../../Modal/ModalWindow";
import isFavoriteHelper from "../../../helper/isFavoriteHelper";
import { searchRequest } from "../../../redux/listSlice/RequestTotalSlice";
import { changeNumber } from "../../../redux/listSlice/gridNumberSlice";
import { initialFavorite } from "../../../redux/listSlice/favoriteSlice";
import getFavoritesLocal from "../../../localStorage/getFavorites";
import useAppSelectors from "../../../hooks/useAppSelectors";

const SearchComponent = () => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const { request, data, favorite, modal, select, status } = useAppSelectors();




    useEffect(() => {
        ref.current.focus()
        const savedEmail = localStorage.getItem('userName');
        //console.log(localStorage);
        if (savedEmail) {
            dispatch(initialFavorite(getFavoritesLocal(savedEmail)));
        }
    }, [dispatch]);


    const handleClick = () => {
        //console.log('выполнить поиск видео', request);

        if (request.trim() !== '' && isFavoriteHelper(favorite, request)) {
            //console.log('есть в избранном');
            dispatch(changeNumber(favorite.find(item => item.request === request)?.count));
            dispatch(searchRequest(favorite.find(item => item.request === request)?.request));
            dispatch(fetchGetVideos({
                request: favorite.find(item => item.request === request)?.request,
                select: favorite.find(item => item.request === request)?.select
            }));
        } else if (request.trim() !== '' && !isFavoriteHelper(favorite, request)) {
            //console.log('нет в избранном');
            dispatch(changeNumber(12));
            dispatch(searchRequest(request));
            dispatch(fetchGetVideos({ request, select }));
        }

    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
    const handleChange = (e) => {
        dispatch(writeRequest(e.target.value));
    }
    const handleFavorite = () => {
        if (request.trim() !== '' && !isFavoriteHelper(favorite, request)) dispatch(isModalOpen(true));
    }


    return (
        <>
            {data.length === 0 ? <SearchWithoutRequest handleChange={handleChange} handleKeyDown={handleKeyDown} ref={ref} handleFavorite={handleFavorite} handleClick={handleClick} /> :

                <div className={styles.inputStyle}>
                    <Input placeholder="Что будем смотреть?" ref={ref} value={request} className={styles.input}
                        onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} suffix={<HeartOutlined className={`${styles.favorite} ${isFavoriteHelper(favorite, request) ? styles.active : ''}`} style={{ fontSize: '20px' }} onClick={() => handleFavorite()} />} />
                    <Button className={styles.button} onClick={() => handleClick()}>Поиск</Button>
                </div>
            }
            {status === 'failed' && <WarningComponent />}
            {modal && <ModalWindow />}
        </>
    )
}
export default SearchComponent;