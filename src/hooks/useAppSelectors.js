import { useSelector } from "react-redux";

const useAppSelectors = () => {
    const favorite = useSelector(state => state.favorite);
    const modal = useSelector(state => state.modal);
    const requestTotal = useSelector(state => state.requestTotal)
    const { data: { totalResults } } = useSelector(state => state.list);
    const display = useSelector(state => state.display);
    const isActive = useSelector(state => state.isActive);
    const select = useSelector(state => state.select);
    const edit = useSelector(state => state.edit);
    const request = useSelector(state => state.request);
    const name = useSelector(state => state.name);
    const warning = useSelector(state => state.warning);
    const { data } = useSelector(state => state.list);
    const { status, error } = useSelector(state => state.list);
    const { stats } = useSelector(state => state.list);
    const number = useSelector(state => state.number);
    const newNumber = useSelector(state => state.newNumber);

    return { favorite, modal, requestTotal, totalResults, display, isActive, select, edit, newNumber, request, name, warning, data, number, stats, status, error }
}
export default useAppSelectors;