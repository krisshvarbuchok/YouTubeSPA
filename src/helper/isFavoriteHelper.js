
const isFavoriteHelper = (data, request) => {
    return data.some(item => {
        return item.request.trim().toLowerCase() === request.trim().toLowerCase();
    })
}
export default isFavoriteHelper;