const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const user = require('../models/MSQL').user;
const games = require('../models/MSQL').games;
const response = require('express');
const { getGames, getIdGames } = require('../helpers/fetch');

exports.returnGames = async (req, res = response) => {
     
   try {
     let resp = await getGames();
     const {data} = resp;

     res.status(200).json({
          ok:true,
          data
     })

   } catch (error) {
     res.status(500).json({
          ok:false,
          msg:'Error interno'
     })
   }
};

exports.returnIdGames = async (req, res = response) => {
     
     try {

          let resp = await getIdGames();

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

exports.addGameFavorites = async (req, res = response) => {

     // console.log(req.infoToken);
     // const {user_id} = req.body;
     const {idJuegosSeguimiento,user_id} = req.body;

     if (!idJuegosSeguimiento || !user_id) {
          return res.status(400).json({
               ok:false,
               msg:'¡Ingrese un id de usuario/ id de juego!'
          })
     }

     // if(!idJuegosSeguimiento) {
          //      return res.status(400).send("¡Ingrese un id de juego valido!");
          // }

          
     const gamesR = await getIdGames();
          
     if(!gamesR.includes(idJuegosSeguimiento)){
          return res.status(400).send('Este id de juego no esta disponible, ingresa uno valido')
     }

     // const respBD = await games.findAll();

     // const newArray = [];

     // // respBD.idJuegosSeguimiento.forEach(element => {
     // //      newArray.push(element);
     // // });

     // if(newArray.includes(idJuegosSeguimiento)){
     //      return res.status(400).send("¡Ya ingresaste este juego!");
     // }

     // newArray.push(idJuegosSeguimiento);

     // User
     const responseUser = user.findOne({
          where: {
          [Op.or]: [{
               username: user_id
          },{
               id: user_id
          }]
          }
     });

     Promise
     .all ([responseUser])
     .then(responses => {
          if(responses[0] === null){
               return res.status(400).send('No se encontro el usuario');
          }
          return games
          .create ({
               user_id: responses[0].id,
               games: req.body.idJuegosSeguimiento, 
          })
          .then(games => res.status(201).send(games))
     })
     .catch(error => res.status(400).send(error));
};

exports.findGame = async (req, res = response) => {

     try {
          const {user_id} = req.body;

          if (!user_id) {
               return res.status(400).json({
                    ok:false,
                    msg:'Es necesario un id de usario'
               })
          }

          let resp = await games.findAll({
               where: {
                    user_id,
               }
          })

          if(resp.length === 0){
               return res.status(400).send('No se encontro el usuario');
          }

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

exports.editFavoriteGames = async (req, res = response) => {

     try {
          const {user_id, idJuegosSeguimiento} = req.body;

          if (!user_id || !idJuegosSeguimiento) {
               return res.status(400).json({
                    ok:false,
                    msg:'Es necesario un id de usuario/ id de juego'
               })
          }

          let resp = await games.update(
               {games:idJuegosSeguimiento},
               {where: {user_id: req.body.user_id}}
          )

          if(resp[0] === 0){
               return res.status(400).send('No se encontro el usuario');
          }

          res.status(201).json({
               ok:true,
               msg:'Actualizado exitosamente !'
          })

     } catch (error) {
          res.status(500).json({
               ok:false,
               msg:'Error interno'
          })  
    }
};

exports.deleteFavoriteGames = async (req, res = response) => {

     try {
          const {user_id} = req.body;

          if (!user_id) {
               return res.status(400).json({
                    ok:false,
                    msg:'Es necesario un id de usario'
               })
          }

          let resp = await games.destroy({
               where: {
                    user_id,
               }
          });

          console.log(resp === 0);

          if(resp === 0){
               return res.status(400).send('No se encontro el usuario');
          }

          res.status(201).json({
               ok:true,
               msg:"Eliminado exitosamente !"
          })
          
     } catch (error) {
          res.status(500).json({
               ok:false,
               msg:'Error interno'
          }) 
     }
};