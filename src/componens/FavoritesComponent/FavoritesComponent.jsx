import { useDispatch, useSelector } from "react-redux";

const FavoritesComponent = () => {
    const favorite = useSelector(state => state.favorite);

    return(
        <div>
            {favorite.map(item => {
                return <li>{item}</li>
            })}
        </div>
    )
}
export default FavoritesComponent;