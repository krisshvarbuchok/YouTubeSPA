import { useDispatch, useSelector } from "react-redux";
import styles from './searchResult.module.css';
import { fetchGetMoreInfoAboutVideo } from "../../../redux/listSlice/listSlice";
import { useEffect } from "react";
import FilterPanel from "../../FilterPanel/FilterPanel";
import useAppSelectors from "../../../hooks/useAppSelectors";

const SearchResult = () => {
    const dispatch = useDispatch();
    const { data: { data } } = useSelector(state => state.list);
    const { status, error, stats, number, display } = useAppSelectors();
    //console.log(data);


    useEffect(() => {
        data.forEach(video => {
            dispatch(fetchGetMoreInfoAboutVideo(video.id.videoId));
        });
    }, [data, dispatch]);

    if (status === 'loading') {
        return <div className={styles.error}>...loading</div>
    }
    if (status === 'failed') {
        return <div>УПС... что-то пошло не так: {error.message}</div>;
    }
    return (
        <>
            <FilterPanel />

            <ul className={display === 'grid' ? styles.grid : styles.flex}>
                {data.slice(0, number).map(item => {
                    return <li key={item.id.videoId || item.id} className={display === 'grid' ? styles.item : styles.itemFlex}>
                        <div>
                            <a href={`https://www.youtube.com/watch?v=${item.id.videoId}&t=1s`}>
                                <img
                                    src={item.snippet.thumbnails.high.url}
                                    alt={item.snippet.title}
                                    className={display === 'grid' ? styles.img : styles.imgFlex}
                                />
                            </a>
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
