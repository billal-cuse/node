const userController = {}

userController.getUser = async (req,res) => {
    res.send('this is get req') 
}
userController.postUser = async (req,res) => {
    res.send(req.body)
}

module.exports = userController