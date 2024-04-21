
const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')

const login = async (req,res) =>{
    const {username, password} =req.body

    if(!username || !password){
        throw new BadRequestError('Please provide password and username!!')
    }

    //just for the demo , normally provided by DB
    const id = new Date().getDate()
 
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      })
    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req,res)=> {
    console.log(req.user )
    const LuckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`hello ${req.user.username}`, secret:`here is your authorized data ${LuckyNumber}`}) 
    
    
}


module.exports = {
    login,
    dashboard,
}
