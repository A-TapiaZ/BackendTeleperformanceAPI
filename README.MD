# BackendTeleperformanceAPI

_Wrapper de Twitch
(https://dev.twitch.tv/docs/api/) junto con un modelo de datos persistido
en MySQL y mongoDB._

## Comenzando 🚀

_Estas instrucciones te permitirán poner el proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

_Que cosas necesitas para correr el software_

```
Tener instalado NodeJs en tu maquina local y Postman, para correr las rutas, tambien debes tener un gestor de base de datos de MySQL (Local) y de MongoDB (Local-Nube)
```

### Instalación 🔧

_Para instalar el proyecto debes ingresar el siguiente comando en tu cmd de Windows o en la terminal de comandos de VS Code_

```
npm install
```

_Luego de finalizar con la instalación de dependencias procedemos a correr el proyecto_

## Ejecutando el proyecto ⚙️

_Para ejecutar el proyecto debes ingresar el siguiente comando en tu cmd de Windows o en la terminal de comandos de VS Code_


_Si es para ejecutarlo en modo **Desarrollo**_


```
npm run dev 
```


## Documentación del proyecto 📖

La siguiente documentación contiene las rutas y la forma de utilizar el proyecto: 


(https://documenter.getpostman.com/view/9184620/UV5ZBbq1)


Aquí la explicación de las rutas:


Para **Registrarse** Este metodo es para consultar las demas rutas ya que estan protegidas por login: 

```
/api/registerUser
```

Para **Iniciar sesión**:

```
/api/loginUser
```

Para **Crear un usuario y añadirle sus juegos favoritos** (Este va a obtener el usuario y el email por medio de parametros en la URL):

```
/api/user/create/username/:username/email/:email
```

Para **Listar todos los usuario registrados**: 

```
/api/user/list
```

Para **Ver la informacion de un usuario en especifico** (Este va a obtener el usuario por medio de parametros en la URL):

```
/api/user/find/username/:username
```


Para **Agregar un juego favorito al usuario especificado**:

```
/api/games/addFavorite
```

Para **Para encontrar los juegos favoritos del id (usuario) especificado**:

```
/api/games/find
```

Para **Para actualizar el juego favorito del usuario**:

```
/api/games/update
```

Para **Para eliminar el juego favorito con el usuario registrado**:

```
/api/games/delete
```


Para **Listar los juegos de Twitch**:

```
/api/twitchListGames
```



## Construido con 🛠️

_Las siguientes librerias_

* [NodeJS](https://nodejs.org/es/) - El entorno backend usado
* [Express](https://expressjs.com/es/) - Gestor de servidor
* [MongoDB](https://www.mongodb.com/es) - Base de datos
* [MySQL](https://www.mysql.com/) - Base de datos
* [Mongoose](https://mongoosejs.com/) - Gestor de base de datos (Mongo)
* [Sequelize](https://sequelize.org/) - Gestor de base de datos (MySQL)
* [JWT](https://jwt.io/) - Usado para generar Token al iniciar sesión


## Autores ✒️

_Desarrollador del proyecto_

* **Diego Alejandro Tapias Pinzón** - *Desarrollador* - [A-Tapiaz](https://github.com/a-tapiaz)


## Licencia 📄

Este proyecto está bajo la Licencia (MIT)


---
⌨️ con ❤️ por [A-Tapiaz](https://github.com/a-tapiaz) 😊