const db = require('./db')

//essa parte abaixo só foi necessario pq ja havia uma tabela pagamentos preenchida
const Pokemon = db.sequelize.define('pokemons',{
    nome:{
        type:db.Sequelize.STRING
    },
    cor:{
        type: db.Sequelize.STRING
    },
    imagem:{
        type:db.Sequelize.STRING
    }
})

//Pokemon.sync({force:true})

module.exports = Pokemon