const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    password:String
});

const UserLocal = mongoose.model('userlocal',userSchema);

module.exports = UserLocal;