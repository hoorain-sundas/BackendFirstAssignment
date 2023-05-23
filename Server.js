const express = require("express");
const mongoose = require("mongoose");
const app = express();
const CourseRouter = require("./routes/courseRouter");
const InstituteRouter = require("./routes/instituteRouter");
const StudentRouter = require("./routes/studentRouter");
const TeacherRouter = require("./routes/teacherRouter");
require("dotenv").config();

app.use(express.json());
app.use("/api/course", CourseRouter);
app.use("/api/institute", InstituteRouter);
app.use("/api/student", StudentRouter);
app.use("/api/teacher", TeacherRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Database connected successfully and server is listening on this port 5000");
        });
    })
    .catch((err) => {
        console.log(err);
    });
