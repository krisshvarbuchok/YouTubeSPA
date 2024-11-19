import styles from './warningComponent.module.css';
import useAppSelectors from '../../hooks/useAppSelectors';
import { resetError } from '../../redux/listSlice/listSlice';
import { Button, ConfigProvider } from 'antd';
import { useDispatch } from 'react-redux';


const WarningComponent = () => {
    const { error } = useAppSelectors();
    const dispatch = useDispatch();

    return <div className={styles.warning}>
        {error?.message || error || 'Request failed.'}
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 5,
                },
                components: {
                    Button: {
                        colorPrimary: '#1390E5',
                        colorPrimaryHover: '#0d76c1',
                        controlHeight: 40,
                        fontSize: 14,
                    },
                },
            }}
        >
            <Button type="primary" onClick={() => dispatch(resetError())}>Try again</Button>
        </ConfigProvider>
    </div>
}
export default WarningComponent;