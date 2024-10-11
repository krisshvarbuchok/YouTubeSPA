import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { writeRequest } from "../../../redux/listSlice/Request";
import { fetchGetVideos, fetchGetMoreInfoAboutVideo } from "../../../redux/listSlice/listSlice";
import { useEffect, useRef, useState } from "react";
import { Input, Button } from 'antd';
import styles from './searchComponent.module.css';
import { HeartOutlined } from "@ant-design/icons";
import SearchWithoutRequest from "./SearchWithoutRequest/SearchWithoutRequest";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../../../redux/listSlice/favoriteSlice";
import WarningComponent from "../../Warning/WarningComponent";
import { getWarning } from "../../../redux/listSlice/warningSlice";
import { isModalOpen } from "../../../redux/listSlice/ModalSlice";
import ModalWindow from "../../Modal/ModalWindow";
import isFavoriteHelper from "../../../helper/isFavoriteHelper";

const SearchComponent = () => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const request = useSelector(state => state.request);
    const { data } = useSelector(state => state.list);
    //const { status, error } = useSelector(state => state.list);
    const favorite = useSelector(state => state.favorite);
    const navigate = useNavigate();
    const warning = useSelector(state => state.warning);
    const modal = useSelector(state => state.modal);

    useEffect(() => {
        ref.current.focus()
    }, [])

    const handleClick = () => {
        console.log('выполнить поиск видео', request);
        if (request.trim() !== '') dispatch(fetchGetVideos(request))

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
        console.log('ok');
        console.log(favorite);
        console.log(request);
        if (isFavoriteHelper(favorite, request)) {
            dispatch(getWarning('Запрос сохранен, если вы хотите изменить или удалить его, перейдите в раздел "Избранное"'))
            console.log(isFavoriteHelper(favorite, request));
            
            
        } else if (request.trim() !== '') dispatch(isModalOpen(true));
    }
    useEffect(()=>{
        dispatch(getWarning(''))
    }, [request])

    // if (status === 'loading') {
    //     return <div>...loading</div>
    // }
    // if (status === 'failed') {
    //     return <div>УПС... что-то пошло не так: {error.message}</div>
    // }

    return (
        <>
            {/* {status === 'loading' ? <div>...loading</div> :
                ( */}
                <div>
                    <div className={styles.container}>
                        {data.length === 0 ? <SearchWithoutRequest handleChange={handleChange} handleKeyDown={handleKeyDown} ref={ref} handleFavorite={handleFavorite} handleClick={handleClick} /> :
                            <div>
                                <Input placeholder="Что будем смотреть?" ref={ref} value={request} className={styles.inputStyle}
                                    onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} suffix={<HeartOutlined className={`${styles.favorite} ${isFavoriteHelper(favorite, request) ? styles.active : ''}`}  onClick={() => handleFavorite()} />} />
                                <Button onClick={() => handleClick()}>Поиск</Button>
                            </div>
                        }

                    </div >
                    {warning === 'Запрос сохранен, если вы хотите изменить или удалить его, перейдите в раздел "Избранное"' && <WarningComponent />}
                    {modal && <ModalWindow />}
                </div >
                {/* )
             } */}
        </>

    )
}
export default SearchComponent;