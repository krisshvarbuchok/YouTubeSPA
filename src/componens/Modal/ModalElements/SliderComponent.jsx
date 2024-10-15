import { Button, Input, Modal, Col, InputNumber, Row, Slider, Space, Cascader } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeNumber } from '../../../redux/listSlice/gridNumberSlice';
import { changeNumberInEdit } from '../../../redux/listSlice/EditElementSlice';


const SliderComponent = () =>{
    //const [inputValue, setInputValue] = useState(1);
    const dispatch = useDispatch();
    const number = useSelector(state => state.number);
    const edit = useSelector(state => state.edit);
    
    const onChange = (newValue) => {
        console.log('newValue', newValue);
        console.log('edit', edit, Object.keys(edit).length);
        
        if(Object.keys(edit).length === 0){
            console.log(edit);
            
            dispatch(changeNumber(newValue));
         } else {
            console.log(edit);
            
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
                                value={Object.keys(edit).length === 0 ? number : edit.count}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                min={1}
                                max={50}
                                style={{
                                    margin: '0 16px',
                                }}
                                value={Object.keys(edit).length === 0 ? number : edit.count}
                                onChange={onChange}
                            />
                        </Col>
                    </Row>
                </div>
    )
}
export default SliderComponent;