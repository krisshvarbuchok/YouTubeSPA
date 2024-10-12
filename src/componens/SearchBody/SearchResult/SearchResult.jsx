import { useDispatch, useSelector } from "react-redux";
import styles from './searchResult.module.css';
import { Card, List } from 'antd';
import { fetchGetMoreInfoAboutVideo } from "../../../redux/listSlice/listSlice";
import { useEffect } from "react";

const SearchResult = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.list);
    const { status, error } = useSelector(state => state.list);
    const { stats } = useSelector(state => state.list);
    const request = useSelector(state => state.request);
    //console.log('stats' , stats);
    const favorite = useSelector(state => state.favorite);
    const countFavorite = favorite.find(item => item.request === request)?.count;
    const number = countFavorite ? countFavorite : 12;
    

    useEffect(() => {
        data.forEach(video => {
            dispatch(fetchGetMoreInfoAboutVideo(video.id.videoId));
        });
    }, [data, dispatch]);

    if (status === 'loading') {
        return <div className={styles.error}>...loading</div>
    }
    if (status === 'failed') {
        return <div className={styles.error}>УПС... что-то пошло не так: {error.message}</div>
    }
    return (
        <div >
            <ul className={styles.grid}>
                {data.slice(0, number).map(item =>{
                    return <li key={item.id.videoId || item.id.playlistId} className={styles.item}>
                        <img
                                src={item.snippet.thumbnails.high.url}
                                alt={item.snippet.title}
                                width="180" height="130"
                            />
                            <p>{item.snippet.title}</p>
                            <p>{item.snippet.channelTitle}</p>
                            {stats[item.id.videoId] && (
                    <p>Просмотры: {stats[item.id.videoId].viewCount}</p>
                )}
                    </li>
                })}
            </ul>
          
        </div>
    )
}
export default SearchResult;
