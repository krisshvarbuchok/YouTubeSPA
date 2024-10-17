
const isFavoriteHelper = (data, request) => {
    console.log(data, request);

    return data.some(item => {
        //console.log(item.request.trim().toLowerCase() === request.trim().toLowerCase());
        return item.request.trim().toLowerCase() === request.trim().toLowerCase()
    })
}
export default isFavoriteHelper;