//MogoDB connection
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to DB");
}).catch((e) => {
    console.log("Error while attempting to connect");
    console.log(e);
});


module.exports = {
    mongoose
};