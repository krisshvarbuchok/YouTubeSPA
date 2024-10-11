import { ConfigProvider, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from './searchWithoutRequest.module.css';
import { HeartOutlined } from "@ant-design/icons";
import { forwardRef, useState } from "react";

const SearchWithoutRequest = forwardRef(({ handleChange, handleKeyDown, handleFavorite, handleClick }, ref) => {
    const dispatch = useDispatch();
    const request = useSelector(state => state.request);

    const favorite = useSelector(state => state.favorite);

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Input: {
                            fontSize: 20
                        },
                        Button: {
                            colorPrimary: '#1390E5', // Основной цвет кнопки
                                colorPrimaryHover: '#0d76c1', // Цвет при наведении
                                controlHeight: 52, // Высота кнопки
                                fontSize: 20, // Размер шрифта
                        }
                    }

                }}
            >

                <Input placeholder="Что будем смотреть?" ref={ref} value={request} className={styles.inputStyle}
                    onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} suffix={<HeartOutlined className={`${request.trim() === '' ? styles.disabled : styles.favorite} ${favorite.includes(request) ? styles.active : ''}`} onClick={() => handleFavorite()} />} />
                <Button type="primary" className={styles.buttonSearch} onClick={() => handleClick()}>Поиск</Button>
            </ConfigProvider>
                {/* {warning === 'Запрос сохранен, если вы хотите изменить или удалить его, перейдите в раздел "Избранное"' && <WarningComponent />} */}

        </>
    )
})
export default SearchWithoutRequest;