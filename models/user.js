const { Model, DataTypes } = require('sequelize');

moduule.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
        username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
    );
    return User;
}