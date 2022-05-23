const db = require('../db');
const User = require('../models/User')
// const User = require('../models/User')

// req - все данные, которые отправляет пользователь
module.exports.login = function (req, res){
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}

//req.body.email or req.body.password - получать данные от пользователя
module.exports.register = function (req, res){
    const userId = req.body.id
    const userEmail = req.body.email
    const userPassword = req.body.password
    const userName = req.body.name

    const user = new User(userId, userEmail, userPassword, userName)

    user.save()
        .then(() => console.log(`added to database ${user.name} with email ${user.email}`))

    res.status(200).json({
        message: `Created new user ${user.name}`
    })
}

module.exports.changeData = function (req, res){

}

module.exports.getById = async function (req, res){
    const data = await db('users').where({email: 'senya@mail.ru'});
    console.log(data)
}