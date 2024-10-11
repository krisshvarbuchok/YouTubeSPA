import { useSelector } from 'react-redux';
import styles from './warningComponent.module.css';


const WarningComponent = () =>{
    const warning = useSelector(state => state.warning);

    return (
        <div className={styles.warning}>
            {warning}
        </div>
    )
}
export default WarningComponent;