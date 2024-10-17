
function editFavoritesLocal (email, request) {
    //console.log(request);
    const favorites = JSON.parse(localStorage.getItem(email)) || [];
    //console.log(favorites);
    const newFavorites = favorites.map(item  => item.id === request.id ? {...item, request: request.request, name: request.name, count: request.count, select: request.select} : item);
        
    localStorage.setItem(email, JSON.stringify(newFavorites))
    //console.log('local',localStorage.getItem(email));
    
}
export default editFavoritesLocal;