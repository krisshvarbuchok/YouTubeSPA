import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { writeRequest } from "../../../redux/listSlice/Request";
import { fetchGetVideos, fetchGetMoreInfoAboutVideo } from "../../../redux/listSlice/listSlice";
import SearchResult from "../SearchResult/SearchResult";
import { useEffect, useRef, useState } from "react";
import { Input, Button } from 'antd';
import styles from './searchComponent.module.css';
import { HeartOutlined } from "@ant-design/icons";

const SearchComponent = () => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const request = useSelector(state => state.request);
    const { data } = useSelector(state => state.list);
    const { status, error } = useSelector(state => state.list);
    const [favorite, setFavorite] = useState(false)

    useEffect(()=>{
        ref.current.focus()
    }, [])

    const handleClick = () => {
        console.log('выполнить поиск видео', request);
        dispatch(fetchGetVideos(request))

    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }
    const handleChange = (e) => {
        //console.log(request);
        dispatch(writeRequest(e.target.value))
    }
    const handleFavorite = () =>{
        console.log('ok');
        setFavorite(!favorite);
    }

    if (status === 'loading') {
        return <div>...loading</div>
    }
    if (status === 'failed') {
        return <div>УПС... что-то пошло не так: {error.message}</div>
    }

    return (
        <div className={styles.container}>
            <Input placeholder="Что будем смотреть?" ref={ref} value={request} 
                onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} suffix={<HeartOutlined className={`${styles.favorite} ${favorite ? styles.active : ''}`} onClick={()=>handleFavorite()}/>} />
            
            <Button onClick={() => handleClick()}>Поиск</Button>
           
        </div>
    )
}
export default SearchComponent;