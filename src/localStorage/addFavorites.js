import isFavoriteHelper from "../helper/isFavoriteHelper";

function addFavoritesLocal (email, request) {
    //console.log(request);
    const favorites = JSON.parse(localStorage.getItem(email)) || [];
    //console.log(favorites);
    
    if(!isFavoriteHelper(favorites, request.request)){
        //console.log(request);
        
        favorites.push(request)
    }
    localStorage.setItem(email, JSON.stringify(favorites))
    //console.log('local',localStorage.getItem(email));
    
}
export default addFavoritesLocal;