const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
    },
    duration: {
        type: "string",
        required: true,
    },
    fees: {
        type: "string",
        required: true,
    },
    shortName:{
        type: "string",
    }
});

const CourseModel = mongoose.model('course',CourseSchema);

module.exports = CourseModel;