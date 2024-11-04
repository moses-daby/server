import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './routes/auth.routes.js'

dotenv.config();

mongoose
.set('strictQuery', false)
.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('connected to database')
}) .catch((error) => {
    console.log(error.message)
});


const PORT = process.env.PORT || 5000;
const authRoutes = router;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    credentials: true,
}));

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
})