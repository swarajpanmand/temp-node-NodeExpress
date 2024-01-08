const express = require('express');
const app = express();
const {products} = require('./data.js')

app.get('/', (req, res)=>{
    res.send('<h>home page</h><a href="/api/products">products</a>')
})

app.get('/api/products',(req,res)=>{
    const newProducts = products.map((product)=>{
        const{id,name,image} = product;
        return { id, name, image };
    })
    
    res.json(newProducts);
})

app.get('/api/products/:productID',(req,res)=>{
    // console.log(req);
    // console.log(req.params)
    const {productID} = req.params;
    const singleProduct = products.find(
        (product)=> product.id ===Number(productID)
    )
    if(!singleProduct){
        return res.status(404).send('Products does not exists')
    }

    res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    res.send('hello world')
  })

app.get('/api/v1/query', (req, res) => {
    const {search, limit } = req.query
    let sortedProducts = [...products];
    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
    }
    if(sortedProducts.length <1){
        res.status(200).send('no products matched you search')
    }
    res.status(200).json(sortedProducts)

    res.send('hello world')
})

app.listen(5000, ()=>{
    console.log('server is listening on port 5000')
})

