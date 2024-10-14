import { Button, Input, Modal, Col, InputNumber, Row, Slider, Space, Cascader } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeNumber } from '../../../redux/listSlice/gridNumberSlice';


const SliderComponent = () =>{
    //const [inputValue, setInputValue] = useState(1);
    const dispatch = useDispatch();
    const number = useSelector(state => state.number);
    const edit = useSelector(state => state.edit);
    
    const onChange = (newValue) => {
        console.log('newValue', newValue);
        
        dispatch(changeNumber(newValue));
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