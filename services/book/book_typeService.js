const model = require("../../models/book/book_typeModel");

async function getBookTypeList(){
    return model.getBookTypeList();
}

module.exports = {
    getBookTypeList
}