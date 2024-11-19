import { Form, Input, Modal, } from 'antd';
import { useDispatch } from "react-redux";
import { addFavorite, editFavorite } from '../../redux/listSlice/favoriteSlice';
import { isModalOpen } from '../../redux/listSlice/ModalSlice';
import SliderComponent from './ModalElements/SliderComponent';
import SelectComponent from './ModalElements/SelectComponent';
import isFavoriteHelper from '../../helper/isFavoriteHelper';
import { changeName } from '../../redux/listSlice/changeNameInModalSlice';
import { changeNumber } from '../../redux/listSlice/gridNumberSlice';
import { editElement } from '../../redux/listSlice/EditElementSlice';
import addFavoritesLocal from '../../localStorage/addFavorites';
import editFavoritesLocal from '../../localStorage/editFavorites';
import { changeSelect } from '../../redux/listSlice/SelectSlice';
import { setNewNumber } from '../../redux/listSlice/NewNumberSlice';
import useAppSelectors from '../../hooks/useAppSelectors';
import isEditComponent from '../../helper/isEditComponent';


const ModalWindow = () => {
    const dispatch = useDispatch();
    const { request, favorite, modal, name, edit, select, newNumber } = useAppSelectors();
    const [form] = Form.useForm();

    const handleClick = ({ name, request }) => {
        //console.log('values', name, request);

        if (!isEditComponent(edit)) {
            //console.log('изменяем');
            dispatch(editFavorite({ ...edit, name: name, request: request }));
            editFavoritesLocal(localStorage.getItem('userName'), { ...edit, name: name, request: request });
            dispatch(isModalOpen(false));
            dispatch(editElement({}));
            dispatch(setNewNumber(12));
        } else if (!isFavoriteHelper(favorite, request)) {
            //console.log('создаем новое избранное');
            dispatch(changeNumber(newNumber))
            dispatch(addFavorite({ name: name, request: request, id: crypto.randomUUID(), select: select, count: newNumber }));
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



    return (
        <>
            <Modal title="Сохранить запрос" centered width={510}
                open={modal} onOk={() => form.submit()} okText='Сохранить' onCancel={handleCancel} cancelText='Не сохранять'>
                <Form
                    form={form}
                    name="basic"
                    onFinish={handleClick} // Вызывается только при успешной валидации
                    initialValues={{
                        request: edit.request || request,
                        name: edit.name || name,
                    }}
                >
                    <Form.Item
                        label="Запрос"
                        name="request"
                        rules={[
                            {
                                required: true,
                                message: 'Поле "Запрос" не должно быть пустым!',
                            },
                        ]}
                    >
                        <Input disabled={edit.request === undefined} />
                    </Form.Item>

                    <Form.Item
                        label="Название"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Поле "Название" не должно быть пустым!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <SelectComponent />
                    <SliderComponent />
                </Form>
            </Modal >
        </>
    )
}
export default ModalWindow;

