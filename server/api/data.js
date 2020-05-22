const express = require('express');
const router = express.Router();

const WeekSchema = require('../model/dataSchema');


router.post('/', (req,res,next)=>{
    const week = new WeekSchema({
        createdTime: new Date().getTime(),
        dates: [
            {
                "date": req.body.date,
                "steps": req.body.steps
            }
        ]
    });
    week.save().then(result => {
            console.log(result);
            res.status(201).json({
                createdProduct: result
            })
        })
        .catch(err => console.log(err));
})

router.patch('/:id', (req,res,next)=>{
    const id = req.params.id;
    WeekSchema.update({ _id:id },{ $push: {"dates":{"date":req.body.date,"steps":req.body.steps}}})
    .then(doc=> {
        console.log(doc);
        res.status(200).json({doc});
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.get('/', (req,res,next)=>{
   WeekSchema.find()
   .exec()
   .then(docs=>{
       console.log(docs);
       res.status(200).json(docs);
   }) 
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error: err
       })
   })
})

router.delete('/:id', (req,res,next)=>{
    const id = req.params.id;
    WeekSchema.remove({ _id:id })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })

})
module.exports = router;