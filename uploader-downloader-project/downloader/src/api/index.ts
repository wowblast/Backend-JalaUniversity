import express from "express";
import  file from '../api/routes/file';
import  accountInfo from '../api/routes/accountInfo';
import accountReport from "./routes/accountReport";
import fileReport from "./routes/fileReport";
const app = express();
app.use(express.json());

app.use('/api/accountInfo', accountInfo);
app.use('/api/file', file);
app.use('/api/fileReport', fileReport);
app.use('/api/accountReport', accountReport);




export default app;