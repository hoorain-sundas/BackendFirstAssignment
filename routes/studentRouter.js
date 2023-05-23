const express = require("express");
const StudentModel = require("../models/studentModel");
const { sendResponse } = require("../helper/helper");
const route = express.Router();

route.get("/", async (req, res) =>{
    const result = await StudentModel.find();
    try{
        
        if(!result){
            res.send(sendResponse(false, null, "No Data Found")).status(404);
        } else{
            res.send(sendResponse(true, result)).status(200);
        }
        
    } catch(e){
        console.log(e);
        res.send(sendResponse(false, null, "no data")).status(400);
    }
    // res.send("Get All Students Data");
});
route.get('/id', (req, res) =>{});
route.post('/', async (req, res) =>{
    let {firstName, lastName, email, password, contact} = req.body;
    let errArr = []
    if(!firstName){
        errArr.push("Required: First Name")
    }
    if(!email){
        errArr.push("Required: Email")
    }
    if(!password){
        errArr.push("Required: Password")
    }
    if(!contact){
        errArr.push("Required: Contact")
    }
    if(errArr.length > 0){
        res.send(sendResponse(false, errArr, null, "Required All Fields")).status(400);
        return;
    } else {
        let obj = {firstName, lastName, email, password, contact};
        let student = new StudentModel(obj);
        await student.save();
        if(!student){
            res.send(sendResponse(false, null, "Internal Server Error"))
            .status(400);
        } else{
            res.send(sendResponse(true, student, "saved Successfully"))
            .status(200);
        }
    }
});
route.put('/id', (req, res) =>{});
route.delete('/id', (req, res) =>{});

module.exports = route;