import { useDispatch, useSelector } from "react-redux";
import Header from "./Header/Header";
import Search from "./SearchBody/Search";

const Succesed = () =>{
    const dispatch = useDispatch();
    const {status, error} = useSelector(state => state.list);
    if(status === 'loading'){
        return <div>...loading</div>
    }
    if( status === 'failed') {
        return <div>УПС... что-то пошло не так: {error.message}</div>
    }
    
    return (
        <>
            <Header />
            <Search />
        </>
    )
}

export default Succesed;