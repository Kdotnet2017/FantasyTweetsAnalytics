var mongoose=require("mongoose");
var Schema=mongoose.Schema;
//creating Twitter model
var TwitterSchema=new Schema({
    twitterId:{
        type:String,
        required:true,
        unique:true
    },
    tweets:{
        type:Number,
        default:0
    },
    startDate:{
        type:Date,
        default:Date.now
    },
    endDate:{
        type:Date,
        default:Date.now
    }
});
var Twitter=mongoose.model("Twitter",TwitterSchema);
module.exports=Twitter;