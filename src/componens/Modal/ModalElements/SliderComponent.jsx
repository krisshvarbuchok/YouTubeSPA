import { Col, InputNumber, Row, Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeNumberInEdit } from '../../../redux/listSlice/EditElementSlice';
import { setNewNumber } from '../../../redux/listSlice/NewNumberSlice';


const SliderComponent = () =>{
    const dispatch = useDispatch();
    const edit = useSelector(state => state.edit);
    const newNumber = useSelector(state => state.newNumber);
    
    
    
    const onChange = (newValue) => {
        if(Object.keys(edit).length === 0){
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
                                value={Object.keys(edit).length === 0 ? newNumber : edit.count}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                min={1}
                                max={50}
                                style={{
                                    margin: '0 16px',
                                }}
                                value={Object.keys(edit).length === 0 ? newNumber : edit.count}
                                onChange={onChange}
                            />
                        </Col>
                    </Row>
                </div>
    )
}
export default SliderComponent;