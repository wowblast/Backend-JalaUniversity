import express from 'express';
import app from './Api/'
const port = '3000'
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "ejs");

//app.use(express.static(path.join(__dirname, "public")));
app.listen(port)
console.log("ready")