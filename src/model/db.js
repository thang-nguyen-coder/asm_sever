const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ASM_AndroidNetworking',{
    useNewUrlParser: true, useUnifiedTopology: true 
}).then(()=>{
    console.log("Connet SuccessFully");
})
.catch((err)=>{
    console.log('Loi ket noi CSDL');
    console.log(err);
})

module.exports = {mongoose};