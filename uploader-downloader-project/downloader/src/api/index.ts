import express from "express";
import  file from '../api/routes/file';
import  accountInfo from '../api/routes/accountInfo';

const app = express();
app.use(express.json());

app.use('/api/accountInfo', accountInfo);
app.use('/api/file', file);



export default app;