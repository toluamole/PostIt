const bcrypt = require('bcrypt')
// 'use strict';
// const {
//   Model
// } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 8,
      }
    },
    telephone: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  });
  
  User.beforeCreate( async function(user, options){
     const salt = await bcrypt.genSalt();
     user.password = await bcrypt.hash(user.password, salt)
  });
  // User.associate = (models) => {
  //   // associations here
  // }
  // class User extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // User.init({
  //   name: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING,
  //   telephone: DataTypes.INTEGER
  // }, {
  //   sequelize,
  //   modelName: 'User',
  // });
  return User;
};