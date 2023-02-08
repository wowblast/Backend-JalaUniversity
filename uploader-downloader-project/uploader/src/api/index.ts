import express from "express";
import  uploadFile from '../api/routes/file';
import  account from '../api/routes/account';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/', uploadFile);
app.use('/api/account', account);



export default app;