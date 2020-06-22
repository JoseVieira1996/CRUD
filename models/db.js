const Sequelize = require('sequelize')

const sequelize = new Sequelize('celke','root','Mysql2020',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}