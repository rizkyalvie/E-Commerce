'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      product.belongsTo(models.user, {
        as: "seller",
        foreignKey: {
          name: "idUser"
        }
      })


      product.belongsToMany(models.category, {
        as: "categories",
        through: {
          model: "productCategory",
          as: "bridge"
        },
        foreignKey: "idProduct"
      })
    }
  }
  product.init({
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    iduser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};