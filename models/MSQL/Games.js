'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      games.belongsTo(models.user,
        {
            as: 'user',
            foreignKey: 'user_id',
        }
    );
    }
  };
  games.init({
    user_id: DataTypes.INTEGER,
    games: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'games',
  });
  return games;
};