require("../Config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/mongoDB/User");

// Crear usuario en la DB de mongo
const userRegister = async (req, res) => {

    if (!req.body.username) {
        return res.status(400).send("¡Por favor rellene el campo usuario!");
    } else if (!req.body.email) {
        return res.status(400).send("¡Por favor rellene el campo email!");
    } else if (!req.body.password) {
        return res.status(400).send("¡Por favor rellene el campo contraseña!");
    }    


    try {
        // Validamos que el correo no exista
        let emailNotRegistered = await validateEmail(req.body.email);
        if (!emailNotRegistered) {
            return res.status(400).json({
                message: `El email esta actualmente registrado.`,
                success: false
            });
        }

        // Encriptamos la contraseña
        const password = await bcrypt.hash(req.body.password, 12);
        // Creamos el usuario
        const newUser = new User({
            ...req.body,
            password
        });
        await newUser.save();
        return res.status(201).json({
            message: "Registrado con exito. Ahora inicia sesión",
            success: true
        });
    } catch (err) {
        console.log(err);
        if(!err.errors.password.message){
            return res.status(500).json({
                message: "No es posible crear la cuenta",
                success: false
            });
        } else {
            return res.status(500).send(err.errors.password.message);
        }
    }
};

// Login 
const userLogin = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password ){
        return res.status(400).send("¡Por favor ingrese un usuario y una contraseña valida!");
    }

    // Validamos que el usuario se encuentre en la DB
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send("¡Usuario no encontrado, credenciales invalidas para iniciar sesion!");
    }

    // Validamos la contraseña
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        //Creamos el token de sesion
        let token = jwt.sign(
        {
            user_id: user._id,
            username: user.username,
            emai: user.email
        },
        process.env.SECRET,
        { expiresIn: "1h" }
        );

        let result = {
            token: `${token}`,      
        };
        return res.status(200).json({
            ...result
        });
    } else {
        return res.status(403).json({
            message: "Contraseña incorrecta."
        });
    }
};

// Funcion para validar correo.
const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
};


// Verificamos que el token sea vigente
const checkToken = (req, res, next) => {
    try {
        const {token} = req.headers;
        dataToken= jwt.verify(token, process.env.SECRET);
        req.infoToken = dataToken;
        next(); 
    } catch (error) {
      console.log(error.message);
      res.status(401).send('¡Token no valido, asegurate de estar logueado!')
    }
};


module.exports = {
    checkToken,
    userLogin,
    userRegister
};