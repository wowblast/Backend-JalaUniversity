import express from "express";
import  report from './routes/report';

const app = express();
app.use('/api/report', report);


export default app;