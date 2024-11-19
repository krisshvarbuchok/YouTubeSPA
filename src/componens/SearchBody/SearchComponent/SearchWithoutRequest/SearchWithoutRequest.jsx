import { ConfigProvider, Input, Button } from "antd";
import styles from './searchWithoutRequest.module.css';
import { HeartOutlined } from "@ant-design/icons";
import { forwardRef } from "react";
import isFavoriteHelper from "../../../../helper/isFavoriteHelper";
import useAppSelectors from "../../../../hooks/useAppSelectors";
import WarningComponent from "../../../Warning/WarningComponent";


const SearchWithoutRequest = forwardRef(({ handleChange, handleKeyDown, handleFavorite, handleClick }, ref) => {
    const {request, favorite, status} = useAppSelectors();
   
    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Input: {
                            fontSize: 20
                        },
                        Button: {
                            colorPrimary: '#1390E5',
                            colorPrimaryHover: '#0d76c1',
                            controlHeight: 52,
                            fontSize: 20,
                        }
                    }

                }}
            >
                <div className={styles.container}>
                    <Input placeholder="Что будем смотреть?" ref={ref} value={request} className={styles.inputStyle}
                        onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} 
                        suffix={<HeartOutlined className={`${request.trim() === '' ? styles.disabled : styles.favorite} ${isFavoriteHelper(favorite, request) ? styles.active : ''}`} 
                        onClick={() => handleFavorite()} />} />
                    <Button type="primary" className={styles.buttonSearch} onClick={() => handleClick()}>Поиск</Button>
                </div>
            </ConfigProvider>
                {status === 'faild' && <WarningComponent />}
        </>
    )
})
export default SearchWithoutRequest;