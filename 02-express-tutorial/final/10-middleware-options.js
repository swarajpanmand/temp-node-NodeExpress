const express = require('express')
const app = express()
const morgan = require('morgan')
const logger = require('./logger')
const authorize = require('./authorize')


app.use(morgan('tiny'))
app.get('/',(req,res)=>{
    
    res.send('Home')
})
app.get('/about', (req,res) =>{
    res.send('about')
})
app.get('/api/products',(req,res) =>{
    res.send('Products')
})
app.get('/api/items', (req,res) =>{
    onsole.log(req.user)
    res.send('Items')
})


app.listen(5000, ()=>{
    console.log('server is listening on port 5000')
})
