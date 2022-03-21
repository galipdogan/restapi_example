var express = require('express'),
    router = express.Router(),
    Yer = require('../models/yer');


//DB de olan butun yerleri json olarak gonder
router.get('/', (req, res) => {
    Yer.find()
        .then((yerlerDB) => {
            res.json(yerlerDB)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })

})


//DB ye yen' yer eklemek icin kullanilan route
router.post('/', (req, res) => {
    console.log(req.body);
    Yer.create(req.body)
        .then((yeniYer) => {
            res.status(201).json(yeniYer)
        })
        .catch((err) => {
            console.log('==============HATA============');
            console.log(err);
            res.send(err)
        })
})

//show route - ozel olarak secilmis datanin detayli bilgisini gosteren route
router.get('/:yerID', (req, res) => {
    Yer.findById(req.params.yerID)
        .then((bulunanYemek) => {
            res.json(bulunanYemek)
        })
        .catch((err) => {
            console.log('==============HATA============');
            console.log(err);
            res.send(err)
        })

})

//update route - guncelleme route
router.put('/:yerId', (req, res) => {
    Yer.findByIdAndUpdate({_id:req.params.yerId},req.body,{new:true})
        .then((yer) => {
            res.json(yer)
        })
        .catch((err) => {
            console.log('==============HATA============');
            console.log(err);
            res.send(err)
        })

})

//delete route - silme route
router.delete('/:yerId', (req, res) => {
    Yer.remove({_id:req.params.yerId})
        .then(() => {
            res.json({mesaj:'Silindi'})
        })
        .catch((err) => {
            console.log('==============HATA============');
            console.log(err);
            res.send(err)
        })

})

module.exports = router;    