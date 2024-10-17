import { useDispatch, useSelector } from "react-redux";
import { writeRequest } from "../../../redux/listSlice/RequestSlice";
import { fetchGetVideos } from "../../../redux/listSlice/listSlice";
import { useEffect, useRef } from "react";
import { Input, Button } from 'antd';
import styles from './searchComponent.module.css';
import { HeartOutlined } from "@ant-design/icons";
import SearchWithoutRequest from "./SearchWithoutRequest/SearchWithoutRequest";
import WarningComponent from "../../Warning/WarningComponent";
import { getWarning } from "../../../redux/listSlice/warningSlice";
import { isModalOpen } from "../../../redux/listSlice/ModalSlice";
import ModalWindow from "../../Modal/ModalWindow";
import isFavoriteHelper from "../../../helper/isFavoriteHelper";
import { searchRequest } from "../../../redux/listSlice/RequestTotalSlice";

const SearchComponent = () => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const request = useSelector(state => state.request);
    const { data } = useSelector(state => state.list);
    const favorite = useSelector(state => state.favorite);
    const warning = useSelector(state => state.warning);
    const modal = useSelector(state => state.modal);
    //const email = useSelector(state => state.email);


    useEffect(() => {
        ref.current.focus()
    }, [])

    const handleClick = () => {
        console.log('выполнить поиск видео', request);
        if (request.trim() !== '' && isFavoriteHelper(favorite, request)) {
            dispatch(searchRequest(favorite.find(item => item.request === request)?.name))
            dispatch(fetchGetVideos(favorite.find(item => item.request === request)?.name))
        } else if (request.trim() !== '' && !isFavoriteHelper(favorite, request)) {
            dispatch(searchRequest(request))
            dispatch(fetchGetVideos(request))
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }
    const handleChange = (e) => {
        dispatch(writeRequest(e.target.value))
    }
    const handleFavorite = () => {
        if (isFavoriteHelper(favorite, request)) {
            dispatch(getWarning('Запрос сохранен, если вы хотите изменить или удалить его, перейдите в раздел "Избранное"'))
        } else if (request.trim() !== '') dispatch(isModalOpen(true));
    }
    useEffect(() => {
        dispatch(getWarning(''))
    }, [request])


    return (
        <>
            {data.length === 0 ? <SearchWithoutRequest handleChange={handleChange} handleKeyDown={handleKeyDown} ref={ref} handleFavorite={handleFavorite} handleClick={handleClick} /> :

                <div className={styles.inputStyle}>
                    <Input placeholder="Что будем смотреть?" ref={ref} value={request} className={styles.input}
                        onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} suffix={<HeartOutlined className={`${styles.favorite} ${isFavoriteHelper(favorite, request) ? styles.active : ''}`} style={{ fontSize: '20px' }} onClick={() => handleFavorite()} />} />
                    <Button className={styles.button} onClick={() => handleClick()}>Поиск</Button>
                </div>
            }
            {warning === 'Запрос сохранен, если вы хотите изменить или удалить его, перейдите в раздел "Избранное"' && <WarningComponent />}
            {modal && <ModalWindow />}
        </>
    )
}
export default SearchComponent;