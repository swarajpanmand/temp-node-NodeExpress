
const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./route/tasks')
const notFound = require('./middleware/not_found')
const errorHandlerMiddleware = require('./middleware/error_handler')
require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000
const start = async ()=>{
    try{ 
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}!`))
    }
    catch(err){
        console.log(err)
    }
}

start();
