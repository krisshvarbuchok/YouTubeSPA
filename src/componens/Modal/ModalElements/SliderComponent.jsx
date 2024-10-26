import { Col, InputNumber, Row, Slider } from 'antd';
import { useDispatch } from 'react-redux';
import { changeNumberInEdit } from '../../../redux/listSlice/EditElementSlice';
import { setNewNumber } from '../../../redux/listSlice/NewNumberSlice';
import useAppSelectors from '../../../hooks/useAppSelectors';
import isEditComponent from '../../../helper/isEditComponent';


const SliderComponent = () =>{
    const dispatch = useDispatch();
    const {edit, newNumber} = useAppSelectors();
    
    
    
    const onChange = (newValue) => {
        if(isEditComponent(edit)){
            dispatch(setNewNumber(newValue));
         } else {
            dispatch(changeNumberInEdit(newValue));
        }
    };


    return (
        <div>Максимальное количество
                    <Row>
                        <Col span={12}>
                            <Slider
                                min={1}
                                max={50}
                                onChange={onChange}
                                value={isEditComponent(edit) ? newNumber : edit.count}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                min={1}
                                max={50}
                                style={{
                                    margin: '0 16px',
                                }}
                                value={isEditComponent(edit) ? newNumber : edit.count}
                                onChange={onChange}
                            />
                        </Col>
                    </Row>
                </div>
    )
}
export default SliderComponent;