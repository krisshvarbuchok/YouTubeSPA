
function getFavoritesLocal (savedEmail) {

    return JSON.parse(localStorage.getItem(savedEmail)) || [];
}
export default getFavoritesLocal;