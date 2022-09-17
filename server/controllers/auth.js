const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const database = require('../utils/database')
const errorHandler = require('../utils/errorHandler')
const keys = require('../config/keys')

const databaseName = 'users'

// контроллер для написания методов роутов авторизации

// метод логина в систему
module.exports.login =  function (req, res) {
    database.isExist(databaseName, {email: req.body.email})
        .then(async userExistInSystem => {
            if (userExistInSystem) {
                // получаем пользователя из бд по его почте
                const [user] = await database.getOneField(databaseName, {email: req.body.email})
                // сравниваем при помощи bcrypt введенный пароль и закодированный
                const passwordResult = bcrypt.compareSync(req.body.password, user.password)

                if (passwordResult){
                    // генерация токена, пароли совпали
                    const token = jwt.sign({
                        userId: user.id,
                        email: user.email,
                        name: user.name
                    }, keys.jwt, {})
                    //{expiresIn: 60} - время жизни токена можно указать

                    res.status(200).json({
                        message: 'Сотрудник успешно авторизован',
                        token: `Bearer ${token}`
                    })
                } else {
                    // пароли не совпали
                    res.status(401).json({
                        message: 'Пароли не совпадают, попробуйте снова'
                    })
                }
            } else {
                res.status(404).json({
                    message: `Такой пользователь не найден в системе`
                })
            }
        })
        .catch(error => errorHandler(res, error))
}

// метод регистрации в систему
module.exports.register = async function (req, res) {

    const {userName, userEmail, userPassword} = req.body
    const salt = bcrypt.genSaltSync(10)

    // генерируем модель пользователя с созданием закодированного пароля
    const user = new User(
        userEmail,
        bcrypt.hashSync(userPassword, salt),
        userName)

    database.isExist(databaseName, {email: user.email})
        .then(userExistsInSystem => {
            if (userExistsInSystem) {
                res.status(409).json({
                    message: `Пользователь ${user.name} уже зарегистрирован в системе.`
                })

                console.log(`User \"${user.name}\" exists in system`)
            } else {
                const modelToSave = user.getModel()
                database.save(databaseName, modelToSave)
                    .then(() => {
                        res.status(201).json({message: `Пользователь успешно добавлен в систему.`})
                        console.log(`It\`s a new user. Added to database \"${user.name}\" with email \"${user.email}\"`)
                    })
                    .catch(error => errorHandler(res, error))
            }
        })
        .catch(error => errorHandler(res, error))
}

// метод смены пароля, пока что никак не используется
module.exports.changeData = function (req, res) {
    const salt = bcrypt.genSaltSync(10)
    const newPassword = req.body.password
    database.changeData(databaseName,
        {email: req.body.email},
        {password: bcrypt.hashSync(newPassword, salt)})
        .then(() => {
            res.status(201).json({
                message: "password successfully changing"
            })
            console.log(`user's password with email ${req.body.email} successfully changing`)
        })
        .catch(error => errorHandler(res, error))
}