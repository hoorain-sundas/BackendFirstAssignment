const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
    }, 
    address: {
        type: "string",
        required: true,
    }, 
    shortName: {
        type: "string",
    }, 
    tel: {
        type: "string",
        required: true,
    },
});

const InstituteModel = mongoose.model("institute", InstituteSchema);

module.exports = InstituteModel;