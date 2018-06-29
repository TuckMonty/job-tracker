var mongoose = require("mongoose")

var jobSchema = new mongoose.Schema({
    job: String,
    time:String,
    loc:String,
    additionalComments:String,
    createdAt:{type:Date, default: Date.now},
    requester:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String,
        name:String
    }
})

module.exports = mongoose.model("Job", jobSchema)