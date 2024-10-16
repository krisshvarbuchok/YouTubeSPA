import { useDispatch, useSelector } from 'react-redux';
import styles from './filterPanel.module.css';
import { DatabaseTwoTone, AppstoreTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import { changeDisplay } from '../../redux/listSlice/DisplaySlice';

const FilterPanel = () => {
    const requestTotal = useSelector(state => state.requestTotal)
    const { data: { totalResults } } = useSelector(state => state.list);
    const display = useSelector(state => state.display);
    const dispatch = useDispatch();
    console.log(display);
    

    return (
        <div className={styles.panel}>
            <p className={styles.subString}>Видео по запросу "{requestTotal}" {totalResults === 1000000 ?
                `более ${totalResults}` :
                totalResults}</p>
            <div className={styles.icon}>
                <Button color="primary" variant="link" 
                 onClick={() => dispatch(changeDisplay('list'))}>
                    <DatabaseTwoTone className={display === 'list' ? styles.active : styles.list} style={{  twoToneColor: '#1390e5' }} />
                </Button>
                <Button color="primary" variant="link" onClick={() => dispatch(changeDisplay('grid'))}>
                    <AppstoreTwoTone className={display === 'grid' ? styles.active : styles.grid} style={{ twoToneColor: '#1390e5'}}  />
                </Button>
            </div>
        </div>
    )
}
export default FilterPanel;