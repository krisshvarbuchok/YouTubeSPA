import { Button, Input, Modal, Col, InputNumber, Row, Slider, Space, Cascader } from 'antd';


const SelectComponent = () => {
    
    const options = [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
    ];

    const onChange = (value) => {
        console.log(value);
      };
    return (
        <div>Сортировать по
            <Cascader options={options} onChange={onChange} placeholder="Please select" />
        </div>
    )
}
export default SelectComponent;