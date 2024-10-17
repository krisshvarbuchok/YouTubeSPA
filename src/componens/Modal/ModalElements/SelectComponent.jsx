import { Cascader } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelect } from '../../../redux/listSlice/SelectSlice';
import { chahgeSelectInEdit } from '../../../redux/listSlice/EditElementSlice';


const SelectComponent = () => {
  const select = useSelector(state => state.select);
  const dispatch = useDispatch();
  const edit = useSelector(state => state.edit);
    
    const options = [
        {
          value: 'searchSortUnspecified',
          label: 'Без сортировки',
        },
        {
          value: 'date',
          label: 'По дате',
        },
        {
          value: 'rating',
          label: 'По рейтингу',
        },
        {
          value: 'relevance',
          label: 'По запросу',
        },
        {
          value: 'title',
          label: 'По алфавиту',
        },
        {
          value: 'viewCount',
          label: 'По просмотрам',
        }
    ];

    const onChange = (value) => {
      console.log(...value);
      if(Object.keys(edit).length === 0){
        dispatch(changeSelect(value[0]));;
     } else {
        dispatch(chahgeSelectInEdit(value[0]));
    }
       
      };
    return (
        <div>Сортировать по
            <Cascader options={options} onChange={onChange} value={Object.keys(edit).length === 0 ? [select] : [edit.select]} />
        </div>
    )
}
export default SelectComponent;