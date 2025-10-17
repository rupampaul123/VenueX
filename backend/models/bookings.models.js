const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema(
    {
        venueid:{
            type: String,
            required: true
        },
        userid:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        phoneno:{
            type: Number,
            required: true
        },
        start:{
            type: Date,
            required: true
        },
         end:{
            type: Date,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    }
)

const bookings = mongoose.model("bookings", bookingsSchema);

module.exports = bookings;