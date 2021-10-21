const mongoose = require("mongoose");


const dbConnection = async() => {
    try {
        
        await mongoose.connect(process.env.MONGODB_CNN)
        console.log('mongo conectado');

    } catch (error) {
        console.log(error);
        throw new Error ('Error al inicializar base de datos')
    }
}

module.exports={
    dbConnection,
}