const user = require('../models/MSQL').user;
const response = require('express');


exports.createUser = async (req, res = response) => {

    try {
        
        const {username,email,password } = req.params;

        if (!username || !email || password) {
            return res.status(400).json({
                    ok:false,
                    msg:'¡Todos los campos son obligatorios!'
            })
        }

        let resp = await user.create ({
            username,
            email,
            password
        })

        res.status(200).json({
            ok:true,
            resp
        })

    } catch (error) {
        
        res.status(500).json({
            ok:false,
            msg:'Error interno'
        })
    }


};

exports.listUsers = async (req, res = response) => {

    try {
        let resp = await user.findAll({});

        res.status(200).json({
            ok:true,
            resp
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error interno'
        })
    }

};

exports.findUser = async (req, res = response) => {
    
    const {username} = req.params;
    
    if (!username) {
        return res.status(400).json({
             ok:false,
             msg:'¡Ingrese un usuario valido!'
        })
    }
   
    return user.findAll({
        where: {
            username: username,
        }
    })
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))
};