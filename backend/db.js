const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://akshatkindle:Aisehi%401234@akbase.zt293q8.mongodb.net/paytm');

const accountSchema= mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
    required: true
},
    balance: {
    type: Number,
    required: true
}})

const account=mongoose.model('account',accountSchema);

module.exports={ account }
