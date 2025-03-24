const mongoose = require('mongoose');

const workout = new mongoose.Schema({
    user: {type: String, required: true},
    Date: {type: Number , required: true},
    Duration: {type: Number, required: true},
    calorieBurned: {type: Number},
    Excercise:[
       Name={type:String, required: true},
       Reps={type:Number},
       Sets={type:Number},
       weight={type:Number}
    ]
})

const newWorkout = mongoose.model('newWorkout',workout);
module.exports = newWorkout;