import isFavoriteHelper from "../helper/isFavoriteHelper";

function addFavoritesLocal (email, request) {
    const favorites = JSON.parse(localStorage.getItem(email)) || [];

    if(!isFavoriteHelper(favorites, request.request)){
        favorites.push(request)
    }
    localStorage.setItem(email, JSON.stringify(favorites))

}
export default addFavoritesLocal;