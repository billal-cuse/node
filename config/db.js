const mongoose = require('mongoose')

const connectMongo = async (mongoLink)=>{
    try {
        const server = mongoose.connect(mongoLink).then(()=>{console.log("Database connected...")}).catch((err)=>{console.log(err)})
    } catch (error) {
        throw new Error("not connected")
    }
}

module.exports = connectMongo