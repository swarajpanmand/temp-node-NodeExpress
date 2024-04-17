


const login = async (req,res) =>{
    res.send("Fake Loign/Register route")
}

const dashboard = async (req,res)=> {
    const LuckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`hello swaraj`, secret:`here is your authorized data ${LuckyNumber}`})
}


module.exports = {
    login,
    dashboard
}