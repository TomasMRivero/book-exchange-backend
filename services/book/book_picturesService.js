const model = require("../../models/book/book_picturesModel");

async function uploadBookPictures(pictureParams){
    const {
        book_id,
        pictures,
        timestamp
    } = pictureParams;
    console.log(pictures)
    for(const picture in pictures){
        console.log(pictures[picture])
        const picture_route = `uploads/book/${pictures[picture].filename}`

        const setParams = {
            book_id: book_id,
            picture_dir: picture_route,
            timestamp: new Date(timestamp)
        }
        console.log(setParams)
        await model.uploadPicture(setParams);
    }
}

async function getBookPictures(id){
    return await model.getBookPictures(id);
}

module.exports={
    uploadBookPictures,
    getBookPictures
}