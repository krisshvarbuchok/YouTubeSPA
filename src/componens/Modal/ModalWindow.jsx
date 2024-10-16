import React, { useEffect } from 'react';
import { Input, Modal, } from 'antd';
import styles from './modalWindow.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, editFavorite } from '../../redux/listSlice/favoriteSlice';
import { isModalOpen } from '../../redux/listSlice/ModalSlice';
import SliderComponent from './ModalElements/SliderComponent';
import SelectComponent from './ModalElements/SelectComponent';
import isFavoriteHelper from '../../helper/isFavoriteHelper';
import { changeName } from '../../redux/listSlice/changeNameInModalSlice';
import { changeNumber } from '../../redux/listSlice/gridNumberSlice';
import { getWarning } from '../../redux/listSlice/warningSlice';
import WarningComponent from '../Warning/WarningComponent';
import { changeNameInEdit, changeRequest, editElement } from '../../redux/listSlice/EditElementSlice';


const ModalWindow = () => {
    const request = useSelector(state => state.request);
    const dispatch = useDispatch();
    const favorite = useSelector(state => state.favorite);
    const modal = useSelector(state => state.modal);
    const name = useSelector(state => state.name);
    const number = useSelector(state => state.number);
    const warning = useSelector(state => state.warning);
    const edit = useSelector(state => state.edit);

    const handleClick = () => {
        if (Object.keys(edit).length !== 0) {
            if (edit.request.trim() === '') {
                dispatch(getWarning('Заполните поле "Запрос"'))
            } else {
                dispatch(editFavorite(edit));
                dispatch(isModalOpen(false));
                //dispatch(changeName(''));
                dispatch(changeNumber(12));
                dispatch(editElement({}))
            }
        } else if (name.trim() === '') {
            dispatch(getWarning('Заполните поле "Название"'))
        } else if (request.trim() !== '' && !isFavoriteHelper(favorite, request) && name !== '') {
            dispatch(addFavorite({ request: request, name: name, id: crypto.randomUUID(), select: 'withoutSelect', count: number }));
            dispatch(isModalOpen(false));
            dispatch(changeName(''));
            dispatch(changeNumber(12));
            dispatch(editElement({}))
        }
    }

    const handleCancel = () => {
        dispatch(isModalOpen(false));
        dispatch(editElement({}))
    };

    useEffect(() => {
        dispatch(getWarning(''))
    }, [name])


    return (
        <>
            <Modal title="Сохранить запрос" centered width={510}
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

//сделать в поиске только видео, без каналов и плейлистов
//получить список в селект от ютуба по сортировке
//переделать количество выводимых видео, когда выводит поиск избранного и потом стираешь количсетво сразу меняется
//сохранить запросы в локалсторидж? для каждого пользователя сохранять свои запросы