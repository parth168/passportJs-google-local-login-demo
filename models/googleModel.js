const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    googleid:String
});

const User = mongoose.model('user',userSchema);

module.exports = User;