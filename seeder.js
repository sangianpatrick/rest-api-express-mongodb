require('dotenv').config()
const mongoose = require('mongoose')
const faker = require('faker/locale/id_ID')
const User = require('./models/userModel')

const db_uri = (process.env.APP_ENV == 'development'? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRODUCTION)
mongoose.connect(db_uri, {
    useCreateIndex: true,
    useNewUrlParser: true
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
    console.log('connected to db!')
})

// console.log(faker.name.lastName())
// console.log(faker.internet.email())

function test(){
    console.log('asdfasdf')
}

function addUser(u_count){
    if(u_count == 0){
        return console.log('done')
    }
    const user = new User()
    setTimeout(()=>{
        user.firstName = faker.name.firstName()
        user.lastName = faker.name.lastName()
        user.email = faker.internet.email()
        user.password = process.env.DEFAULT_USER_PASSWORD
        user.save()
        .then((new_user) =>{ console.log(new_user);addUser(u_count-1) })
        .catch((error) => { console.log(error) })
    }, 1500)
    test()
    
}

addUser(3)
