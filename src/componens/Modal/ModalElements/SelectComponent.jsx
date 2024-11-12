import { Cascader } from 'antd';
import { useDispatch } from 'react-redux';
import { changeSelect } from '../../../redux/listSlice/SelectSlice';
import { chahgeSelectInEdit } from '../../../redux/listSlice/EditElementSlice';
import useAppSelectors from '../../../hooks/useAppSelectors';
import isEditComponent from '../../../helper/isEditComponent';


const SelectComponent = () => {
  const dispatch = useDispatch();
  const { select, edit } = useAppSelectors();

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
    if (isEditComponent(edit)) {
      dispatch(changeSelect(value[0]));;
    } else {
      dispatch(chahgeSelectInEdit(value[0]));
    }

  };
  return (
    <div>Сортировать по
      <Cascader options={options} onChange={onChange} value={isEditComponent(edit) ? [select] : [edit.select]} />
    </div>
  )
}
export default SelectComponent;