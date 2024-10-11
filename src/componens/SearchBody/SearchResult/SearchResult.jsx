import { useDispatch, useSelector } from "react-redux";
import styles from './searchResult.module.css';
import { Card, List } from 'antd';
import { fetchGetMoreInfoAboutVideo } from "../../../redux/listSlice/listSlice";
import { useEffect } from "react";

const SearchResult = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.list);
    const { status, error } = useSelector(state => state.list);
    const { stats } = useSelector(state => state.list)
    console.log('stats' , stats);
 

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
        <>
            <List grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4,
            }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={item.snippet.title}>
                            <img
                                src={item.snippet.thumbnails.high.url}
                                alt={item.snippet.title}
                                width="180" height="130"
                            />
                            {/* <iframe width="180" height="130"  src={`https://www.youtube.com/embed/${item.id.videoId}`}
                        title={item.snippet.title} frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    /> */}
                        </Card>
                        <p>{item.snippet.channelTitle}</p>
                        {/* Показываем статистику, если она уже загружена */}
                        {stats[item.id.videoId] && (
                    <p>Просмотры: {stats[item.id.videoId].viewCount}</p>
                )}
                    </List.Item>
                )}
            />
            {/* <div className={styles.container}>
                {data?.map(item => (
                    <li key={item.id.videoId || item.id.playlistId}> {item.snippet.title}</li>
                ))
                }
            </div> */}
        </>
    )
}
export default SearchResult;
