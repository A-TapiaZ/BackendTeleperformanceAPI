/* Controllers */
const userController = require('../controllers/userController');
const gamesController = require('../controllers/gamesController');
const {userRegister, userLogin, checkToken} = require('../utils/userAuth');


module.exports = (app) => {

    // MONGODB
    //Ruta para el registro del usuario.
    app.post('/api/registerUser', userRegister);
    //Ruta para el login del usuario.
    app.post('/api/loginUser', userLogin);


    // MYSQL
    // Crear perfil en la DB de MYSQL.
    app.post('/api/user/create/username/:username/email/:email', userController.createUser);
    // Lista todos los usuarios registrados en la DB de MYSQL. 
    app.get('/api/user/list', userController.listUsers);
    // Retorna toda la informacion del usuario ingresado
    app.get('/api/user/find/username/:username', userController.findUser);


    // Añade el juego favorito con la informacion del usuario (Relacion FK)
    app.post('/api/games/addFavorite', checkToken,gamesController.addGameFavorites);
    // Retorna la informacion de los juegos favortitos del usuario
    app.get('/api/games/find', gamesController.findGame);
    // Actualiza el juego favorito que ingreso el usuario
    app.put('/api/games/update', gamesController.editFavoriteGames);
    // Elimina la informacion del usuario con su juego favorito
    app.delete('/api/games/delete', gamesController.deleteFavoriteGames);

    // Consulta el api de twitch, y trae una lista de juegos
    app.get('/api/twitchListGames', gamesController.returnGames);
    // app.get('/api/twitchFindGamesId', gamesController.returnIdGames);
};