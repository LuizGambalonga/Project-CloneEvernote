const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
let userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required:true , unique: true},
    password: {type: String, required:true},
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
})
// transformar o password em Hash.
userSchema.pre('save', function(next){
    if(this.isNew ||this.isModified('password')){
        const document = this;  
        // chama bibliteca para criptografar a senha e o numer 10 é a quantidade de caracter aleatorio.
        bcrypt.hash(this.password,10,
        (err,hashedPassword)=>{
            if(err){
                next(err)
            }else{
                this.password = hashedPassword;
                next();
            }
        })
    }
})

//metodo de comparar password
userSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password,this.password, function(err,same){
        if(err)
        callback(err);
        else
        callback(err,same);
    })
}

module.exports = mongoose.model('User', userSchema);