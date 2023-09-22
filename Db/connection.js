const mongoose = require("mongoose")


// const connection =mongoose.connect("mongodb://127.0.0.1:27017/Folio");
const connection =mongoose.connect(process.env.connection);


module.exports = connection