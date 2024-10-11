import { useDispatch, useSelector } from "react-redux";

const FavoritesComponent = () => {
    const favorite = useSelector(state => state.favorite);
    console.log(favorite);
    

    return(
        <div>
            {favorite.map(item => {
                return <li key={item.id}>{item.name}</li>
            })}
        </div>
    )
}
export default FavoritesComponent;