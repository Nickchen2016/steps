const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    createdTime: {type:String, required: true},
    data: {type:Number, required:true}
 })

 module.exports = mongoose.model('record', recordSchema);