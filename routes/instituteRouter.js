const express = require("express");
const InstituteModel = require("../models/instituteModel");
const { sendResponse } = require("../helper/helper");

const route = express.Router();

route.get("/", async (req, res) =>{
    try{
        const result = await InstituteModel.find();
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
    let {name, address, shortName, tel} = req.body;
    let errArr = [];
    if(!name){
        errArr.push("Required: Name")
    }
    if(!address){
        errArr.push("Required: Address")
    }
    if(!tel){
        errArr.push("Required: Telephone#")
    }
    if(errArr.length > 0){
        res.send(sendResponse(false, errArr, "All Fields Required")).status(404)
    }
    else{
        let obj = {name, address, shortName, tel};
        let institute = new InstituteModel(obj);
        await institute.save();
        if(!institute){
            res.send(sendResponse(false, null, "Internal Server Error")).status(400);
        }
        else{
            res.send(sendResponse(true, institute, "saved successfully")).status(200);
        }
    }
});
route.put('/id', (req, res) =>{});
route.delete('/id', (req, res) =>{});

module.exports = route;