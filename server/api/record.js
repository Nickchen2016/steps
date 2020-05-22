const express = require('express');
const router = express.Router();

const RecordSchema = require('../model/recordSchema');
const time = new Date();
const date = time.getMonth()+'/'+time.getDate()+'/'+time.getFullYear();

router.post('/', (req,res,next)=>{
    const record = new RecordSchema({
        createdTime: date,
        data: req.body.data
    });
    record.save().then(result => {
            console.log(result);
            res.status(201).json({
                createdProduct: result
            })
        })
        .catch(err => console.log(err));
})

router.get('/', (req,res,next)=>{
    RecordSchema.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.patch('/:id', (req,res,next)=>{
    const id = req.params.id;
    RecordSchema.update({_id:id}, { $set: {"createdTime": date, "data": req.body.data} })
    .then(result=> {
        console.log(result);
        res.status(200).json({result});
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({error: err});
    })
})

module.exports = router;