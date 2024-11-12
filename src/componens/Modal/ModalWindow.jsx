import React, { useEffect } from 'react';
import { Input, Modal, } from 'antd';
import { useDispatch } from "react-redux";
import { addFavorite, editFavorite } from '../../redux/listSlice/favoriteSlice';
import { isModalOpen } from '../../redux/listSlice/ModalSlice';
import SliderComponent from './ModalElements/SliderComponent';
import SelectComponent from './ModalElements/SelectComponent';
import isFavoriteHelper from '../../helper/isFavoriteHelper';
import { changeName } from '../../redux/listSlice/changeNameInModalSlice';
import { changeNumber } from '../../redux/listSlice/gridNumberSlice';
import { getWarning } from '../../redux/listSlice/WarningMessageSlice';
import WarningComponent from '../Warning/WarningComponent';
import { changeNameInEdit, changeRequest, editElement } from '../../redux/listSlice/EditElementSlice';
import addFavoritesLocal from '../../localStorage/addFavorites';
import editFavoritesLocal from '../../localStorage/editFavorites';
import { changeSelect } from '../../redux/listSlice/SelectSlice';
import { setNewNumber } from '../../redux/listSlice/NewNumberSlice';
import useAppSelectors from '../../hooks/useAppSelectors';
import isEditComponent from '../../helper/isEditComponent';


const ModalWindow = () => {
    const dispatch = useDispatch();
    const { request, favorite, modal, name, warning, edit, select, newNumber } = useAppSelectors();


    const handleClick = () => {
        if (!isEditComponent(edit)) {
            //console.log('изменяем');

            if (edit.request.trim() === '') {
                dispatch(getWarning('Заполните поле "Запрос"'))
            }else if(edit.name.trim() === ''){
                dispatch(getWarning('Заполните поле "Название"'))
            }else {
                dispatch(editFavorite(edit));
                editFavoritesLocal(localStorage.getItem('userName'), edit);
                dispatch(isModalOpen(false));
                dispatch(editElement({}));
                dispatch(setNewNumber(12));
            }
        } else if (name.trim() === '') {
            dispatch(getWarning('Заполните поле "Название"'))
        } else if (request.trim() !== '' && !isFavoriteHelper(favorite, request) && name !== '') {
            //console.log('создаем новое избранное');
            dispatch(changeNumber(newNumber))
            dispatch(addFavorite({ request: request, name: name, id: crypto.randomUUID(), select: select, count: newNumber }));
            addFavoritesLocal(localStorage.getItem('userName'), { request: request, name: name, id: crypto.randomUUID(), select: select, count: newNumber });
            dispatch(isModalOpen(false));
            dispatch(changeName(''));
            dispatch(setNewNumber(12));
            dispatch(editElement({}));
            dispatch(changeSelect('searchSortUnspecified'));
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
                    {isEditComponent(edit) ? <Input value={request} disabled /> : <Input value={edit.request} onChange={(e) => dispatch(changeRequest(e.target.value))} />}
                </div>
                <div>Название
                    {isEditComponent(edit) ?
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

