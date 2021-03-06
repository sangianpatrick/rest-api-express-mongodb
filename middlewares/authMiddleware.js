const { bearerAuth } = require('../helpers/authHelper')

const authorize = function(){
    console.log('authorizing')
    return (req, res, next) => {
        bearerAuth(req, (error, decoded) => {
            if(error){
                res.status(401).json({error})
                // console.log(error)
            }else{
                req.user = {id: decoded.id}
                console.log(req.user)
                next()
            }
        })
    }
}

module.exports = { authorize }