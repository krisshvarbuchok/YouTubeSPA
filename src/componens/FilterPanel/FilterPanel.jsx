import { useDispatch } from 'react-redux';
import styles from './filterPanel.module.css';
import { DatabaseTwoTone, AppstoreTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import { changeDisplay } from '../../redux/listSlice/DisplaySlice';
import useAppSelectors from '../../hooks/useAppSelectors';

const FilterPanel = () => {
    const { requestTotal, totalResults, display } = useAppSelectors();
    const dispatch = useDispatch();


    return (
        <div className={styles.panel}>
            <p className={styles.subString}>Видео по запросу "{requestTotal}" {totalResults === 1000000 ?
                `более ${totalResults}` :
                totalResults}</p>
            <div className={styles.icon}>
                <Button color="primary" variant="link"
                    onClick={() => dispatch(changeDisplay('list'))}>
                    <DatabaseTwoTone className={display === 'list' ? styles.active : styles.list} style={{ twoToneColor: '#1390e5' }} />
                </Button>
                <Button color="primary" variant="link" onClick={() => dispatch(changeDisplay('grid'))}>
                    <AppstoreTwoTone className={display === 'grid' ? styles.active : styles.grid} style={{ twoToneColor: '#1390e5' }} />
                </Button>
            </div>
        </div>
    )
}
export default FilterPanel;