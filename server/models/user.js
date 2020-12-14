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
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter your name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
       args: false,
       msg: 'please enter your email address'
      },
      unique: {
        args: true,
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      },
      validate: {
        isNotShort: (value) => {
          if(value.length < 8) {
            throw new Error('password should be atleast 8 characters')
          }
        }
      }
    },
    telephone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter your telephone number'
        }
      },
      unique: {
       args: true,
      }
    }
  });
  
  // Hashing user's password
  User.beforeCreate( async function(user, options) {
     const salt = await bcrypt.genSalt();
     user.password = await bcrypt.hash(user.password, salt)
  });

  //Comparing User's password with hashed password
  User.login = async function (email, password){
    const user = await this.findOne({
      where: {
        email: email
      }
    });
    if(user){
      const auth = await bcrypt.compare(password, user.password);
      if(auth){
        return user
      }else{
        throw Error('Incorrect Password')
      }
    }else{
      throw Error('Incorrect Email')
    }
  }
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