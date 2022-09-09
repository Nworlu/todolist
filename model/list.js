let mongoose = require ('mongoose')
const todolistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 0,
        max: 25,
    },


    date:{
        type: Date,
        required: true,

    },

    completed:{
        type: Boolean,
        required: true,
        
    },

    importance:{
        type:Boolean,
    },
})

const Lists = mongoose.model("todolist", todolistSchema)

module.exports = Lists