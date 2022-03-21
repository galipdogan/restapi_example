var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/gezilecekYerler') 
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));
mongoose.set('debug', true);

mongoose.Promise = Promise;

var yerSchema = new mongoose.Schema({
    isim: {
        type: String,
        required: 'Yer ismi bos olamaz'
    },
    ziyaret: {
        type: Boolean,
        default: false
    },
    olusturulmaTarihi: {
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model('Yer', yerSchema);