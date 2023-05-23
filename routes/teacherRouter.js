const express = require("express");
const TeacherModel = require("../models/teacherModel");
const { sendResponse } = require("../helper/helper");

const route = express.Router();

route.get("/", async (req, res) =>{
    try{
        const result = await TeacherModel.find();
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
route.post("/", async (req, res) =>{
    let {name, course, contact} = req.body;
    let errArr = [];
    if(!name){
        errArr.push("Required: Name");
    }
    if(!course){
        errArr.push("Required: Course");
    }
    if(!contact){
        errArr.push("Required: Contact");
    }
    if(errArr.length > 0){
        res.send(sendResponse(false, errArr, "All Fields Required")).status(404);
    } 
    else{
        let obj = {name, course, contact};
        let teacher = new TeacherModel(obj);
        await teacher.save();
        if(!teacher){
            res.send(sendResponse(false, null, "Internal Server Error")).status(404);
        }
        else{
            res.send(sendResponse(true, teacher, "saved successfully")).status(200);
        }
    }
});
route.put('/id', (req, res) =>{});
route.delete('/id', (req, res) =>{});

module.exports = route;