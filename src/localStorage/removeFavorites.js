
function removeFavoritesLocal (email, request) {
    const favorites = JSON.parse(localStorage.getItem(email) || []);
    const newFavorites = favorites.filter(item => item.id !== request);
    localStorage.setItem(email, JSON.stringify(newFavorites));
    
}
export default removeFavoritesLocal;