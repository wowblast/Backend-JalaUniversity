import express from "express";
import  uploadFile from '../api/routes/file';
import  accountInfo from '../api/routes/accountInfo';

const app = express();
app.use(express.json());

app.use('/api/', uploadFile);
app.use('/api/accountInfo', accountInfo);


export default app;