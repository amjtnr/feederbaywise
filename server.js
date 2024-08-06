import express from "express";
import dotenv from 'dotenv';
import distributionsRoutes from './routes/distributionRoutes.js';
import transmissionRoutes from './routes/transmissionRoutes.js';
import connectDB from "./config/conn.js";
import cors from 'cors';
import path from 'path';
import fs from 'fs';


// import os from 'os';
// import axios from 'axios';

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

const port = process.env.PORT || 5000;

const __dirname = path.resolve(path.dirname('')); 
const filePath = path.join(__dirname,'./uploads');
if (!fs.existsSync(filePath)) {
fs.mkdirSync(filePath);
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, XMLHttpRequest, ngsw-bypass, Lng, Lang');
    next();
});

app.use('/api/distribution',  distributionsRoutes  );
app.use('/api/transmission',  transmissionRoutes  );
app.all('*', (req, res) => {
    res.send({message:"can't find the requested url"});
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
