const Product = require('../models/product')

const getAllProductsStatic = async (req,res) =>{
    const products = await Product.find({price:{$gt:30}})
    .select('name price')
    //console.log('Products createdAt:', products.map(product => product.createdAt));
    res.status(200).json({products, nbHits:products.length})
}

const getAllProducts = async (req,res) =>{
    const {featured, company, name, sort,fields, numericFilter}  =req.query
    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true' ? true :false 
    }
    if(company){
        queryObject.company =company
    }
    if(name){
        queryObject.name = {$regex:name , $options:'i'}
    }

    if(numericFilter){
        const operatorList = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilter.replace(regEx, (match) => `-${operatorList[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field , operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }

    let result = Product.find(queryObject)
    //sort
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }

    //fields
    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10 
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result.limit(10)
    res.status(200).json({ nbHits:products.length,products})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}