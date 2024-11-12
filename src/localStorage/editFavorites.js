
function editFavoritesLocal (email, request) {
    const favorites = JSON.parse(localStorage.getItem(email)) || [];
    const newFavorites = favorites.map(item  => item.id === request.id ? 
        {...item, request: request.request, name: request.name, count: request.count, select: request.select} : 
        item);
    localStorage.setItem(email, JSON.stringify(newFavorites))
    
}
export default editFavoritesLocal;