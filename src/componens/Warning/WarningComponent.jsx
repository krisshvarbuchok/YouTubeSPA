import styles from './warningComponent.module.css';
import useAppSelectors from '../../hooks/useAppSelectors';


const WarningComponent = () =>{
    const {warning} = useAppSelectors();
    
    return (
        <div className={styles.warning}>
            {warning}
        </div>
    )
}
export default WarningComponent;