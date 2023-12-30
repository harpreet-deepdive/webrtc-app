import express from  'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// helmet
app.use(helmet());

// parse json request url
app.use(express.json());

// cors
app.use(cors());

// Serving static files
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// mongo sanitize
app.use(mongoSanitize());

// cookie parser
app.use(cookieParser());


export default app
