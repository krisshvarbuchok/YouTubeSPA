import React, { useState } from 'react';
import { Button, Input, Modal, Col, InputNumber, Row, Slider, Space, Cascader, ConfigProvider } from 'antd';
import styles from './modalWindow.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from '../../redux/listSlice/favoriteSlice';
import { useNavigate } from "react-router-dom";
import { isModalOpen } from '../../redux/listSlice/ModalSlice';
import SliderComponent from './ModalElements/SliderComponent';
import SelectComponent from './ModalElements/SelectComponent';
import isFavoriteHelper from '../../helper/isFavoriteHelper';


const ModalWindow = () => {
    const request = useSelector(state => state.request);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorite = useSelector(state => state.favorite);
    const modal = useSelector(state => state.modal);
    const [changeName, setChangeName] = useState('');




    const handleClick = () => {
        if (request.trim() !== '' && !isFavoriteHelper(favorite, request)) {
            dispatch(addFavorite({ request: request, name: changeName, id: crypto.randomUUID(), select: 'withoutSelect', count: 25 }));
            dispatch(isModalOpen(false));
            //navigate('/search')
        }
    }

    const handleCancel = () => {
        dispatch(isModalOpen(false));
    };
    const handleChange = (e) => {
        if (e.target.value.trim() !== '') {
            setChangeName(e.target.value)
        }
    }



    return (
        <>
            <Modal title="Сохранить запрос" centered width={510} className={styles.container}
                open={modal} onOk={() => handleClick()} okText='Сохранить' onCancel={handleCancel} cancelText='Не сохранять'>

                <div>Запрос
                    <Input value={request} disabled required />
                </div>
                <div>Название
                    <Input placeholder='Укажите название' value={changeName} onChange={(e) => handleChange(e)} />
                </div>
                <SelectComponent />
                <SliderComponent />
            </Modal>
        </>
    )
}
export default ModalWindow;
