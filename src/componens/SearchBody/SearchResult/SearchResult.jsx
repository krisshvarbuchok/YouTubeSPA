import { useDispatch, useSelector } from "react-redux";
import styles from './searchResult.module.css';
import { fetchGetMoreInfoAboutVideo } from "../../../redux/listSlice/listSlice";
import { useEffect } from "react";
import FilterPanel from "../../FilterPanel/FilterPanel";

const SearchResult = () => {
    const dispatch = useDispatch();
    const { data: { data } } = useSelector(state => state.list);
    // console.log('data' , totalResults);

    const { status, error } = useSelector(state => state.list);
    const { stats } = useSelector(state => state.list);
    const request = useSelector(state => state.request);
    //const requestTotal = useSelector(state => state.requestTotal)
    //console.log('stats' , stats);
    const favorite = useSelector(state => state.favorite);
    const countFavorite = favorite.find(item => item.request === request)?.count;
    const number = countFavorite ? countFavorite : 12;
    const display = useSelector(state => state.display);


    useEffect(() => {
        data.forEach(video => {
            dispatch(fetchGetMoreInfoAboutVideo(video.id.videoId));
        });
    }, [data, dispatch]);

    if (status === 'loading') {
        return <div className={styles.error}>...loading</div>
    }
    if(status === 'failed'){
        return <div>УПС... что-то пошло не так: {error.message}</div>;
    }
    return (
        <>
            <FilterPanel />

            <ul className={display === 'grid' ? styles.grid : styles.flex}>
                {data.slice(0, number).map(item => {
                    return <li key={item.id.videoId || item.id} className={display === 'grid' ? styles.item : styles.itemFlex}>
                        <div>
                            <img
                                src={item.snippet.thumbnails.high.url}
                                alt={item.snippet.title}
                                className={display === 'grid' ? styles.img : styles.imgFlex}
                            />
                        </div>
                        <div >
                            <p className={display === 'grid' ? styles.title : styles.titleFlex}>{item.snippet.title}</p>
                            <p className={display === 'grid' ? styles.channel : styles.channelFlex}>{item.snippet.channelTitle}</p>
                            {stats[item.id.videoId] && (
                                <p className={styles.views}>Просмотры: {stats[item.id.videoId].viewCount}</p>
                            )}
                        </div>
                    </li>
                })}
            </ul>

        </>
    )
}
export default SearchResult;
