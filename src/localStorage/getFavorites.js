
function getFavoritesLocal (savedEmail) {
    //console.log(savedEmail);
    
    //console.log(JSON.parse(localStorage.getItem('kristi@gmail.ru')));
    
    return JSON.parse(localStorage.getItem(savedEmail)) || [];
}
export default getFavoritesLocal;