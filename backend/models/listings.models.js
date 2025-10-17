const mongoose = require("mongoose");

const venuesSchema = new mongoose.Schema(
    {
        userid: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        location:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        phoneno:{
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        content: {
            type: String
        }
    }
)

const venue = mongoose.model("venue", venuesSchema);

module.exports = venue;