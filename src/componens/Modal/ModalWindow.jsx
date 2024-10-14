import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, Col, InputNumber, Row, Slider, Space, Cascader, ConfigProvider } from 'antd';
import styles from './modalWindow.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, editFavorite } from '../../redux/listSlice/favoriteSlice';
import { useNavigate } from "react-router-dom";
import { isModalOpen } from '../../redux/listSlice/ModalSlice';
import SliderComponent from './ModalElements/SliderComponent';
import SelectComponent from './ModalElements/SelectComponent';
import isFavoriteHelper from '../../helper/isFavoriteHelper';
import { changeName } from '../../redux/listSlice/changeNameInModalSlice';
import { changeNumber } from '../../redux/listSlice/gridNumberSlice';
import { getWarning } from '../../redux/listSlice/warningSlice';
import WarningComponent from '../Warning/WarningComponent';
import { changeNameInEdit, changeRequest, editElement } from '../../redux/listSlice/EditElementSlice';
import { writeRequest } from '../../redux/listSlice/Request';

const ModalWindow = () => {
    const request = useSelector(state => state.request);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorite = useSelector(state => state.favorite);
    const modal = useSelector(state => state.modal);
    //const [changeName, setChangeName] = useState('');
    const name = useSelector(state => state.name);
    const number = useSelector(state => state.number);
    const warning = useSelector(state => state.warning);
    const edit = useSelector(state => state.edit);


    console.log('key', Object.keys(edit));


    const handleClick = () => {
        if (Object.keys(edit).length !== 0) {
            if (edit.request.trim() === '') {
                dispatch(getWarning('Заполните поле "Запрос"'))
            } else {
                dispatch(editFavorite(edit));
                dispatch(isModalOpen(false));
                //navigate('/search')
                //dispatch(changeName(''));
                dispatch(changeNumber(12));
                dispatch(editElement({}))
            }
        } else if (name.trim() === '') {
            dispatch(getWarning('Заполните поле "Название"'))
        } else if (request.trim() !== '' && !isFavoriteHelper(favorite, request) && name !== '') {
            //console.log({ request: request, name: name, id: crypto.randomUUID(), select: 'withoutSelect', count: number });

            dispatch(addFavorite({ request: request, name: name, id: crypto.randomUUID(), select: 'withoutSelect', count: number }));
            dispatch(isModalOpen(false));
            //navigate('/search')
            dispatch(changeName(''));
            dispatch(changeNumber(12));
            dispatch(editElement({}))
        }
    }

    const handleCancel = () => {
        dispatch(isModalOpen(false));
    };

    useEffect(() => {
        dispatch(getWarning(''))
    }, [name])


    return (
        <>
            <Modal title="Сохранить запрос" centered width={510} className={styles.container}
                open={modal} onOk={() => handleClick()} okText='Сохранить' onCancel={handleCancel} cancelText='Не сохранять'>

                <div>Запрос
                    {Object.keys(edit).length === 0 ? <Input value={request} disabled /> : <Input value={edit.request} onChange={(e) => dispatch(changeRequest(e.target.value))} />}
                </div>
                <div>Название
                    {Object.keys(edit).length === 0 ?
                        <Input placeholder='Укажите название' value={name} onChange={(e) => dispatch(changeName(e.target.value))} /> :
                        <Input placeholder='Укажите название' value={edit.name} onChange={(e) => dispatch(changeNameInEdit(e.target.value))} />
                    }
                </div>

                <SelectComponent />
                <SliderComponent />
                {warning === 'Заполните поле "Запрос"' && <WarningComponent />}
                {warning === 'Заполните поле "Название"' && <WarningComponent />}
            </Modal>
        </>
    )
}
export default ModalWindow;

//сделать переключение в слайдере
//получить список в селект от ютуба по сортировке
//добавить строку по количеству всех найденых видео
//отредакировать вид таблицы видео
//добавить переключение таблицы на список
//сохранить запросы в локалсторидж? для каждого пользователя сохранять свои запросы