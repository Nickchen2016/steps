const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weekSchema = new Schema({
    createdTime: {type:Number, required: true},
    dates: [{
        date: {type:Number, required: true},
        steps: {type:Number, required:true}
    }]
 })

 module.exports = mongoose.model('week', weekSchema);