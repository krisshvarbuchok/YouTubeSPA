import { Button, Input, Modal, Col, InputNumber, Row, Slider, Space, Cascader } from 'antd';


const SelectComponent = () => {
    
    const options = [
        {
          value: 'chart',
          label: 'Чарт',
          children: [
            {
              value: 'chartUnspecified',
              label: 'нет',
            },
            {
              value: 'mostPopular',
              label: 'популярное',
              children: [
                {
                  value: 'videoCategoryId',
                  label: 'выберите категорию',
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