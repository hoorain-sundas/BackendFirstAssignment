const express = require("express");
const CourseModel = require("../models/courseModel");
const { sendResponse } = require("../helper/helper");

const route = express.Router();

route.get("/", async (req, res) =>{
    try{
        const result = await CourseModel.find();
        if(!result){
            res.send(sendResponse(false, null, "No Data Found")).status(404);
        } else{
            res.send(sendResponse(true, result, "Data Found" )).status(200);
        }
    }catch(e){
        res.send(sendResponse(false, null, "No Data")).status(400);
    }
});
route.get('/id', (req, res) =>{});
route.post('/', async (req, res) =>{
    let {name, duration, fees, shortName} = req.body;
    let errArr = [];
    if(!name){
        errArr.push("Required: Name");
    } 
    if(!duration){
        errArr.push("Required: Duration")
    }
    if(!fees){
        errArr.push("Required: Fees")
    }
    if(errArr.length > 0){
        res.send(sendResponse(false, errArr, null, "All Fields Required")).status(400);
        return;
    }
    else{
        let obj = {name, duration, fees, shortName};
        let course = new CourseModel(obj);
        await course.save();
        if(!student){
            res.send(sendResponse(false, null, "Internal Server Error")).status(400);
        }
        else {
            res.send(sendResponse(true, student, "saved successfully")).status(200);
        }
    }
});
route.put('/id', (req, res) =>{});
route.delete('/id', (req, res) =>{});

module.exports = route;