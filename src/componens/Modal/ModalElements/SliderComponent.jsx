import { Button, Input, Modal, Col, InputNumber, Row, Slider, Space, Cascader } from 'antd';
import React, { useState } from 'react';


const SliderComponent = () =>{
    const [inputValue, setInputValue] = useState(1);
    
    const onChange = (newValue) => {
        setInputValue(newValue);
    };


    return (
        <div>Максимальное количество
                    <Row>
                        <Col span={12}>
                            <Slider
                                min={1}
                                max={50}
                                onChange={onChange}
                                value={typeof inputValue === 'number' ? inputValue : 0}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                min={1}
                                max={50}
                                style={{
                                    margin: '0 16px',
                                }}
                                value={inputValue}
                                onChange={onChange}
                            />
                        </Col>
                    </Row>
                </div>
    )
}
export default SliderComponent;